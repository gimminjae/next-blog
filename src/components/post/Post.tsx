import { useRouter } from "next/router"
import Card from "./Card"
import { useMemo } from "react"
import RemoveMarkdown from "remove-markdown"

const Post = (props: { post: Post }) => {
  const { post } = props
  const router = useRouter()
  const refinedContent = useMemo(
    () => `${RemoveMarkdown(post.content).substring(0, 200)}....`,
    []
  )
  return (
    <>
      <Card
        title={post.title}
        content={`${RemoveMarkdown(post.content).substring(0, 200)}....`}
        author={post.userEmail}
        createdAt={post.createdAt as string}
        onClick={() => router.push(`/post/${post.id}`)}
      />
    </>
  )
}

export default Post
