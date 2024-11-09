import PostList from "@/components/post/PostList"
import { postModel } from "@/firebase/database"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useQuery } from "react-query"

const PostPage = () => {
  const { error, data: postList } = useQuery(["posts"], postModel.getPostList)
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
