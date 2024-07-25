import React from "react"
import Post from "./Post"

interface DataSet {
  error: any
  postList: Post[] | any
}
const PostList = ({ error, postList }: DataSet) => {
  return (
    <>
      {error && <p>{error.message}</p>}
      <div className="grid grid-cols-1 mx-auto gap-3 whitespace-nowrap animate-fade-up xl:place-items-center">
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
