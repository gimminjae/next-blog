// import { Card } from "flowbite-react"
import { Card } from "flowbite-react"
import { useRouter } from "next/router"
// import Card from "./Card"
import { memo, useCallback, useMemo } from "react"
import RemoveMarkdown from "remove-markdown"

const Post = (props: { post: Post }) => {
  const { post } = props
  const router = useRouter()
  const refinedContent = useMemo(
    () => `${RemoveMarkdown(post?.content)?.substring(0, 200)}....`,
    [post?.content]
  )
  const movePostDetailPage = useCallback(
    () => router.push(`/post/${post.id}`),
    [post.id]
  )
  const classNameStr = "sm:w-full md:w-full lg:w-[80%] xl:w-[70%]"

  return (
    <>
      <Card className={classNameStr} href="#" onClick={movePostDetailPage}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {refinedContent}
        </p>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{post.createdAt}</span>
          <span>By {post?.userEmail}</span>
        </div>
      </Card>
    </>
  )
}

export default memo(Post)
