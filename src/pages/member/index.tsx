import { useAuth } from "@/hooks/useAuth"
import { postModel } from "@/firebase/database"
import PostList from "@/components/post/PostList"
import React, { useEffect } from "react"
import { useCustomQuery } from "@/hooks/useCustomQuery"

const MyPage = () => {
  const { user } = useAuth()
  const {
    error,
    data: postList,
    refetch,
  } = useCustomQuery({
    key: "posts",
    queryFn: () =>
      user?.uid ? postModel.getPostListByUserId(user?.uid as string) : [],
  })

  useEffect(() => {
    refetch()
  }, [user?.uid])

  return (
    <div>
      <h1 className="font-5xl">My Page</h1>
      <PostList error={error} postList={postList} />
    </div>
  )
}
export default MyPage
