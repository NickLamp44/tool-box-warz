"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const parseWordPressContent = (htmlContent) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const coverBlocks = tempDiv.querySelectorAll(".wp-block-cover");
  const parsedBlocks = [];

  coverBlocks.forEach((coverBlock) => {
    const bgImage = coverBlock.querySelector(
      ".wp-block-cover__image-background"
    );
    const backgroundImage = bgImage ? bgImage.src : null;

    const innerContainer = coverBlock.querySelector(
      ".wp-block-cover__inner-container"
    );
    const title = innerContainer
      ? innerContainer.querySelector("h1, h2, h3, h4, h5, h6")?.textContent
      : null;
    const author = innerContainer
      ? innerContainer.textContent.match(/Author:\s*([^,\n]+)/)?.[1]
      : null;
    const date = innerContainer
      ? innerContainer.textContent.match(/Date:\s*([^,\n]+)/)?.[1]
      : null;

    parsedBlocks.push({
      type: "cover",
      backgroundImage,
      title,
      author,
      date,
    });

    coverBlock.remove();
  });

  return {
    coverBlocks: parsedBlocks,
    remainingContent: tempDiv.innerHTML,
  };
};

export default function BlogWPArticle() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const wpUrl = process.env.REACT_APP_WORDPRESS_URL;
        if (!wpUrl) {
          setError("WordPress URL not configured.");
          return;
        }

        let url;
        if (isNaN(blogId)) {
          url = `${wpUrl}/posts?slug=${blogId}&_embed`;
        } else {
          url = `${wpUrl}/posts/${blogId}?_embed`;
        }

        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Blog API returned ${response.status}`);

        const data = await response.json();
        const post = Array.isArray(data) ? data[0] : data;

        if (!post) {
          setError("Blog not found");
          return;
        }

        const blogData = {
          title: post.title.rendered,
          authorName: post._embedded?.author?.[0]?.name || "Unknown Author",
          publishedDate: new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          heroImage: {
            src:
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/blog-hero.png",
            alt:
              post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
              post.title.rendered,
          },
          tags:
            post._embedded?.["wp:term"]?.[0]?.map((term) => term.name) || [],
          subtitle: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
          rawContent: post.content.rendered,
        };

        setBlog(blogData);
      } catch (err) {
        console.error("Error fetching WordPress blog:", err);
        setError("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-6 py-12">
        <p>Blog not found</p>
      </div>
    );
  }

  const { coverBlocks, remainingContent } = parseWordPressContent(
    blog.rawContent
  );
  const coverBlock = coverBlocks.length > 0 ? coverBlocks[0] : null;

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      {/* Hero / Cover */}
      
      {coverBlock && (
        <div
          className="relative w-full min-h-[60vh] p-5 rounded-xl  overflow-hidden"
          style={{
            backgroundImage: coverBlock.backgroundImage
              ? `url(${coverBlock.backgroundImage})`
              : "none",
            backgroundColor: coverBlock.backgroundImage
              ? "transparent"
              : "#f3f4f6",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-5  space-y-8">
            {coverBlock.title && (
              <h1 className=" font-extrabold  leading-tight drop-shadow-lg">
                {coverBlock.title}
              </h1>
            )}

            <div className="flex flex-wrap justify-center p-5 gap-6 text-sm md:text-base">
              {coverBlock.author && (
                <span className="bg-black/20 p-5 rounded-full">
                  Author: {coverBlock.author}
                </span>
              )}
              {coverBlock.date && (
                <span className="bg-black/20 px-6 py-2 rounded-full">
                  Date: {coverBlock.date}
                </span>
              )}
            </div>

            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/ px-4 py-2 m-2 rounded-5 text-sm border border-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none prose-img:rounded-lg prose-img:my-8 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-h1:mt-10 prose-h2:mt-8 prose-h3:mt-6 prose-p:mb-6">
        <div
          dangerouslySetInnerHTML={{ __html: remainingContent }}
          className="wordpress-content"
        />
      </div>
    </div>
  );
}
