import type { Blog } from "../../lib/blog";

interface BlogContentProps {
  blog: Blog;
}

export default function BlogContent({ blog }: BlogContentProps) {
  return (
    <article className="mt-12">
      <div
        className="
          prose
          prose-neutral
          dark:prose-invert
          prose-headings:font-serif
          prose-headings:font-bold
          prose-h1:text-4xl
          prose-h2:text-3xl
          prose-h3:text-2xl
          prose-p:text-base
          prose-p:leading-8
          prose-img:rounded-2xl
          prose-img:border
          prose-blockquote:border-l-4
          prose-blockquote:border-primary
          prose-blockquote:italic
          prose-code:rounded
          prose-code:bg-muted
          prose-code:px-1
          prose-code:py-0.5
          prose-pre:rounded-2xl
          prose-pre:bg-muted
          max-w-none
        "
      >
        {blog.content}
      </div>
    </article>
  );
}
