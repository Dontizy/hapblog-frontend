import { Link } from "react-router-dom";
import type { Blog } from "../../lib/blog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";



interface BlogHeroProps {
  blog: Blog;
}

export default function BlogHero({ blog }: BlogHeroProps) {
  const readingTime = Math.max(
    1,
    Math.ceil(blog.content.split(/\s+/).length / 200),
  );

  return (
    <section className="space-y-8">
      {/* Author */}
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={blog.author.avatar} />
          <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div>
          <Link
            to={`/profile/${blog.author._id}`}
            className="font-semibold hover:underline"
          >
            {blog.author.name}
          </Link>

          <div className="text-sm text-muted-foreground">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {" • "}
            {readingTime} min read
          </div>
        </div>
      </div>
      {/* Cover Image */}
      {blog.imageUrl && (
        <div className="overflow-hidden mt-2 rounded-2xl shadow-xl ring-1 ring-border border border-border">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="h-60 w-full object-cover md:h-105"
          />
        </div>
      )}

      {/* Title */}
    <div className="space-y-5">
  <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
    Career
  </Badge>

  <h1
    className="
      max-w-4xl
      text-pretty
      font-serif
      text-4xl
      font-semibold
      leading-[1.05]
      tracking-tight
      md:text-5xl
      lg:text-6xl
    "
  >
    {blog.title}
  </h1>

</div>
    </section>
  );
}
