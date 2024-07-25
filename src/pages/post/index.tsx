import PostList from "@/components/PostList"
import { postModel } from "@/firebase/database"
import React from "react"
import { useQuery } from "react-query"

const PostPage = () => {
  const { error, data: postList } = useQuery(["posts"], postModel.getPostList)
  return (
    <div>
      <PostList error={error} postList={postList} />
    </div>
  )
}

export default PostPage
