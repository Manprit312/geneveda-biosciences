"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing your content...",
}: RichTextEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [customHighlight, setCustomHighlight] = useState("");

  // Normalize URL - add protocol if missing
  const normalizeUrl = (url: string): string => {
    if (!url) return "";
    
    // Trim whitespace
    url = url.trim();
    
    // If it's already a valid URL with protocol, return as is
    if (/^https?:\/\//i.test(url)) {
      return url;
    }
    
    // If it starts with //, add https:
    if (url.startsWith("//")) {
      return `https:${url}`;
    }
    
    // If it starts with /, it's a relative URL, return as is
    if (url.startsWith("/")) {
      return url;
    }
    
    // If it contains a dot and looks like a domain, add https://
    if (url.includes(".") && !url.includes(" ")) {
      return `https://${url}`;
    }
    
    // Otherwise, treat as relative URL
    return url;
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-emerald-600 underline cursor-pointer",
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      Color,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] px-4 py-3 text-gray-900 dark:text-white prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-a:text-emerald-600 dark:prose-a:text-emerald-400",
      },
    },
  });

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const editorContainer = target.closest(".border.rounded-lg");
      
      // Check if click is outside all dropdowns
      if (
        !target.closest('[class*="shadow-xl"]') &&
        !target.closest('[class*="shadow-lg"]') &&
        editorContainer
      ) {
        setShowColorPicker(false);
        setShowHighlightPicker(false);
        setShowLinkInput(false);
      }
    };

    if (showColorPicker || showHighlightPicker || showLinkInput) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showColorPicker, showHighlightPicker, showLinkInput]);

  if (!editor) {
    return (
      <div className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 min-h-[400px] flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 overflow-hidden relative">
      {/* Toolbar - Sticky */}
      <div className="sticky top-0 z-10 border-b border-gray-300 dark:border-gray-600 p-2 flex flex-wrap gap-1 bg-gray-50 dark:bg-gray-800 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${
            editor.isActive("bold")
              ? "bg-emerald-600 text-white"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${
            editor.isActive("italic")
              ? "bg-emerald-600 text-white"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${
            editor.isActive("strike")
              ? "bg-emerald-600 text-white"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          <s>S</s>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${
            editor.isActive("underline")
              ? "bg-emerald-600 text-white"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          title="Underline"
        >
          <u>U</u>
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Text Color */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowColorPicker(!showColorPicker);
              setShowHighlightPicker(false);
              setShowLinkInput(false);
              const currentColor = editor.getAttributes("textStyle").color;
              setCustomColor(currentColor || "");
            }}
            className={`px-3 py-1.5 rounded text-sm font-medium transition relative ${
              editor.isActive("textStyle")
                ? "bg-emerald-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
            title="Text Color"
          >
            A
            <span
              className="absolute bottom-0.5 right-1 w-2 h-2 rounded-full border border-gray-400"
              style={{
                backgroundColor: editor.getAttributes("textStyle").color || "#000000",
              }}
            />
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl z-[100] min-w-[200px]">
              <div className="grid grid-cols-6 gap-1.5 mb-3">
                {[
                  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00",
                  "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#FFC0CB", "#A52A2A",
                  "#808080", "#008000", "#000080", "#800000", "#FFD700", "#4B0082",
                ].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                      setShowColorPicker(false);
                    }}
                    className="w-7 h-7 rounded border-2 border-gray-300 dark:border-gray-600 hover:scale-110 hover:border-emerald-500 transition-all cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <div className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCustomColor(value);
                    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                      editor.chain().focus().setColor(value).run();
                    }
                  }}
                  placeholder="#000000"
                  className="flex-1 px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  maxLength={7}
                />
                <div
                  className="w-8 h-8 rounded border-2 border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: customColor || "#000000" }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setShowColorPicker(false);
                  setCustomColor("");
                }}
                className="w-full px-2 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Highlight */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowHighlightPicker(!showHighlightPicker);
              setShowColorPicker(false);
              setShowLinkInput(false);
              const currentHighlight = editor.getAttributes("highlight").color;
              setCustomHighlight(currentHighlight || "");
            }}
            className={`px-3 py-1.5 rounded text-sm font-medium transition ${
              editor.isActive("highlight")
                ? "bg-emerald-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
            title="Highlight"
          >
            <span className="bg-yellow-300 px-1 rounded">H</span>
          </button>
          {showHighlightPicker && (
            <div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl z-[100] min-w-[200px]">
              <div className="grid grid-cols-6 gap-1.5 mb-3">
                {[
                  "#FFFF00", "#FFE5B4", "#90EE90", "#87CEEB", "#FFB6C1", "#DDA0DD",
                  "#F0E68C", "#98FB98", "#AFEEEE", "#FFA07A", "#FF69B4", "#BA55D3",
                ].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      editor.chain().focus().toggleHighlight({ color }).run();
                      setShowHighlightPicker(false);
                    }}
                    className="w-7 h-7 rounded border-2 border-gray-300 dark:border-gray-600 hover:scale-110 hover:border-emerald-500 transition-all cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <div className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  value={customHighlight}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCustomHighlight(value);
                    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                      editor.chain().focus().toggleHighlight({ color: value }).run();
                    }
                  }}
                  placeholder="#FFFF00"
                  className="flex-1 px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  maxLength={7}
                />
                <div
                  className="w-8 h-8 rounded border-2 border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: customHighlight || "#FFFF00" }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetHighlight().run();
                  setShowHighlightPicker(false);
                  setCustomHighlight("");
                }}
                className="w-full px-2 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Link */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              const url = editor.getAttributes("link").href;
              setLinkUrl(url || "");
              setShowLinkInput(!showLinkInput);
              setShowColorPicker(false);
              setShowHighlightPicker(false);
            }}
            className={`px-3 py-1.5 rounded text-sm font-medium transition ${
              editor.isActive("link")
                ? "bg-emerald-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
            title="Link"
          >
            🔗
          </button>
          {showLinkInput && (
            <div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl z-[100] min-w-[300px]">
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL (e.g., https://example.com)"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (linkUrl) {
                      const normalizedUrl = normalizeUrl(linkUrl);
                      editor.chain().focus().setLink({ href: normalizedUrl }).run();
                    } else {
                      editor.chain().focus().unsetLink().run();
                    }
                    setShowLinkInput(false);
                    setLinkUrl("");
                  }
                  if (e.key === "Escape") {
                    setShowLinkInput(false);
                    setLinkUrl("");
                  }
                }}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (linkUrl) {
                      const normalizedUrl = normalizeUrl(linkUrl);
                      editor.chain().focus().setLink({ href: normalizedUrl }).run();
                    } else {
                      editor.chain().focus().unsetLink().run();
                    }
                    setShowLinkInput(false);
                    setLinkUrl("");
                  }}
                  className="flex-1 px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().unsetLink().run();
                    setShowLinkInput(false);
                    setLinkUrl("");
                  }}
                  className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLinkInput(false);
                    setLinkUrl("");
                  }}
                  className="px-3 py-1.5 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${
            editor.isActive("heading", { level: 1 })
              ? "bg-emerald-600 text-white"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${
            editor.isActive("heading", { level: 2 })
              ? "bg-emerald-600 text-white"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${
            editor.isActive("heading", { level: 3 })
              ? "bg-emerald-600 text-white"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          H3
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${
            editor.isActive("bulletList")
              ? "bg-emerald-600 text-white"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${
            editor.isActive("orderedList")
              ? "bg-emerald-600 text-white"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          1. List
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${
            editor.isActive("blockquote")
              ? "bg-emerald-600 text-white"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          "
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Code */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition ${
            editor.isActive("codeBlock")
              ? "bg-emerald-600 text-white"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          &lt;/&gt;
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Undo/Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="px-3 py-1.5 rounded text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="px-3 py-1.5 rounded text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ↷
        </button>
      </div>

      {/* Editor Content */}
      <div className="min-h-[400px] max-h-[600px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

