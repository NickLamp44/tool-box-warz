"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";

export default function BlogArticle() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(db, "blogs", blogId);
        const blogSnap = await getDoc(blogRef);
        if (blogSnap.exists()) {
          setBlog(blogSnap.data());
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        setError("Failed to fetch Blog");
      }
    };
    fetchBlog();
  }, [blogId]);

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
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <section className="relative mb-8">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <img
            src={
              blog.heroImage?.src ||
              "/placeholder.svg?height=400&width=800&query=blog hero image"
            }
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
      {blog.content && Array.isArray(blog.content) && (
        <div className="prose prose-lg max-w-none">
          {blog.content.map((section, index) => (
            <section key={index} className="mb-8">
              {/* Section Heading */}
              {section.heading && section.title && (
                <div className="mb-6">
                  {section.heading === "h1" && (
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                      {section.title}
                    </h1>
                  )}
                  {section.heading === "h2" && (
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                      {section.title}
                    </h2>
                  )}
                  {section.heading === "h3" && (
                    <h3 className="text-xl md:text-2xl font-medium mb-4">
                      {section.title}
                    </h3>
                  )}
                </div>
              )}

              {/* Section Text Content */}
              {section.paragraphs && section.paragraphs.length > 0 && (
                <div className="mb-6">
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i} className="mb-4 text-lg leading-relaxed">
                      {paragraph.text || paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Fallback for text field if paragraphs don't exist */}
              {(!section.paragraphs || section.paragraphs.length === 0) &&
                section.text && (
                  <div className="mb-6">
                    {section.text.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="mb-4 text-lg leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                )}

              {/* Section Images */}
              {section.images && section.images.length > 0 && (
                <div className="mb-6">
                  {section.images.length === 1 ? (
                    <img
                      src={
                        section.images[0].src ||
                        "/placeholder.svg?height=400&width=600&query=blog section image"
                      }
                      alt={section.images[0].alt || "Section image"}
                      className="w-full rounded-lg shadow-lg"
                    />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.images.map((img, i) => (
                        <img
                          key={i}
                          src={
                            img.src ||
                            "/placeholder.svg?height=300&width=400&query=blog section image"
                          }
                          alt={img.alt || `Section image ${i + 1}`}
                          className="w-full rounded-lg shadow-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Section Videos */}
              {section.videos && section.videos.length > 0 && (
                <div className="mb-6">
                  {section.videos.map((video, i) => (
                    <div key={i} className="mb-4">
                      <video
                        src={video.src || video}
                        controls
                        className="w-full rounded-lg shadow-lg"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </div>
              )}

              {/* Add divider between sections except for the last one */}
              {index < blog.content.length - 1 && (
                <hr className="border-border my-8" />
              )}
            </section>
          ))}
        </div>
      )}

      {/* Additional Videos from blog.videos if they exist */}
      {blog.videos && blog.videos.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Related Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blog.videos.map((videoUrl, index) => (
              <div key={index} className="aspect-video">
                <iframe
                  src={videoUrl}
                  title={`Video ${index + 1}`}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
