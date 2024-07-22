import PostList from "@/components/PostList"
import { postModel } from "@/firebase/database"
import React from "react"
import { useQuery } from "react-query"

const PostPage = () => {
  const {
    isLoading,
    error,
    data: postList,
  } = useQuery<Post[], Error>(["posts"], postModel.getPostList)
  return (
    <div>
      <PostList isLoading={isLoading} error={error} postList={postList} />
    </div>
  )
}

export default PostPage
