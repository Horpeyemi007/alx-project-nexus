// src/components/PostEditor.tsx
import React, { useState, useEffect } from "react";

type Props = {
  initialContent?: string;
  onCancel?: () => void;
  onSave: (content: string) => Promise<any> | void;
  saving?: boolean;
  placeholder?: string;
};

export const PostEditor: React.FC<Props> = ({
  initialContent = "",
  onCancel,
  onSave,
  saving = false,
  placeholder = "What's happening?",
}) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => setContent(initialContent), [initialContent]);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!content.trim()) return;
    await onSave(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={submit} className="p-4 bg-white rounded-md shadow-sm">
      <textarea
        className="w-full border rounded p-3 resize-none focus:outline-none focus:ring"
        rows={4}
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-gray-500">{content.length}/1000</div>
        <div className="flex gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1 rounded border"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={saving || !content.trim()}
            className="px-4 py-1 rounded bg-blue-600 text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};
