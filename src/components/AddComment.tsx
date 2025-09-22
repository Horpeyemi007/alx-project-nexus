// src/components/AddComment.tsx
import React, { useState } from "react";

export const AddComment: React.FC<{
  onAdd: (text: string) => Promise<any>;
}> = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      await onAdd(text.trim());
      setText("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-3">
      <div className="flex items-start gap-2">
        <textarea
          className="flex-1 border rounded p-2 resize-none"
          rows={2}
          value={text}
          placeholder="Write a comment..."
          onChange={(e) => setText(e.target.value)}
        />
        <button
          disabled={!text.trim() || loading}
          className="px-3 py-1 rounded bg-blue-600 text-white"
        >
          {loading ? "..." : "Reply"}
        </button>
      </div>
    </form>
  );
};
