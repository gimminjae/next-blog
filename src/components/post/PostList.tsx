import React, { memo, useMemo } from "react"
import Post from "./Post"

interface DataSet {
  error: any
  postList: Post[] | any
}
const PostList = ({ error, postList }: DataSet) => {
  const postListIsValid = useMemo(
    () => postList && Array.isArray(postList) && postList?.length > 0,
    [postList]
  )

  return (
    <>
      {error && <p>{error.message}</p>}
      <div className="grid grid-cols-1 mx-auto gap-2 place-items-center justify-center">
        {postListIsValid &&
          // eslint-disable-next-line react/jsx-key
          postList.map((post: Post, index: number) => (
            <Post key={index} post={post} />
          ))}
      </div>
    </>
  )
}
export default memo(PostList)
