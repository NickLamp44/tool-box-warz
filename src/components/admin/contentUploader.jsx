import React, { useState } from "react";
import frontMatter from "front-matter";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { parseContent } from "../../util/parseContent";


function cleanObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map(cleanObject).filter((v) => v !== undefined && v !== null);
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, cleanObject(v)])
    );
  }
  return obj;
}

export default function ContentUploader() {
  const [file, setFile] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [videoLinks, setVideoLinks] = useState([""]);
  const [status, setStatus] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [customCollection, setCustomCollection] = useState("");

  const handleUpload = async () => {

    if (!file) {
      setStatus("❌ No file selected.");

      return;
    }

    const targetCollection = customCollection.trim() || collectionName;
    if (!targetCollection) {
      setStatus("❌ No target collection selected.");
      return;
    }

    setStatus("⏳ Parsing and uploading...");

    try {

      const fileText = await file.text();
      let data = {};
      let sections = [];

      if (file.name.endsWith(".json")) {
        // ✅ JSON blogs (new schema)
        data = JSON.parse(fileText);
        sections = data.sections || [];
      } else {
        // ✅ Markdown blogs (frontmatter + body)
        const parsed = frontMatter(fileText);
        data = parsed.attributes;
        sections = parseContent(parsed.body); // normalize into sections
      }



      // ✅ Upload any additional media files
      const storage = getStorage();
      const uploadedMedia = await Promise.all(
        mediaFiles.map(async (f) => {
          const fileRef = ref(storage, `Media/${uuidv4()}_${f.name}`);
          await uploadBytes(fileRef, f);
          const url = await getDownloadURL(fileRef);
          return { name: f.name, url };
        })
      );

      // ✅ Prepare blog document
      let mainDoc = {
        title: data.title || "Untitled",
        subtitle: data.subtitle || "",
        authorName: data.authorName || "Unknown",
        publishedDate: data.publishedDate || null,
        tags: data.tags || [],
        heroImage: data.heroImage || {},
        videos: videoLinks.filter((link) => link.trim() !== ""),
        images: uploadedMedia || [],
        sections: sections || [],
        publishedAt: serverTimestamp(),
      };

      mainDoc = cleanObject(mainDoc);

      // ✅ Upload blog doc to Firestore
      await addDoc(collection(db, targetCollection), mainDoc);


      setStatus(`✅ Content uploaded to "${targetCollection}" successfully!`);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setStatus(`❌ Failed to upload content: ${err.message}`);
    }
  };

  const handleVideoLinkChange = (index, value) => {
    const updated = [...videoLinks];
    updated[index] = value;
    setVideoLinks(updated);
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
        onChange={(e) => setFile(e.target.files[0])}
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
