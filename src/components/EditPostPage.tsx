import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePlus, X } from "lucide-react";
import { Button } from "./ui/button";
import TiptapEditor from "./editor/TiptapEditor";
import { useBlog } from "../hooks/blog/useBlog";
import { useUpdateBlog } from "../hooks/blog/useUpdateBlog";

// TODO: replace with the real category list from your backend once available.
const CATEGORIES = [
  "Technology",
  "Career",
  "Lifestyle",
  "Health",
  "Business",
  "Culture",
];

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading: isLoadingBlog, isError: isBlogError } = useBlog(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hasHydratedForm, setHasHydratedForm] = useState(false);

  // Pre-fill the form once the existing post loads. Guarded so it only runs
  // once — otherwise every refetch would stomp on whatever the user is typing.
  useEffect(() => {
    if (!data || hasHydratedForm) return;
    setTitle(data.blog.title);
    setContent(data.blog.content);
    setCategory(data.blog.category ?? "");
    setImagePreview(data.blog.imageUrl ?? null);
    setHasHydratedForm(true);
  }, [data, hasHydratedForm]);

  const { mutate, isPending } = useUpdateBlog();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isValid = title.trim().length > 0 && content.trim().length > 0 && category.length > 0;

  const handleSave = () => {
    if (!isValid || !id) return;
    mutate(
      { blogId: id, title, content, category, image },
      {
        onSuccess: (res) => {
          navigate(`/post/${res.blog._id}`);
        },
      },
    );
  };

  if (isLoadingBlog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading post…</p>
      </div>
    );
  }

  if (isBlogError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground">
          Couldn't load this post. Try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Edit post
          </h1>
          <Button onClick={handleSave} disabled={!isValid || isPending}>
            {isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="mt-8 w-full border-none bg-transparent font-serif text-3xl font-semibold tracking-tight text-foreground placeholder:text-muted-foreground focus:outline-none"
        />

        {/* Category */}
        <div className="mt-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="" disabled>
              Choose a category
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Cover image */}
        <div className="mt-6">
          {imagePreview ? (
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <img src={imagePreview} alt="Cover preview" className="h-64 w-full object-cover" />
              <button
                type="button"
                onClick={clearImage}
                aria-label="Remove image"
                className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <ImagePlus className="h-6 w-6" />
              <span className="text-sm">Add a cover image</span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        {/* Content */}
        <div className="mt-6">
          {hasHydratedForm && <TiptapEditor content={content} onChange={setContent} />}
        </div>
      </div>
    </div>
  );
}
