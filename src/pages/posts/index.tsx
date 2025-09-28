// src/pages/dashboard/index.tsx
import React, { useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { PostEditor } from "@/components/PostEditor";
import { PostItem } from "@/components/PostItem";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState<any>(null);
  const {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    addComment,
    sharePost,
    loadMore,
  } = usePosts(10);

  const handleCreate = async (content: string) => {
    if (!user) {
      alert("Please log in");
      return;
    }
    await createPost({ content }, user);
  };

  const handleEdit = (post: any) => setEditing(post);
  const handleSaveEdit = async (content: string) => {
    if (!editing) return;
    await updatePost(editing.id, { content });
    setEditing(null);
  };

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard / Posts</h1>

      <section>
        <div className="mb-4">
          <PostEditor onSave={handleCreate} />
        </div>

        {editing && (
          <div className="mb-4">
            <h3 className="text-sm font-medium">Edit post</h3>
            <PostEditor
              initialContent={editing.content}
              onSave={handleSaveEdit}
              onCancel={() => setEditing(null)}
            />
          </div>
        )}

        <div className="space-y-4">
          {loading && <div className="text-gray-500">Loading posts...</div>}
          {posts?.edges?.map((edge: any) => (
            <PostItem
              key={edge.node.id}
              post={edge.node}
              onEdit={handleEdit}
              onDelete={async (id) => {
                if (!confirm("Delete this post?")) return;
                await deletePost(id);
              }}
              onToggleLike={async (postId, currentlyLiked) =>
                toggleLike(postId, currentlyLiked)
              }
              onAddComment={async (postId, text) => {
                if (!user) {
                  alert("Login to comment");
                  return;
                }
                return addComment(postId, text, user);
              }}
              onShare={async (postId) => sharePost(postId)}
            />
          ))}
        </div>

        {posts?.pageInfo?.hasNextPage && (
          <div className="text-center mt-4">
            <button
              onClick={() => loadMore()}
              className="px-4 py-2 rounded bg-gray-100 border"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
