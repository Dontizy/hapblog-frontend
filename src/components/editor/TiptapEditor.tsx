import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapToolbar from "./TiptapToolbar";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({
  content,
  onChange,
  placeholder = "Tell your story…",
}: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap prose prose-neutral dark:prose-invert max-w-none min-h-[320px] px-4 py-4 focus:outline-none " +
          "prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight " +
          "prose-h2:text-2xl prose-h3:text-xl prose-p:text-[1.0625rem] prose-p:leading-8 " +
          "prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:font-serif " +
          "prose-blockquote:text-xl prose-blockquote:font-normal prose-blockquote:not-italic " +
          "prose-a:text-foreground prose-a:underline prose-a:decoration-accent prose-a:decoration-2",
      },
    },
  });

  return (
    <div>
      <TiptapToolbar editor={editor} />
      <div className="rounded-b-xl border border-border bg-background">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
