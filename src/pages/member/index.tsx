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
      <div className="mx-auto my-10 w-[70%]">
        <h1 className="text-5xl">마이페이지</h1>
      </div>
      <PostList error={error} postList={postList} />
    </div>
  )
}
export default MyPage
