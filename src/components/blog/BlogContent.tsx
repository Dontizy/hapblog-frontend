import type { Blog } from "../../lib/blog";

interface BlogContentProps {
  blog: Blog;
}

export default function BlogContent({ blog }: BlogContentProps) {
  return (
    <article className="mt-10">
      <div
        className="
          prose
          prose-neutral
          dark:prose-invert
          max-w-none
          prose-headings:font-serif
          prose-headings:font-semibold
          prose-headings:tracking-tight
          prose-h1:text-3xl
          prose-h2:text-2xl
          prose-h3:text-xl
          prose-p:text-[1.0625rem]
          prose-p:leading-8
          prose-p:text-foreground/90
          prose-a:text-foreground
          prose-a:underline
          prose-a:decoration-accent
          prose-a:decoration-2
          prose-a:underline-offset-4
          prose-img:rounded-2xl
          prose-img:border
          prose-img:border-border
          prose-blockquote:border-l-2
          prose-blockquote:border-accent
          prose-blockquote:font-serif
          prose-blockquote:text-xl
          prose-blockquote:font-normal
          prose-blockquote:not-italic
          prose-blockquote:text-foreground
          prose-code:rounded
          prose-code:bg-muted
          prose-code:px-1.5
          prose-code:py-0.5
          prose-code:text-[0.9em]
          prose-code:before:content-none
          prose-code:after:content-none
          prose-pre:rounded-2xl
          prose-pre:border
          prose-pre:border-border
          prose-pre:bg-muted
          first:prose-p:first-letter:float-left
          first:prose-p:first-letter:mr-2
          first:prose-p:first-letter:font-serif
          first:prose-p:first-letter:text-6xl
          first:prose-p:first-letter:font-semibold
          first:prose-p:first-letter:leading-[0.8]
          first:prose-p:first-letter:text-foreground
        "
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />
      
    </article>
  );
}
