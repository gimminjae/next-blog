import { useAuth } from "@/firebase/auth";
import { getPostListByUserId, getPostById } from "@/firebase/database";
import React, { useCallback, useEffect, useState } from "react";

const PostList = () => {
  const { user } = useAuth();
  const [postList, setPostList] = useState<any[]>([]);
  const getMyPosts = useCallback(async () => {
    const result = await getPostListByUserId(user ? user.uid : "");
    console.log("result: ", result);
    setPostList(result);
  }, [user]);
  useEffect(() => {
    getMyPosts();
  }, []);
  useEffect(() => {
    console.log(postList.entries);
  }, [postList]);
  return (
    <>
      <div>PostList</div>
      {postList &&
        postList.length &&
        postList.map((post: any) => {
          console.log(post);
          return (
            // eslint-disable-next-line react/jsx-key
            <div>
              <p>{post[0].title}</p>
              <p>{post[0].content}</p>
            </div>
          );
        })}
    </>
  );
};
export default PostList;
