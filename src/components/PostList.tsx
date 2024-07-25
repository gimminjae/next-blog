import React, { useCallback, useEffect, useState } from "react"
import Post from "./post/Post"
import SkeletonCardList from "./SkeletonCardList"

interface DataSet {
  error: any
  postList: Post[] | any
}
const PostList = ({ error, postList }: DataSet) => {
  return (
    <>
      {error && <p>{error.message}</p>}
      <div className="flex flex-col gap-3 place-content-center animate-fade-up">
        {postList &&
          Array.isArray(postList) &&
          postList.length &&
          // eslint-disable-next-line react/jsx-key
          postList.map((post: Post) => <Post post={post} />)}
      </div>
    </>
  )
}
export default PostList
