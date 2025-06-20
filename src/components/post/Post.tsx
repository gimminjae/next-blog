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
  const classNameStr = "w-[80%] px-3 py-1 flex justify-between cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"

  return (
    <>
      <Card className={classNameStr} href="#" onClick={movePostDetailPage}>
        <p className="text-gray-900 dark:text-white">
          {post.title}
        </p>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{post.createdAt}</span>
        </div>
        <div className="hidden group-hover:block">
          <CreatedBy value={post.userEmail} />
        </div>
      </Card>
    </>
  )
}

export default memo(Post)
