import { useParams } from "react-router-dom";
import BlogHero from "./blog/BlogHero";
import BlogContent from "./blog/BlogContent";
import BlogActions from "./blog/BlogActions";
import AuthorCard from "./blog/AuthorCard";
import CommentsSection from "./blog/CommentsSection";
import ErrorState from "./ErrorState";
import { useBlog } from "../hooks/blog/useBlog";
import { useComments } from "../hooks/blog/useComments";
import BlogDetailsSkeleton from "./loading/BlogDetailsSkeleton";

export default function BlogDetailsPage() {
  const { id } = useParams();

  const { data: blogData, isPending, isError, refetch } = useBlog(id!);
  const {
    data: commentData,
   isPending: isCommentPending,
    isError: isCommentError,
  } = useComments(id!);
  const blog = blogData?.blog;

  if (isPending) return <BlogDetailsSkeleton />;
  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  if (!blog) return <ErrorState title="Blog not found" />;

  const totalComments = commentData?.totalComments ?? 0;
  const comments = commentData?.comments ?? [];

  console.log("comments", commentData);
  console.log("blog", blog);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <BlogHero blog={blog} />
      <BlogContent blog={blog} />
      <BlogActions blog={blog} />
      <AuthorCard author={blog.author} />

      <div className="mx-auto mt-10 max-w-4xl">
        <CommentsSection totalComments={totalComments} comments={comments} isCommentError={isCommentError} isCommentPending={isCommentPending} />
      </div>
    </main>
  );
}
