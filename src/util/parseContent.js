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
