import React, { memo } from "react"
import Post from "./Post"

interface DataSet {
  error: any
  postList: Post[] | any
}
const PostList = ({ error, postList }: DataSet) => {
  return (
    <>
      {error && <p>{error.message}</p>}
      <div className="grid grid-cols-1 mx-auto gap-3 animate-fade-up xl:place-items-center">
        {postList &&
          Array.isArray(postList) &&
          postList?.length > 0 &&
          // eslint-disable-next-line react/jsx-key
          postList.map((post: Post, index: number) => (
            <Post key={index} post={post} />
          ))}
      </div>
    </>
  )
}
export default memo(PostList)
