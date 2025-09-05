
// Convert Firebase Storage paths to full URLs
function processFirebasePath(path, type = "image") {
  if (!path || path.trim() === "") return null;

  if (path.startsWith("gs://") || path.startsWith("http")) {
    return path;
  }

  const BASE_IMAGE_STORAGE_URL =
    "gs://toolboxwars-d5bd0.firebasestorage.app/images/blogs/";
  const BASE_VIDEO_STORAGE_URL =
    "gs://toolboxwars-d5bd0.firebasestorage.app/videos/blogs/";

  return type === "video"
    ? `${BASE_VIDEO_STORAGE_URL}${path}`
    : `${BASE_IMAGE_STORAGE_URL}${path}`;
}

// Normalize a blog object into render-friendly data
export function parseContent(blogData) {
  if (!blogData || !Array.isArray(blogData.sections)) return [];

  return blogData.sections.map((section) => {
    const paragraphs =
      section.paragraphs?.map((p) => {
        // Normalize paragraph.content
        const contentBlocks = Array.isArray(p.content)
          ? p.content
          : [{ type: "text", content: p.content || "" }];

        return {
          content: contentBlocks,
          images:
            p.images?.map((img) => ({
              ...img,
              src: processFirebasePath(img.src, "image"),
            })) || [],
        };
      }) || [];

    const bullets =
      section.bullets?.map((b) => ({
        title: b.title,
        items: b.items,
      })) || [];

    return {
      type: section.type || "section",
      heading: section.heading || null,
      paragraphs,
      bullets,
    };
  });

}

// Helper function to parse frontmatter - updated to handle both formats
export function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return { frontmatter: {}, body: content };

  const frontmatterText = frontmatterMatch[1];
  const body = content.replace(/^---\n[\s\S]*?\n---\n/, "");

  const frontmatter = {};
  const lines = frontmatterText.split("\n");

  let currentKey = null;
  let currentObject = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (
      trimmed.endsWith(":") &&
      !trimmed.includes('"') &&
      !trimmed.includes("[")
    ) {
      currentKey = trimmed.slice(0, -1);
      currentObject = {};
      frontmatter[currentKey] = currentObject;
    } else if (currentObject && trimmed.startsWith("src:")) {
      currentObject.src = trimmed.match(/src:\s*"([^"]+)"/)?.[1] || "";
    } else if (currentObject && trimmed.startsWith("alt:")) {
      currentObject.alt = trimmed.match(/alt:\s*"([^"]+)"/)?.[1] || "";
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

      // Handle new heroImage format where src and alt are separate top-level keys
      if (key.trim() === "heroImage" && typeof value === "string") {
        frontmatter.heroImage = {
          src: value,
          alt: frontmatter.heroImageAlt || "", // Use heroImageAlt if already parsed
        };
      } else if (key.trim() === "heroImageAlt") {
        if (frontmatter.heroImage) {
          frontmatter.heroImage.alt = value;
        } else {
          // Store temporarily if heroImage hasn't been processed yet
          frontmatter.heroImageAlt = value;
        }
      } else {
        frontmatter[key.trim()] = value;
      }

      currentObject = null;
    }
  });

  // Finalize heroImage if heroImageAlt was processed first
  if (frontmatter.heroImageAlt && !frontmatter.heroImage) {
    frontmatter.heroImage = {
      src: "", // Placeholder, should be set by heroImage key
      alt: frontmatter.heroImageAlt,
    };
  }
  delete frontmatter.heroImageAlt; // Clean up temporary field

  return { frontmatter, body };
}

// Helper function to convert Firebase Storage paths to full URLs
// This function should be called AFTER parsing and BEFORE saving to Firestore
// It converts relative paths (e.g., "PrivateerToolBox/ProToolBoxCheck_1.webp")
// to gs:// URLs (e.g., "gs://toolboxwars-d5bd0.firebasestorage.app/images/blogs/PrivateerToolBox/ProToolBoxCheck_1.webp")
export function processFirebaseImages(blogData) {
  if (!blogData) return blogData;

  const BASE_STORAGE_URL =
    "gs://toolboxwars-d5bd0.firebasestorage.app/images/blogs/";

  const processPath = (path) => {
    if (path.startsWith("gs://") || path.startsWith("http")) {
      return path;
    }
    return `${BASE_STORAGE_URL}${path}`;
  };

  // Process heroImage
  if (blogData.heroImage) {
    if (typeof blogData.heroImage.src === "string") {
      blogData.heroImage.src = processPath(blogData.heroImage.src);
    } else if (typeof blogData.heroImage === "string") {
      // Handle case where heroImage is just a string path
      blogData.heroImage = {
        src: processPath(blogData.heroImage),
        alt: blogData.heroImageAlt || blogData.title || "",
      };
    }
  }

  // Process images in content sections and subsections
  if (Array.isArray(blogData.content)) {
    blogData.content = blogData.content.map((section) => ({
      ...section,
      images: section.images?.map((img) => ({
        ...img,
        src: processPath(img.src),
      })),
      subsections: section.subsections?.map((sub) => ({
        ...sub,
        images: sub.images?.map((img) => ({
          ...img,
          src: processPath(img.src),
        })),
      })),
    }));
  }

  return blogData;
}
