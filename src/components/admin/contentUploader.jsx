import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import frontMatter from "front-matter";

import { v4 as uuidv4 } from "uuid";

export default function ContentUploader() {
  const [markdownFile, setMarkdownFile] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [videoLinks, setVideoLinks] = useState([""]);
  const [status, setStatus] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [customCollection, setCustomCollection] = useState("");

  const handleUpload = async () => {
    if (!markdownFile) {
      setStatus("No markdown file selected.");
      return;
    }

    const targetCollection = customCollection.trim() || collectionName;

    if (!targetCollection) {
      setStatus("No target collection selected.");
      return;
    }

    setStatus("Parsing and uploading...");

    try {
      const fileText = await markdownFile.text();
      const parsed = frontMatter(fileText);
      const data = parsed.attributes;
      const content = parsed.body;

      const storage = getStorage();
      const uploadedMedia = await Promise.all(
        mediaFiles.map(async (file) => {
          const fileRef = ref(storage, `Media/${uuidv4()}_${file.name}`);
          await uploadBytes(fileRef, file);
          const url = await getDownloadURL(fileRef);
          return { name: file.name, url };
        })
      );

      const mainDoc = {
        title: data.title,
        subtitle: data.subtitle,
        authorName: data.authorName,
        publishedDate: data.publishedDate,
        createdAt: new Date(data.createdAt),
        tags: data.tags,
        heroImage: data.heroImage,
        videos: videoLinks.filter((link) => link.trim() !== ""),
        images: uploadedMedia,
        content,
        publishedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, targetCollection), mainDoc);

      if (Array.isArray(data.sections)) {
        const sectionPromises = data.sections.map((section) =>
          addDoc(
            collection(db, targetCollection, docRef.id, "sections"),
            section
          )
        );
        await Promise.all(sectionPromises);
      }

      setStatus(`Content uploaded to "${targetCollection}" successfully!`);
    } catch (err) {
      console.error(err);
      setStatus("Failed to upload content.");
    }
  };

  const handleVideoLinkChange = (index, value) => {
    const updatedLinks = [...videoLinks];
    updatedLinks[index] = value;
    setVideoLinks(updatedLinks);
  };

  const addVideoLinkInput = () => {
    setVideoLinks([...videoLinks, ""]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Content Uploader</h2>

      <label>Choose Target Collection:</label>
      <select
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        style={{ display: "block", marginBottom: "1rem" }}
      >
        <option value="blogs">blogs</option>
        <option value="showcases">showcases</option>
        <option value="merch">merch</option>
        <option value="">Other (enter below)</option>
      </select>

      {collectionName === "" && (
        <input
          type="text"
          placeholder="Enter custom collection name"
          value={customCollection}
          onChange={(e) => setCustomCollection(e.target.value)}
          style={{ marginBottom: "1rem", width: "100%" }}
        />
      )}

      <input
        type="file"
        accept=".md,.mdx,.json"
        onChange={(e) => setMarkdownFile(e.target.files[0])}
        style={{ marginBottom: "1rem" }}
      />

      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={(e) => setMediaFiles([...e.target.files])}
        style={{ marginBottom: "1rem" }}
      />

      <h4>Video URLs (YouTube, Vimeo, etc.)</h4>
      {videoLinks.map((link, idx) => (
        <input
          key={idx}
          type="text"
          value={link}
          placeholder="Paste video URL"
          onChange={(e) => handleVideoLinkChange(idx, e.target.value)}
          style={{ display: "block", marginBottom: "8px", width: "100%" }}
        />
      ))}

      <button onClick={addVideoLinkInput}>+ Add another video link</button>

      <br />
      <br />
      <button onClick={handleUpload}>Upload Content</button>

      <p>{status}</p>
    </div>
  );
}
