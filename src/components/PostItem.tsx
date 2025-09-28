// src/components/PostItem.tsx
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { CommentList } from "./CommentList";
import { AddComment } from "./AddComment";
import Image from "next/image";

export const PostItem: React.FC<{
  post: any;
  onEdit?: (post: any) => void;
  onDelete?: (id: string) => Promise<any>;
  onToggleLike: (postId: string, currentlyLiked: boolean) => Promise<any>;
  onAddComment: (postId: string, text: string) => Promise<any>;
  onShare: (postId: string) => Promise<any>;
}> = ({ post, onEdit, onDelete, onToggleLike, onAddComment, onShare }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);

  const isOwner = user?.id === post.author?.id;
  const canEdit =
    isOwner ||
    user?.roles?.includes("admin") ||
    user?.roles?.includes("moderator");

  return (
    <article className="p-4 bg-white rounded shadow-sm border">
      <header className="flex gap-3 items-start">
        <Image
          src={post.author?.avatarUrl || "/avatar.png"}
          width={20}
          height={20}
          className="rounded-full"
          alt=""
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{post.author?.username}</div>
              <div className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
            {canEdit && (
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit?.(post)}
                  className="text-sm text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete?.(post.id)}
                  className="text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="mt-2 text-gray-800">{post.content}</div>

          <div className="mt-3 flex items-center gap-4 text-sm">
            <button
              type="button"
              aria-pressed={post.viewer?.liked}
              onClick={() => onToggleLike(post.id, !!post.viewer?.liked)}
              className="flex items-center gap-2"
            >
              <span>{post.viewer?.liked ? "♥" : "♡"}</span>
              <span>{post.counts?.likes ?? 0}</span>
            </button>

            <button
              onClick={() => setShowComments((s) => !s)}
              className="flex items-center gap-2"
            >
              💬 <span>{post.counts?.comments ?? 0}</span>
            </button>

            <button
              onClick={() => onShare(post.id)}
              className="flex items-center gap-2"
            >
              ↗ <span>{post.counts?.shares ?? 0}</span>
            </button>
          </div>

          {showComments && (
            <div className="mt-3">
              <CommentList comments={post.comments || []} />
              <AddComment onAdd={(text) => onAddComment(post.id, text)} />
            </div>
          )}
        </div>
      </header>
    </article>
  );
};
