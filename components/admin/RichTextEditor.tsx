"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Code, Quote } from "lucide-react";
import { useEffect } from "react";

const RichTextEditor = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose-editor focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      // Allow external state to repopulate the editor
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleH1 = () => editor.chain().focus().toggleHeading({ level: 1 }).run();
  const toggleH2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run();

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
  }: {
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: 6,
        background: isActive ? "var(--accent-dim)" : "transparent",
        color: isActive ? "var(--accent)" : "var(--text-muted)",
        border: isActive ? "1px solid var(--border-subtle)" : "1px solid transparent",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
      className="hover-bg-accent-dim"
    >
      {children}
    </button>
  );

  return (
    <div
      style={{
        border: "1px solid var(--border-subtle)",
        borderRadius: 8,
        background: "var(--bg-base)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.5rem",
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-card)",
          flexWrap: "wrap",
        }}
      >
        <ToolbarButton onClick={toggleBold} isActive={editor.isActive("bold")}>
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={toggleItalic} isActive={editor.isActive("italic")}>
          <Italic size={15} />
        </ToolbarButton>
        <div style={{ width: 1, height: 20, background: "var(--border-subtle)", margin: "0 0.25rem" }} />
        <ToolbarButton onClick={toggleH1} isActive={editor.isActive("heading", { level: 1 })}>
          <Heading1 size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={toggleH2} isActive={editor.isActive("heading", { level: 2 })}>
          <Heading2 size={15} />
        </ToolbarButton>
        <div style={{ width: 1, height: 20, background: "var(--border-subtle)", margin: "0 0.25rem" }} />
        <ToolbarButton onClick={toggleBulletList} isActive={editor.isActive("bulletList")}>
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={toggleOrderedList} isActive={editor.isActive("orderedList")}>
          <ListOrdered size={15} />
        </ToolbarButton>
        <div style={{ width: 1, height: 20, background: "var(--border-subtle)", margin: "0 0.25rem" }} />
        <ToolbarButton onClick={toggleBlockquote} isActive={editor.isActive("blockquote")}>
          <Quote size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={toggleCodeBlock} isActive={editor.isActive("codeBlock")}>
          <Code size={15} />
        </ToolbarButton>
      </div>

      <div style={{ padding: "1rem" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .prose-editor {
            min-height: 200px;
            color: var(--text-secondary);
            font-family: var(--font-sans);
            font-size: 0.9375rem;
            line-height: 1.65;
          }
          .prose-editor p.is-editor-empty:first-child::before {
            color: var(--text-muted);
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
          }
          .prose-editor h1 { font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-top: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display); }
          .prose-editor h2 { font-size: 1.4rem; font-weight: 700; color: var(--text-primary); margin-top: 1rem; margin-bottom: 0.5rem; font-family: var(--font-display); }
          .prose-editor ul { padding-left: 1.5rem; margin-bottom: 1rem; list-style-type: disc; }
          .prose-editor ol { padding-left: 1.5rem; margin-bottom: 1rem; list-style-type: decimal; }
          .prose-editor li { margin-bottom: 0.25rem; }
          .prose-editor p { margin-bottom: 0.75rem; }
          .prose-editor blockquote { border-left: 3px solid var(--accent); padding-left: 1rem; color: var(--text-muted); font-style: italic; margin-bottom: 1rem; }
          .prose-editor code { background: var(--bg-card); color: var(--accent); padding: 0.2em 0.4em; border-radius: 4px; font-family: var(--font-mono); font-size: 0.85em; }
          .prose-editor pre { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1rem; margin-bottom: 1rem; overflow-x: auto; font-family: var(--font-mono); font-size: 0.85em; color: var(--text-primary); }
          .prose-editor pre code { background: transparent; color: inherit; padding: 0; }
        `}} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
