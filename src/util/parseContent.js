export function parseContent(body, mediaMap = new Map()) {
  if (!body || typeof body !== "string") return []

  const fullContent = []
  let currentSection = null // Represents a content unit with # or ## heading
  let currentSubSubSection = null // Represents a content unit with ### heading
  let activeParentSection = null // This will point to the most recent H1 or H2 section for subSections nesting

  // Helper to create a new content unit object
  const createContentUnit = (sectionType, heading, title) => ({
    section: sectionType,
    heading: heading, 
    title: title,
    text: [], // Initialized as an empty array
    subSections: [], // This will store titles of nested sections
    images: [], // Stores image IDs
    videos: [], // Stores video IDs
  })

  // Helper to add text to the current active unit
  const addTextToCurrentUnit = (line) => {
    if (currentSubSubSection) {
      currentSubSubSection.text.push(line)
    } else if (currentSection) {
      currentSection.text.push(line)
    } else {
      // This handles the initial intro text before any headings
      if (fullContent.length === 0 || fullContent[0].section !== "Intro") {
        fullContent.unshift(createContentUnit("Intro", null, null)) // Add to beginning
      }
      fullContent[0].text.push(line)
    }
  }

  // Helper to add media ID to the current active unit
  const addMediaToCurrentUnit = (mediaId, mediaType) => {
    const mediaItem = mediaMap.get(mediaId)
    if (mediaItem) {
      if (currentSubSubSection) {
        if (mediaType === "image") currentSubSubSection.images.push(mediaId)
        else if (mediaType === "video") currentSubSubSection.videos.push(mediaId)
      } else if (currentSection) {
        if (mediaType === "image") currentSection.images.push(mediaId)
        else if (mediaType === "video") currentSection.videos.push(mediaId)
      } else {
        // For intro section media
        if (fullContent.length === 0 || fullContent[0].section !== "Intro") {
          fullContent.unshift(createContentUnit("Intro", null, null))
        }
        if (mediaType === "image") fullContent[0].images.push(mediaId)
        else if (mediaType === "video") fullContent[0].videos.push(mediaId)
      }
    } else {
      console.warn(`Media with ID "${mediaId}" (${mediaType}) not found in mediaMap.`)
    }
  }

  const lines = body.split("\n")

  lines.forEach((line) => {
    const trimmedLine = line.trim()

    if (trimmedLine === "---") {
      // This marks a logical break. Reset current pointers.
      // Sections are already pushed to fullContent when their headings are processed.
      currentSubSubSection = null
      currentSection = null
      activeParentSection = null // Reset active parent
      return
    }

    const h1Match = trimmedLine.match(/^#\s+(.+)$/)
    const h2Match = trimmedLine.match(/^##\s+(.+)$/)
    const h3Match = trimmedLine.match(/^###\s+(.+)$/) 
    const imageIdMatch = trimmedLine.match(/^imageID:\s*"([^"]+)"$/)
    const videoIdMatch = trimmedLine.match(/^videoID:\s*"([^"]+)"$/)

    if (h1Match) {
      // Reset all pointers when a new H1 starts
      currentSubSubSection = null
      currentSection = null
      activeParentSection = null

      const newH1Section = createContentUnit("Main", "h1", h1Match[1].trim())
      fullContent.push(newH1Section)
      activeParentSection = newH1Section // H1 becomes the new active parent for subsequent H2s
      currentSection = newH1Section // H1 also becomes the currentSection for text/media
    } else if (h2Match) {
      // Reset sub-sub-section pointer
      currentSubSubSection = null

      const newH2Section = createContentUnit("subSection", "h2", h2Match[1].trim())
      fullContent.push(newH2Section)

      // Add H2 title to the subSections of the current active H1 section
      if (activeParentSection && activeParentSection.heading === "h1") {
        activeParentSection.subSections.push(newH2Section.title)
      } else {
        console.warn(`H2 heading "${newH2Section.title}" found without an active H1 parent.`)
      }

      activeParentSection = newH2Section // H2 becomes the new active parent for subsequent H3s
      currentSection = newH2Section // H2 also becomes the currentSection for text/media
    } else if (h3Match) {
      // Changed from h4Match to h3Match
      // Reset sub-sub-section pointer
      currentSubSubSection = null

      const newH3Section = createContentUnit("subSubSection", "h3", h3Match[1].trim()) // Changed from newH4Section to newH3Section
      fullContent.push(newH3Section)

      // Add H3 title to the subSections of the current active H1/H2 section
      if (activeParentSection) {
        activeParentSection.subSections.push(newH3Section.title)
      } else {
        console.warn(
          `H3 heading "${newH3Section.title}" found without an active H1 or H2 parent. It will be treated as a top-level section.`,
        )
      }
      currentSubSubSection = newH3Section // H3 becomes the currentSubSubSection for text/media
      // activeParentSection remains the H1/H2 for the next H2/H1
    } else if (imageIdMatch) {
      addMediaToCurrentUnit(imageIdMatch[1], "image")
    } else if (videoIdMatch) {
      addMediaToCurrentUnit(videoIdMatch[1], "video")
    } else if (trimmedLine !== "") {
      addTextToCurrentUnit(trimmedLine)
    }
  })

  // The final cleanup loop for text arrays
  fullContent.forEach((unit) => {
    // Ensure unit.text is an array before processing
    if (Array.isArray(unit.text)) {
      unit.text = unit.text.filter(Boolean).join("\n\n")
    } else {
      // This case should ideally not happen with the current logic,
      // but as a safeguard, convert non-array text to string.
      console.warn(`Unit text is not an array for unit:`, unit)
      unit.text = String(unit.text || "") // Convert to string if it's not an array
    }
  })

  console.log("Parsed fullContent:", fullContent)
  return fullContent
}

// Helper function to parse frontmatter
export function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) return { frontmatter: {}, body: content }

  const frontmatterText = frontmatterMatch[1]
  const body = content.replace(/^---\n[\s\S]*?\n---\n/, "")

  const frontmatter = {}
  const lines = frontmatterText.split("\n")

  let currentKey = null
  let currentObject = null
  let inVisualContentArray = false
  let currentVisualContentItem = null

  lines.forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed) return

    if (trimmed.startsWith("visualContent:")) {
      inVisualContentArray = true
      frontmatter.visualContent = []
      return
    }

    if (inVisualContentArray) {
      if (trimmed.startsWith("-")) {
        currentVisualContentItem = {}
        frontmatter.visualContent.push(currentVisualContentItem)
      } else if (currentVisualContentItem && trimmed.includes(":")) {
        const [key, ...valueParts] = trimmed.split(":")
        let value = valueParts.join(":").trim()
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1)
        }
        currentVisualContentItem[key.trim()] = value
      }
      return
    }

    if (trimmed.endsWith(":") && !trimmed.includes('"') && !trimmed.includes("[")) {
      currentKey = trimmed.slice(0, -1)
      currentObject = {}
      frontmatter[currentKey] = currentObject
    } else if (currentObject && trimmed.includes(":")) {
      const [key, ...valueParts] = trimmed.split(":")
      let value = valueParts.join(":").trim()
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1)
      }
      currentObject[key.trim()] = value
    } else if (trimmed.includes(":")) {
      const [key, ...valueParts] = trimmed.split(":")
      let value = valueParts.join(":").trim()

      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1)
      }

      if (value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/"/g, ""))
      }

      if (key.trim().includes("Date")) {
        value = new Date(value)
      }

      frontmatter[key.trim()] = value
      currentObject = null
    }
  })

  return { frontmatter, body }
}

