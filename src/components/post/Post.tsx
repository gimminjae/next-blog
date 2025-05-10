import { memo, useCallback, useMemo } from "react"
import CreatedBy from "@/components/common/CreatedBy"
import Card from "./Card"
import useCRouter from "@/hooks/useCRouter"
import util from "@/util/util"

const Post = (props: { post: Post }) => {
  const { post } = props
  const router = useCRouter()
  const refinedContent = useMemo(
    () => `${util.removeMd(post?.content)?.substring(0, 200)}....`,
    [post?.content]
  )
  const movePostDetailPage = useCallback(
    () => router.push({ path: `/post/${post.id}` }),
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
