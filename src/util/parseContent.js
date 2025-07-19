export function parseContent(body) {
  if (!body || typeof body !== "string") return [];

  console.log("Raw body for parsing:", body); // Debug log

  // Split content by --- but preserve the structure
  const sections = body.split(/\n---\n/).filter((section) => section.trim());

  return sections
    .map((sectionText, index) => {
      const currentSection = {
        type: "section",
        title: "",
        content: "",
        images: [],
        subsections: [],
      };

      let remainingContent = sectionText.trim();

      // 1. Extract Type (if present, usually at the very beginning)
      const typeMatch = remainingContent.match(/^type:\s*"([^"]+)"/m);
      if (typeMatch) {
        currentSection.type = typeMatch[1];
        remainingContent = remainingContent.replace(typeMatch[0], "").trim();
      }

      // 2. Extract Main Title (## or # heading)
      const titleMatch = remainingContent.match(/^#{1,2}\s+(.+)$/m);
      if (titleMatch) {
        currentSection.title = titleMatch[1].trim();
        remainingContent = remainingContent.replace(titleMatch[0], "").trim();
      }

      // 3. Process Images and remove them from content
      // Use a temporary array to store lines that are NOT images
      const linesAfterTitleAndType = remainingContent.split("\n");
      const nonImageLines = [];

      linesAfterTitleAndType.forEach((line) => {
        const customImageMatch = line.match(
          /Image\s*:\s*\n\s*alt\s+"([^"]+)"\s*\n\s*(gs:\/\/[^\s\n]+)/
        );
        const markdownImageMatch = line.match(/!\[([^\]]*)\]$$([^)]+)$$/); // Corrected regex

        if (customImageMatch) {
          currentSection.images.push({
            src: customImageMatch[2],
            alt: customImageMatch[1],
          });
        } else if (markdownImageMatch) {
          currentSection.images.push({
            src: markdownImageMatch[2],
            alt: markdownImageMatch[1],
          });
        } else {
          nonImageLines.push(line);
        }
      });

      remainingContent = nonImageLines.join("\n").trim();

      // 4. Process Subsections and remove them from content
      const tempSubsections = [];
      // Regex to find ### headings and their content until another heading or end of section
      const subsectionRegex =
        /^###\s+(.+?)$([\s\S]*?)(?=\n(?:###|##|#|---|$))/gm;
      const lastIndex = 0;
      let match;

      // Collect all subsection matches and their start/end indices
      const subsectionRanges = [];
      while ((match = subsectionRegex.exec(remainingContent)) !== null) {
        subsectionRanges.push({
          match: match,
          start: match.index,
          end: match.index + match[0].length,
        });
      }

      // Reconstruct main content by taking parts *between* subsections
      const mainContentParts = [];
      let currentContentStart = 0;

      subsectionRanges.forEach((subInfo) => {
        // Add content before this subsection
        const contentBeforeSub = remainingContent
          .substring(currentContentStart, subInfo.start)
          .trim();
        if (contentBeforeSub) {
          mainContentParts.push(contentBeforeSub);
        }

        const subsectionTitle = subInfo.match[1].trim();
        const subsectionBody = subInfo.match[2].trim();

        const subImages = [];
        const subBodyLines = subsectionBody.split("\n");
        const subNonImageLines = [];

        subBodyLines.forEach((subLine) => {
          const subCustomImageMatch = subLine.match(
            /Image\s*:\s*\n\s*alt\s+"([^"]+)"\s*\n\s*(gs:\/\/[^\s\n]+)/
          );
          const subMarkdownImageMatch = subLine.match(
            /!\[([^\]]*)\]$$([^)]+)$$/
          ); // Corrected regex

          if (subCustomImageMatch) {
            subImages.push({
              src: subCustomImageMatch[2],
              alt: subCustomImageMatch[1],
            });
          } else if (subMarkdownImageMatch) {
            subImages.push({
              src: subMarkdownImageMatch[2],
              alt: subMarkdownImageMatch[1],
            });
          } else {
            subNonImageLines.push(subLine);
          }
        });

        tempSubsections.push({
          title: subsectionTitle,
          content: subNonImageLines.join("\n").trim(),
          ...(subImages.length > 0 && { images: subImages }),
        });

        currentContentStart = subInfo.end;
      });

      // Add any remaining content after the last subsection
      const contentAfterLastSub = remainingContent
        .substring(currentContentStart)
        .trim();
      if (contentAfterLastSub) {
        mainContentParts.push(contentAfterLastSub);
      }

      currentSection.content = mainContentParts.join("\n\n").trim(); // Join with double newline for paragraphs
      currentSection.subsections = tempSubsections;

      console.log(`Section ${index} result:`, currentSection); // Debug log
      return currentSection;
    })
    .filter(Boolean);
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
