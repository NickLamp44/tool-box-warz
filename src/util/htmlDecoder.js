export const decodeHtmlEntities = (text) => {
  if (!text || typeof text !== "string") return text;

  // Create a temporary DOM element to decode HTML entities
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = text;
  return tempDiv.textContent || tempDiv.innerText || text;
};

// Alternative method using manual replacement for common entities
export const decodeCommonEntities = (text) => {
  if (!text || typeof text !== "string") return text;

  const entityMap = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&#8217;": "'", // Right single quotation mark
    "&#8216;": "'", // Left single quotation mark
    "&#8220;": '"', // Left double quotation mark
    "&#8221;": '"', // Right double quotation mark
    "&#8211;": "–", // En dash
    "&#8212;": "—", // Em dash
    "&nbsp;": " ", // Non-breaking space
    "&hellip;": "…", // Horizontal ellipsis
  };

  return text.replace(/&[#\w]+;/g, (entity) => {
    return entityMap[entity] || entity;
  });
};
