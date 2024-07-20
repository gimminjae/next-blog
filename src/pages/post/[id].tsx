import { useAuth } from "@/firebase/auth";
import { postModel } from "@/firebase/database";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

const PostDetail = () => {
  const router = useRouter();
  const { user } = useAuth();
  const postId = router.query.id as string;
  const {
    isLoading,
    error,
    data: post,
  } = useQuery<Post, Error>(["post"], () => postModel.getPostById(postId));
  useEffect(() => {
    if (!postId) router.push("/post");
  }, []);
  const handleDelete = useCallback(() => {
    const result = postModel.deletePostById(postId);
    router.push("/post");
  }, [user, postId, post]);
  return (
    <>
      {isLoading && <p>is loading</p>}
      {error && <p>{error.message}</p>}
      {post && (
        <div>
          <h1>{post.title}</h1>
          <div>
            <p>{post.createdAt}</p>
            <p>{post.updatedAt}</p>
            {user?.uid === post.userId && (
              <div>
                <button onClick={() => console.log("post update")}>
                  update
                </button>
                <button onClick={handleDelete}>delete</button>
              </div>
            )}
          </div>
          <p>{post.content}</p>
        </div>
      )}
    </>
  );
};
export default PostDetail;
