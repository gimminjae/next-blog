import { useRouter } from "next/router"
import Card from "../Card"

const Post = (props: { post: Post }) => {
  const { post } = props
  const router = useRouter()
  return (
    <>
      <Card
        title={post.title}
        content={""}
        //`${post.content.substring(0, 50)}${"..."}`
        createdAt={post.createdAt as string}
        onClick={() => router.push(`/post/${post.id}`)}
      />
    </>
  )
}

export default Post
