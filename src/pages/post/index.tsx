import PostList from "@/components/post/PostList"
import { postModel } from "@/firebase/database"
import { useCustomQuery } from "@/hooks/useCustomQuery"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const PostPage = () => {
  const { error, data: postList } = useCustomQuery({
    key: "posts",
    queryFn: postModel.getPostList,
  })
  const router = useRouter()

  useEffect(() => {
    router.replace("/member")
  }, [])

  return (
    <div>
      <PostList error={error} postList={postList} />
    </div>
  )
}

export default PostPage
