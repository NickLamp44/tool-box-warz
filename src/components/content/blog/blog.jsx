"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogWPArticle() {
  const { blogId } = useParams(); // This could be slug or ID
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const wpUrl = process.env.REACT_APP_WORDPRESS_URL;

        if (!wpUrl) {
          setError(
            "WordPress URL not configured. Please set REACT_APP_WORDPRESS_URL in your environment variables."
          );
          return;
        }

        let url;
        if (isNaN(blogId)) {
          // It's a slug
          url = `${wpUrl}/wp-json/wp/v2/posts?slug=${blogId}&_embed`;
        } else {
          // It's an ID
          url = `${wpUrl}/wp-json/wp/v2/posts/${blogId}?_embed`;
        }

        console.log("[v0] Fetching blog from:", url);
        const response = await fetch(url);

        if (!response.ok) {
          console.log(
            "[v0] Blog response not OK:",
            response.status,
            response.statusText
          );
          throw new Error(`Blog API returned ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const responseText = await response.text();
          console.log(
            "[v0] Blog response is not JSON:",
            responseText.substring(0, 200)
          );
          throw new Error(
            "Blog API returned HTML instead of JSON - check your WordPress URL"
          );
        }

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
          content: [
            {
              text: post.content.rendered,
              paragraphs: [],
            },
          ],
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
      <div className="container mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Blog not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <section className="relative mb-8">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <img
            src={blog.heroImage?.src || "/placeholder.svg"}
            alt={blog.heroImage?.alt || "Blog Image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {blog.title}
              </h1>
              <p className="text-xl mb-2">By {blog.authorName}</p>
              <p className="text-lg mb-4">{blog.publishedDate}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {blog.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtitle */}
      {blog.subtitle && (
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-muted-foreground">
            {blog.subtitle}
          </h2>
        </div>
      )}

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none">
        <div
          dangerouslySetInnerHTML={{ __html: blog.content[0].text }}
          className="wordpress-content"
        />
      </div>

      <style jsx>{`
        .wordpress-content {
          line-height: 1.7;
        }
        .wordpress-content p {
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
        }
        .wordpress-content h1,
        .wordpress-content h2,
        .wordpress-content h3,
        .wordpress-content h4,
        .wordpress-content h5,
        .wordpress-content h6 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .wordpress-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
        .wordpress-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
        }
        .wordpress-content ul,
        .wordpress-content ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        .wordpress-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
