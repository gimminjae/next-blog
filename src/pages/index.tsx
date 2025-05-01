import React from "react"
import PostList from "@/components/post/PostList"
import Head from "next/head"
import usePost from "@/hooks/usePost"

function Home() {
  const { postList } = usePost()

  return (
    <>
      <Head>
        <title>The Note: Home</title>
        <meta name="description" content="The Note: Home" />
      </Head>
      <div>
        <PostList error={postList?.error} postList={postList?.data} />
      </div>
    </>
  )
}
export default Home
