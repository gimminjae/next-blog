import { useAuth } from "@/firebase/auth"
import { postModel } from "@/firebase/database"
import { useQuery } from "react-query"
import PostList from "@/components/post/PostList"
import React, { useEffect } from "react"

const MyPage = () => {
  const { user } = useAuth()
  const {
    error,
    data: postList,
    refetch,
  } = useQuery<any, Error>({
    queryKey: ["posts"],
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
