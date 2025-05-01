import { useAuth } from "@/hooks/useAuth"
import PostList from "@/components/post/PostList"
import React from "react"
import usePost from "@/hooks/usePost"

const MyPage = () => {
  const { user } = useAuth()

  const { postListByUserId } = usePost({ param: { userId: user?.uid } })

  return (
    <div>
      <h1 className="font-5xl">My Page</h1>
      <PostList
        error={postListByUserId?.error}
        postList={postListByUserId?.data}
      />
    </div>
  )
}
export default MyPage
