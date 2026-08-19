import { Link } from "react-router-dom";
import type { Blog } from "../../lib/blog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import placeHolderImage from "../img/Hapblog-image.png";


interface BlogHeroProps {
  blog: Blog;
}

export default function BlogHero({ blog }: BlogHeroProps) {



  return (
    <section className="space-y-8">
      {/* Title first — the reader decides whether to stay here, so it leads */}
      <h1
  className="
    text-balance
    font-serif
    text-2xl
    font-bold
    leading-snug
    tracking-tight
    text-foreground
    sm:text-3xl
    md:text-4xl
    lg:text-5xl
  "
>
  {blog.title}

</h1>
      {/* Byline */}
      <div className="flex items-center gap-3 border-b border-border pb-8">
  <Avatar className="h-11 w-11">
    <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
    <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
  </Avatar>

  <div className="leading-tight">
    <div className="flex items-center gap-1.5">
      <Link
        to={`/author/${blog.author.username}/profile`}
        className="font-medium text-foreground hover:underline"
      >
        {blog.author.name}
      </Link>
      {blog.author.username && (
        <span className="text-xs text-muted-foreground">
          @{blog.author.username.replace(/^@/, '')}
        </span>
      )}
    </div>

    <div className="text-sm text-muted-foreground">
      {new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
      <span className="mx-1.5">·</span>
      {blog.readingTime}
    </div>
  </div>
</div>

      {/* Cover image */}
      <div className="overflow-hidden rounded-2xl border border-border">
        <img
          src={blog.imageUrl || placeHolderImage}
          alt={blog.title}
          className="h-64 w-full object-cover sm:h-80 md:h-112"
        />
      </div>
    </section>
  );
}
