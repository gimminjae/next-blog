import { useRouter } from "next/router"
import { memo, useCallback, useMemo } from "react"
import RemoveMarkdown from "remove-markdown"
import CreatedBy from "@/components/common/CreatedBy"
import Card from "./Card"

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
          <CreatedBy value={post.userEmail} />
        </div>
      </Card>
    </>
  )
}

export default memo(Post)