// src/components/CommentList.tsx
import React from "react";

export const CommentList: React.FC<{ comments?: any[] }> = ({
  comments = [],
}) => {
  if (!comments.length)
    return <div className="text-sm text-gray-500">No comments yet</div>;
  return (
    <ul className="mt-2 space-y-2">
      {comments.map((c) => (
        <li key={c.id} className="flex items-start gap-3">
          <img
            src={c.author?.avatarUrl || "/avatar.png"}
            className="w-8 h-8 rounded-full"
            alt=""
          />
          <div>
            <div className="text-sm font-medium">{c.author?.username}</div>
            <div className="text-sm text-gray-700">{c.text}</div>
            <div className="text-xs text-gray-400">
              {new Date(c.createdAt).toLocaleString()}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
