import React from "react"
import PostList from "@/components/post/PostList"
import usePost from "@/hooks/usePost"
import MetaHead from "@/components/common/Head"

function Home() {
  const { postList } = usePost()

  return (
    <>
      <MetaHead title="The Note: Home" content="The Note: Home" />
      <div>
        <PostList error={postList?.error} postList={postList?.data} />
      </div>
    </>
  )
}
export default Home