// Helper function to convert Firebase Storage paths to full URLs
export function processFirebaseMedia(blogData) {
  if (!blogData) return blogData

  const BASE_IMAGE_STORAGE_URL = "gs://toolboxwars-d5bd0.firebasestorage.app/images/blogs/"
  const BASE_VIDEO_STORAGE_URL = "gs://toolboxwars-d5bd0.firebasestorage.app/videos/blogs/"

  const processPath = (path, type) => {
    if (path.startsWith("gs://") || path.startsWith("http")) {
      return path
    }
    if (type === "image") {
      return `${BASE_IMAGE_STORAGE_URL}${path}`
    }
    if (type === "video") {
      return `${BASE_VIDEO_STORAGE_URL}${path}`
    }
    return path
  }

  // Process heroImage
  if (blogData.heroImage) {
    if (typeof blogData.heroImage.src === "string") {
      blogData.heroImage.src = processPath(blogData.heroImage.src, "image")
    } else if (typeof blogData.heroImage === "string") {
      blogData.heroImage = {
        src: processPath(blogData.heroImage, "image"),
        alt: blogData.heroImageAlt || blogData.title || "",
      }
    }
  }

  // Process visualContent array (which contains both images and videos)
  if (Array.isArray(blogData.visualContent)) {
    blogData.visualContent = blogData.visualContent.map((item) => {
      if (item.src) {
        return {
          ...item,
          src: processPath(item.src, item.type), // Use item.type to determine base URL
        }
      }
      return item
    })
  }

  return blogData
}
