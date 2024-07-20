import { postModel } from "@/firebase/database";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const PostDetail = () => {
  const router = useRouter();
  const postId = router.query.id as string;
  const {
    isLoading,
    error,
    data: post,
  } = useQuery<Post, Error>(["post"], () => postModel.getPostById(postId));
  useEffect(() => {
    if (!postId) router.push("/posts");
  }, []);
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
          </div>
          <p>{post.content}</p>
        </div>
      )}
    </>
  );
};
export default PostDetail;
