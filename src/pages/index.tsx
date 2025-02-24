import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { useCustomQuery } from "@/hooks/useCustomQuery"
import { postModel } from "@/firebase/database"
import PostList from "@/components/post/PostList"

function Home() {
  const { error, data: postList } = useCustomQuery({
    key: "posts",
    queryFn: postModel.getPostList,
  })

  const router = useRouter()

  return (
    <div>
      <PostList error={error} postList={postList} />
    </div>
  )
}
export default Home
