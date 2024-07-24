import React, { useCallback, useEffect, useState } from "react"
import Post from "./post/Post"
import SkeletonCardList from "./SkeletonCardList"

interface DataSet {
  isLoading: Boolean
  error: any
  postList: Post[] | any
}
const PostList = ({ isLoading, error, postList }: DataSet) => {
  return (
    <>
      {isLoading && <SkeletonCardList length={20} columnNumber={1} />}
      {error && <p>{error.message}</p>}
      <div className="flex flex-col gap-3 place-content-center">
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
