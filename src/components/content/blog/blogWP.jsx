import { useEffect, useState } from "react";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://yourwordpresssite.com/wp-json/wp/v2/posts?_embed") // _embed includes images
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="blog-container">
      <h1>Blog</h1>
      {posts.map((post) => (
        <article key={post.id} className="blog-post">
          {/* Title */}
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

          {/* Featured Image */}
          {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              src={post._embedded["wp:featuredmedia"][0].source_url}
              alt={post.title.rendered}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          )}

          {/* Excerpt */}
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />

          {/* Link to full post */}
          <a href={post.link} target="_blank" rel="noreferrer">
            Read more →
          </a>
        </article>
      ))}
    </div>
  );
}
