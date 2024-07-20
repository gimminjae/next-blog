import { useAuth } from "@/firebase/auth";
import { postModel } from "@/firebase/database";
import React, { useCallback, useEffect, useState } from "react";
import { Post } from "./post/Post";
import { useQuery } from "react-query";

const PostList = () => {
  const { user } = useAuth();
  const {
    isLoading,
    error,
    data: postList,
  } = useQuery<Post[], Error>(["posts"], postModel.getPostList);
  return (
    <>
      <div>PostList</div>
      {isLoading && <p>is loading...</p>}
      {error && <p>{error.message}</p>}
      {postList &&
        Array.isArray(postList) &&
        postList.length &&
        // eslint-disable-next-line react/jsx-key
        postList.map((post: Post) => <Post post={post} />)}
    </>
  );
};
export default PostList;
