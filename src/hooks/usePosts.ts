import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  TOGGLE_LIKE,
  ADD_COMMENT,
  SHARE_POST,
} from "@/graphql/operations/posts";

type User = {
  id: string;
  username: string;
  avatarUrl?: string;
  roles?: string[];
};

type Counts = {
  likes: number;
  comments: number;
  shares: number;
};

type ViewerInfo = {
  liked?: boolean;
};

type Comment = {
  id: string;
  text: string;
  createdAt: string;
  author: User;
};

type PostNode = {
  id: string;
  content: string;
  createdAt: string;
  author: User;
  counts?: Counts;
  viewer?: ViewerInfo;
  comments?: Comment[];
};

type PostEdge = {
  node: PostNode;
};

type PostsPageInfo = { endCursor?: string | null; hasNextPage: boolean };

type PostsConnection = {
  edges: PostEdge[];
  pageInfo: PostsPageInfo;
};

/** --- Query / Variables types --- */
interface GetPostsData {
  posts: PostsConnection;
}
interface GetPostsVars {
  after?: string | null;
  limit?: number;
}

export function usePosts(limit = 10) {
  const { data, loading, fetchMore, refetch } = useQuery<
    GetPostsData,
    GetPostsVars
  >(GET_POSTS, {
    variables: { limit },
  });

  const [createPostMutation] = useMutation(CREATE_POST);
  const [updatePostMutation] = useMutation(UPDATE_POST);
  const [deletePostMutation] = useMutation(DELETE_POST);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);
  const [addCommentMutation] = useMutation(ADD_COMMENT);
  const [sharePostMutation] = useMutation(SHARE_POST);

  const loadMore = async () => {
    if (!data?.posts?.pageInfo?.hasNextPage) return;
    await fetchMore({ variables: { after: data.posts.pageInfo.endCursor } });
  };

  const createPost = async (input: { content: string }, currentUser: any) => {
    // optimisticResponse and cache update to prepend the new post
    const optimisticId = `temp-${Math.random().toString(36).slice(2, 9)}`;
    await createPostMutation({
      variables: { input },
      optimisticResponse: {
        createPost: {
          __typename: "Post",
          id: optimisticId,
          content: input.content,
          createdAt: new Date().toISOString(),
          author: {
            __typename: "User",
            id: currentUser.id,
            username: currentUser.username,
            avatarUrl: currentUser.avatarUrl,
          },
          counts: { __typename: "Counts", likes: 0, comments: 0, shares: 0 },
        },
      },
      update: (cache, { data: resp }: any) => {
        const newPost = resp?.createPost;
        if (!newPost) return;
        cache.modify({
          fields: {
            posts(existing = { edges: [] }) {
              const newEdge = { __typename: "PostEdge", node: newPost };
              return { ...existing, edges: [newEdge, ...existing.edges] };
            },
          },
        });
      },
    });
  };

  const updatePost = async (id: string, input: { content: string }) =>
    updatePostMutation({ variables: { id, input } });

  const deletePost = async (id: string) =>
    deletePostMutation({
      variables: { id },
      update: (cache) => {
        // remove post from posts list in cache
        cache.modify({
          fields: {
            posts(existing = { edges: [] }) {
              return {
                ...existing,
                edges: existing.edges.filter((e: any) => e.node.id !== id),
              };
            },
          },
        });
      },
    });

  const toggleLike = async (postId: string, currentlyLiked: boolean) =>
    toggleLikeMutation({
      variables: { postId },
      optimisticResponse: {
        toggleLike: {
          __typename: "ToggleLikeResponse",
          postId,
          liked: !currentlyLiked,
          likesCount: currentlyLiked ? undefined : undefined, // backend may return; we update cache below
        },
      },
      update: (cache, { data }) => {
        // best-effort: update the post counts in cache
        const postIdRef = cache.identify({ __typename: "Post", id: postId });
        cache.modify({
          id: postIdRef,
          fields: {
            counts(existing = { likes: 0 }) {
              const delta = currentlyLiked ? -1 : 1;
              return { ...existing, likes: (existing.likes || 0) + delta };
            },
            viewer() {
              return { __typename: "ViewerInfo", liked: !currentlyLiked };
            },
          },
        });
      },
    });

  const addComment = async (postId: string, text: string, currentUser: any) =>
    addCommentMutation({
      variables: { postId, text },
      optimisticResponse: {
        addComment: {
          __typename: "Comment",
          id: `temp-c-${Math.random().toString(36).slice(2, 9)}`,
          text,
          createdAt: new Date().toISOString(),
          author: {
            __typename: "User",
            id: currentUser.id,
            username: currentUser.username,
            avatarUrl: currentUser.avatarUrl,
          },
        },
      },
      update: (cache, { data }: any) => {
        const newComment = data?.addComment;
        if (!newComment) return;
        // append to the post comments (for the single-post cache) and increment comment count on post
        const postRef = cache.identify({ __typename: "Post", id: postId });
        cache.modify({
          id: postRef,
          fields: {
            comments(existing = []) {
              return [...existing, newComment];
            },
            counts(existing = { comments: 0 }) {
              return { ...existing, comments: (existing.comments || 0) + 1 };
            },
          },
        });
      },
    });

  const sharePost = async (postId: string) =>
    sharePostMutation({
      variables: { postId },
      optimisticResponse: {
        sharePost: { __typename: "Post", id: postId, sharesCount: 1 },
      },
      update: (cache, { data }) => {
        const postRef = cache.identify({ __typename: "Post", id: postId });
        cache.modify({
          id: postRef,
          fields: {
            counts(existing = { shares: 0 }) {
              return { ...existing, shares: (existing.shares || 0) + 1 };
            },
          },
        });
      },
    });

  return {
    posts: data?.posts || {
      edges: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    },
    loading,
    loadMore,
    refetch,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    addComment,
    sharePost,
  };
}
