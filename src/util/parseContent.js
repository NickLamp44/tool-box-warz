export function parseContent(body) {
  if (!body || typeof body !== "string") return [];

  return body
    .split("---")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      const typeMatch = trimmed.match(/type:\s*"(.+?)"/);
      const titleMatch = trimmed.match(/^##\s+(.*)$/m);

      const type = typeMatch ? typeMatch[1] : "section";
      const title = titleMatch ? titleMatch[1] : "";

      const subsectionMatches = [
        ...trimmed.matchAll(
          /^###\s+(.*?)\s*\(subsection\d+\)[\s\S]*?(?=###|$)/gm
        ),
      ];

      const subsections = subsectionMatches.map((match) => {
        const block = match[0];

        const title =
          block.match(/^###\s+(.*?)\s*\(subsection\d+\)/)?.[1]?.trim() || "";

        const imgSrc = block.match(/gs:\/\/[^\s]+/)?.[0] || "";
        const altMatch = block.match(/alt\s+"(.+?)"/);
        const alt = altMatch ? altMatch[1] : "";

        const content = block
          .replace(/^###.*$/m, "")
          .replace(/Image\s*:.*$/, "")
          .replace(/alt\s+".+?"/, "")
          .replace(/gs:\/\/[^\s]+/, "")
          .trim();

        return { title, image: { src: imgSrc, alt }, content };
      });

      const mainContent = trimmed
        .replace(/^##\s+.*$/m, "")
        .replace(/type:\s*".+?"/, "")
        .trim();

      return {
        type,
        title,
        content: mainContent,
        subsections: subsections.length ? subsections : undefined,
      };
    })
    .filter(Boolean);
}
