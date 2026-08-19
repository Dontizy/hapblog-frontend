import type { Blog } from "../../lib/blog";

interface BlogContentProps {
  blog: Blog;
}

export default function BlogContent({ blog }: BlogContentProps) {
  return (
<article className="mt-8">
  <div
    className="
      max-w-none
      font-serif

      /* Paragraphs */
      [&_p]:mb-5
      [&_p]:text-[1.0625rem]
      [&_p]:leading-relaxed
      [&_p]:text-[#242424]/90
      dark:[&_p]:text-[#E6E6E6]/90

      /* Headings */
      [&_h1]:mt-10
      [&_h1]:mb-4
      [&_h1]:font-serif
      [&_h1]:text-3xl
      [&_h1]:font-bold
      [&_h1]:tracking-tight
      [&_h1]:text-[#242424]
      dark:[&_h1]:text-[#F2F2F2]

      [&_h2]:mt-10
      [&_h2]:mb-4
      [&_h2]:font-serif
      [&_h2]:text-2xl
      [&_h2]:font-bold
      [&_h2]:tracking-tight
      [&_h2]:text-[#242424]
      dark:[&_h2]:text-[#F2F2F2]

      [&_h3]:mt-8
      [&_h3]:mb-3
      [&_h3]:font-serif
      [&_h3]:text-xl
      [&_h3]:font-bold
      [&_h3]:tracking-tight
      [&_h3]:text-[#242424]
      dark:[&_h3]:text-[#F2F2F2]

      /* Lists */
      [&_ul]:my-5
      [&_ol]:my-5
      [&_li]:my-1

      /* Strong */
      [&_strong]:font-semibold
      [&_strong]:text-[#242424]
      dark:[&_strong]:text-white

      /* Links */
      [&_a]:text-[#242424]
      dark:[&_a]:text-[#E6E6E6]
      [&_a]:underline
      [&_a]:underline-offset-4

      /* Images */
      [&_img]:my-8
      [&_img]:rounded-2xl
      [&_img]:border
      [&_img]:border-black/5
      dark:[&_img]:border-white/10

      /* Blockquotes */
      [&_blockquote]:my-8
      [&_blockquote]:border-l-2
      [&_blockquote]:border-[#242424]
      dark:[&_blockquote]:border-[#E6E6E6]
      [&_blockquote]:pl-6
      [&_blockquote]:font-serif
      [&_blockquote]:text-lg
      [&_blockquote]:italic
      [&_blockquote]:text-[#242424]/80
      dark:[&_blockquote]:text-[#E6E6E6]/80

      /* Inline code */
      [&_code]:rounded-md
      [&_code]:bg-muted/80
      [&_code]:px-1.5
      [&_code]:py-0.5
      [&_code]:font-mono
      [&_code]:text-[0.875em]

      /* Code blocks */
      [&_pre]:my-8
      [&_pre]:rounded-xl
      [&_pre]:border
      [&_pre]:border-border/80
      [&_pre]:bg-muted/60
      [&_pre]:p-4
    "
    dangerouslySetInnerHTML={{
      __html: blog.content,
    }}
  />
</article>
  );
}
