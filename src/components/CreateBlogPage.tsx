import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, X } from "lucide-react";
import { Button } from "./ui/button";
import TiptapEditor from "./editor/TiptapEditor";
import { useCreateBlog } from "../hooks/blog/useCreateBlog";
import { getErrorMessage } from "../lib/getErrorMessage";
import { Spinner } from "./loading/Spinner";
import { toast } from "sonner";
import { useGetCategories } from "../hooks/category/useCategory";

export default function CreatePostPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch dynamic categories list
  const { data: categoryList, isPending: categoryPending } = useGetCategories();

  // Track which status button was clicked for loading spinners
  const [activeStatus, setActiveStatus] = useState<
    "draft" | "published" | null
  >(null);

  const { mutate, isPending, isError, error } = useCreateBlog();

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
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // General validation for publishing (requires all fields)
  const isValid =
    title.trim() !== "" && content.trim() !== "" && category !== "";

  const isValidDraft = title.trim() !== "" && category !== "";

  // Accept targetStatus directly as an argument to avoid React stale closure state bugs
  const reDirectTo = (
    blog: { slug: string },
    targetStatus: "draft" | "published",
  ): void => {
    if (targetStatus === "published") {
      // Navigate to the view page of the newly published post
      navigate(`/feed/${blog.slug}`);
    } else {
      // Navigate back to the general feeds list after saving a draft
      navigate("/feeds");
    }
  };

  const handleSubmit = (status: "draft" | "published") => {
    if (status === "published" && !isValid) return;
    if (status === "draft" && !isValidDraft) return;

    setActiveStatus(status);

    mutate(
      {
        title,
        content,
        image,
        category,
        status,
      },
      {
        onSuccess: ({ blog }) => {
          reDirectTo(blog, status);
          toast.success(
            status === "published" ? "Post published" : "Post saved to draft",
          );
        },
        onSettled: () => {
          setActiveStatus(null);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Write a new post
          </h1>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => handleSubmit("draft")}
              disabled={!isValidDraft || isPending}
            >
              {isPending && activeStatus === "draft" ? (
                <>
                  <Spinner />
                  Saving...
                </>
              ) : (
                "Save Draft"
              )}
            </Button>

            <Button
              onClick={() => handleSubmit("published")}
              disabled={!isValid || isPending}
            >
              {isPending && activeStatus === "published" ? (
                <>
                  <Spinner />
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>

        {isError && (
          <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {getErrorMessage(error, "Couldn't save your post. Try again.")}
          </div>
        )}

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write post title..."
          className="mt-8 w-full rounded-md border bg-transparent pl-1 font-serif text-3xl font-semibold tracking-tight text-foreground placeholder:text-muted-foreground focus:outline-none"
        />

        {/* Dynamic Category Selector */}
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
            {categoryList?.categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
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
