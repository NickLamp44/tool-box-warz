import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const convertGsUrlToHttps = async (gsUrl) => {
  if (!gsUrl || !gsUrl.startsWith("gs://")) {
    return gsUrl;
  }

  try {
    const storage = getStorage();
    // Extract the path from gs://bucket-name/path/to/file
    const path = gsUrl.replace(/^gs:\/\/[^/]+\//, "");
    const storageRef = ref(storage, path);
    const httpsUrl = await getDownloadURL(storageRef);
    return httpsUrl;
  } catch (error) {
    console.error("Error converting gs:// URL:", error);
    return "/placeholder.svg";
  }
};

export const convertMultipleGsUrls = async (obj) => {
  if (!obj) return obj;

  const converted = { ...obj };

  // Convert hero image
  if (converted.heroImage?.src?.startsWith("gs://")) {
    converted.heroImage.src = await convertGsUrlToHttps(
      converted.heroImage.src
    );
  }

  // Convert content images
  if (converted.content && Array.isArray(converted.content)) {
    for (const section of converted.content) {
      if (section.subsections && Array.isArray(section.subsections)) {
        for (const subsection of section.subsections) {
          if (subsection.image?.src?.startsWith("gs://")) {
            subsection.image.src = await convertGsUrlToHttps(
              subsection.image.src
            );
          }
        }
      }
    }
  }

  return converted;
};
