// Helper function to parse frontmatter
export function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return { frontmatter: {}, body: content };

  const frontmatterText = frontmatterMatch[1];
  const body = content.replace(/^---\n[\s\S]*?\n---\n/, "");

  const frontmatter = {};
  const lines = frontmatterText.split("\n");

  let currentKey = null;
  let currentObject = null;
  let inVisualContentArray = false;
  let currentVisualContentItem = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith("visualContent:")) {
      inVisualContentArray = true;
      frontmatter.visualContent = [];
      return;
    }

    if (inVisualContentArray) {
      if (trimmed.startsWith("-")) {
        currentVisualContentItem = {};
        frontmatter.visualContent.push(currentVisualContentItem);
      } else if (currentVisualContentItem && trimmed.includes(":")) {
        const [key, ...valueParts] = trimmed.split(":");
        let value = valueParts.join(":").trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        currentVisualContentItem[key.trim()] = value;
      }
      return;
    }

    if (
      trimmed.endsWith(":") &&
      !trimmed.includes('"') &&
      !trimmed.includes("[")
    ) {
      currentKey = trimmed.slice(0, -1);
      currentObject = {};
      frontmatter[currentKey] = currentObject;
    } else if (currentObject && trimmed.includes(":")) {
      const [key, ...valueParts] = trimmed.split(":");
      let value = valueParts.join(":").trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      currentObject[key.trim()] = value;
    } else if (trimmed.includes(":")) {
      const [key, ...valueParts] = trimmed.split(":");
      let value = valueParts.join(":").trim();

      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      if (value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/"/g, ""));
      }

      if (key.trim().includes("Date")) {
        value = new Date(value);
      }

      frontmatter[key.trim()] = value;
      currentObject = null;
    }
  });

  return { frontmatter, body };
}

// Helper function to convert Firebase Storage paths to full URLs
export function processFirebaseMedia(blogData) {
  if (!blogData) return blogData;

  const BASE_IMAGE_STORAGE_URL =
    "gs://toolboxwars-d5bd0.firebasestorage.app/images/blogs/";
  const BASE_VIDEO_STORAGE_URL =
    "gs://toolboxwars-d5bd0.firebasestorage.app/videos/blogs/";

  const processPath = (path, type) => {
    if (path.startsWith("gs://") || path.startsWith("http")) {
      return path;
    }
    if (type === "image") {
      return `${BASE_IMAGE_STORAGE_URL}${path}`;
    }
    if (type === "video") {
      return `${BASE_VIDEO_STORAGE_URL}${path}`;
    }
    return path;
  };

  // Process heroImage
  if (blogData.heroImage) {
    if (typeof blogData.heroImage.src === "string") {
      blogData.heroImage.src = processPath(blogData.heroImage.src, "image");
    } else if (typeof blogData.heroImage === "string") {
      blogData.heroImage = {
        src: processPath(blogData.heroImage, "image"),
        alt: blogData.heroImageAlt || blogData.title || "",
      };
    }
  }

  // Process visualContent array (which contains both images and videos)
  if (Array.isArray(blogData.visualContent)) {
    blogData.visualContent = blogData.visualContent.map((item) => {
      if (item.src) {
        return {
          ...item,
          src: processPath(item.src, item.type), // Use item.type to determine base URL
        };
      }
      return item;
    });
  }

  return blogData;
}

// Helper function to extract markdown images from text
function extractImagesFromText(text) {
  const imageRegex = /!\[([^\]]*)\]$$([^)]+)$$/g;
  const images = [];
  let match;

  while ((match = imageRegex.exec(text)) !== null) {
    images.push({
      alt: match[1] || "",
      src: match[2],
      type: "image",
    });
  }

  return images;
}

// Helper function to clean markdown images from text
function cleanTextFromImages(text) {
  const imageRegex = /!\[([^\]]*)\]$$([^)]+)$$/g;
  return text.replace(imageRegex, "").trim();
}

export function parseContent(body, mediaMap = new Map()) {
  if (!body || typeof body !== "string") return [];

  const content = [];
  let currentSection = null;

  // Helper to create a new section
  const createSection = (heading, title) => ({
    heading: heading,
    title: title,
    text: [],
    images: [],
    videos: [],
  });

  // Helper to add text to current section
  const addText = (line) => {
    const extractedImages = extractImagesFromText(line);
    const cleanText = cleanTextFromImages(line);

    if (currentSection) {
      // Add extracted images to current section
      currentSection.images.push(...extractedImages);
      // Only add text if there's content after cleaning
      if (cleanText) {
        currentSection.text.push(cleanText);
      }
    } else {
      // Create intro section for content before first heading
      if (content.length === 0 || content[0].heading !== null) {
        content.unshift(createSection(null, null));
      }
      // Add extracted images to intro section
      content[0].images.push(...extractedImages);
      // Only add text if there's content after cleaning
      if (cleanText) {
        content[0].text.push(cleanText);
      }
    }
  };

  // Helper to add media to current section
  const addMedia = (mediaId, mediaType) => {
    const mediaItem = mediaMap.get(mediaId);
    if (mediaItem) {
      const target =
        currentSection ||
        (() => {
          if (content.length === 0 || content[0].heading !== null) {
            content.unshift(createSection(null, null));
          }
          return content[0];
        })();

      if (mediaType === "image") target.images.push(mediaId);
      else if (mediaType === "video") target.videos.push(mediaId);
    } else {
      console.warn(
        `Media with ID "${mediaId}" (${mediaType}) not found in mediaMap.`
      );
    }
  };

  const lines = body.split("\n");

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine === "---") {
      currentSection = null;
      return;
    }

    // Match headings
    const h1Match = trimmedLine.match(/^#\s+(.+)$/);
    const h2Match = trimmedLine.match(/^##\s+(.+)$/);
    const h3Match = trimmedLine.match(/^###\s+(.+)$/);
    const imageIdMatch = trimmedLine.match(/^imageID:\s*"([^"]+)"$/);
    const videoIdMatch = trimmedLine.match(/^videoID:\s*"([^"]+)"$/);

    if (h1Match) {
      currentSection = createSection("h1", h1Match[1].trim());
      content.push(currentSection);
    } else if (h2Match) {
      currentSection = createSection("h2", h2Match[1].trim());
      content.push(currentSection);
    } else if (h3Match) {
      currentSection = createSection("h3", h3Match[1].trim());
      content.push(currentSection);
    } else if (imageIdMatch) {
      addMedia(imageIdMatch[1], "image");
    } else if (videoIdMatch) {
      addMedia(videoIdMatch[1], "video");
    } else if (trimmedLine !== "") {
      addText(trimmedLine);
    }
  });

  // Convert text arrays to paragraphs array with proper structure
  content.forEach((section) => {
    if (Array.isArray(section.text) && section.text.length > 0) {
      // Split text into paragraphs and create proper structure
      const textContent = section.text.join("\n\n");
      const paragraphs = textContent.split(/\n\s*\n/).filter((p) => p.trim());

      section.paragraphs = paragraphs.map((paragraph) => ({
        text: paragraph.trim(),
      }));

      // Keep original text as string for backward compatibility
      section.text = textContent;
    } else {
      section.paragraphs = [];
      section.text = "";
    }
  });

  console.log("Parsed content:", content);
  return content;
}
