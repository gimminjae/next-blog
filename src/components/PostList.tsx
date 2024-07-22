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
      {isLoading && <SkeletonCardList length={20} columnNumber={5} />}
      {error && <p>{error.message}</p>}
      <div className="grid grid-cols-5 gap-4 place-content-center">
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
