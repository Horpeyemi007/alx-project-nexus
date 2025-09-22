import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($after: String, $limit: Int = 10) {
    posts(after: $after, limit: $limit) {
      edges {
        node {
          id
          content
          createdAt
          author {
            id
            username
            avatarUrl
            roles
          }
          counts {
            likes
            comments
            shares
          }
          viewer {
            liked
          }
          comments(limit: 3) {
            id
            text
            createdAt
            author {
              id
              username
              avatarUrl
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      content
      createdAt
      author {
        id
        username
        avatarUrl
        roles
      }
      counts {
        likes
        comments
        shares
      }
      viewer {
        liked
      }
      comments {
        id
        text
        createdAt
        author {
          id
          username
          avatarUrl
        }
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      content
      createdAt
      author {
        id
        username
        avatarUrl
      }
      counts {
        likes
        comments
        shares
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      content
      updatedAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      success
      id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      createdAt
      author {
        id
        username
        avatarUrl
      }
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation ToggleLike($postId: ID!) {
    toggleLike(postId: $postId) {
      postId
      liked
      likesCount
    }
  }
`;

export const SHARE_POST = gql`
  mutation SharePost($postId: ID!) {
    sharePost(postId: $postId) {
      id
      sharesCount
    }
  }
`;
