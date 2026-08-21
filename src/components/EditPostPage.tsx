import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePlus, X } from "lucide-react";
import { Button } from "./ui/button";
import TiptapEditor from "./editor/TiptapEditor";
import { useBlog, useUpdateBlog } from "../hooks/blog/useBlog";
import { useGetCategories } from "../hooks/category/useCategory";
import { getErrorMessage } from "../lib/getErrorMessage";
import EditPostSkeleton from "./loading/EditPostSkeleton";
import { toast } from "sonner";

export default function EditPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, isPending: isLoadingBlog, isError: isBlogError } = useBlog(slug ?? "");
  const { data: categoryList, isPending: categoryPending } = useGetCategories();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Track which button is currently submitting ("draft" | "published")
  const [activeStatus, setActiveStatus] = useState<
    "draft" | "published" | null
  >(null);

  const { mutate, isPending: isEditPending, isError, error } = useUpdateBlog();

  // Pre-fill once the existing post loads
  const [hydratedFromBlog, setHydratedFromBlog] =
    useState<typeof data>(undefined);
  if (data && data !== hydratedFromBlog) {
    setHydratedFromBlog(data);
    setTitle(data.blog.title);
    setContent(data.blog.content);

    const existingCategoryId =
  data.blog.category?._id ?? "";

setCategory(existingCategoryId);
    setImagePreview(data.blog.imageUrl ?? null);
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Validation
  const isValid =
    title.trim() !== "" && content.trim() !== "" && category !== "";
  const isValidDraft = title.trim() !== "" && category !== "";

const handleSave = (status: "draft" | "published") => {
  if (!slug) return;

  if (status === "published" && !isValid) return;
  if (status === "draft" && !isValidDraft) return;

  if (!data) return;

  setActiveStatus(status);

  mutate(
    {
      id: data.blog._id,
      blog: {
        title,
        content,
        category: category || undefined,
        image,
        status,
      },
    },
    {
      onSuccess: ({ blog }) => {
        if (status === "published") {
          navigate(`/feed/${blog.slug}`);
        } else {
          navigate("/feeds");
        }

        toast.success(
          status === "published"
            ? "Post updated successfully"
            : "Post saved to draft!",
        );
      },

      onSettled: () => {
        setActiveStatus(null);
      },
    },
  );
};

  if (isLoadingBlog) {
    return <EditPostSkeleton />;
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

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => handleSave("draft")}
              disabled={!isValidDraft || isEditPending}
            >
              {isEditPending && activeStatus === "draft"
                ? "Saving..."
                : "Save Draft"}
            </Button>

            <Button
              onClick={() => handleSave("published")}
              disabled={!isValid || isEditPending}
            >
              {isEditPending && activeStatus === "published"
                ? "Publishing..."
                : "Publish Changes"}
            </Button>
          </div>
        </div>

        {isError && (
          <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {getErrorMessage(error, "Couldn't update your post. Try again.")}
          </div>
        )}

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write post title..."
          className="mt-8 w-full border rounded-md pl-1 bg-transparent font-serif text-3xl font-semibold tracking-tight text-foreground placeholder:text-muted-foreground focus:outline-none"
        />

        {/* Dynamic Category Dropdown */}
        <div className="mt-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={categoryPending}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          >
            <option value="" disabled>
              {categoryPending ? "Loading categories..." : "Choose a category"}
            </option>
            {categoryList?.categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cover image */}
        <div className="mt-6">
          {imagePreview ? (
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <img
                src={imagePreview}
                alt="Cover preview"
                className="h-64 w-full object-cover"
              />
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
          <TiptapEditor content={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
}
