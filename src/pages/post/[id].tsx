import { CreatedBy } from "@/components/common"
import { useAuth } from "@/hooks/useAuth"
import { postModel } from "@/firebase/database"
import { success } from "@/util/toast"
import { Button } from "flowbite-react"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useMemo } from "react"
import useCRouter from "@/hooks/useCRouter"
import usePost from "@/hooks/usePost"
import MetaHead from "@/components/common/Head"
import { DeleteIcon, WriteIcon } from "@/components/icon/Icons"

const MdViewer = dynamic(() => import("@/components/post/MdViewer"), {
  ssr: false,
})

export async function getServerSideProps(context: any) {
  const { params } = context
  try {
    const post = await postModel.getPostById(params.id)
    return {
      props: { post },
    }
  } catch (error) {
    return {
      props: { error },
    }
  }
}

const PostDetail = ({ post, error }: any) => {
  const { push, query } = useCRouter()
  const { deleteById } = usePost()
  const { user } = useAuth()
  const postId = useMemo(() => query.id as string, [query])

  useEffect(() => {
    if (!postId) push({ path: "/post" })
  }, [postId])

  const handleDelete = useCallback(() => {
    if (!confirm("do you delete this post certainly?")) {
      return
    }
    if (postId) deleteById(postId)
    success("삭제되었습니다.\nPost is deleted.")
    push({ path: "/post" })
  }, [user, postId, post])

  const pushEditPost = useCallback(() => {
    push({ path: `/post/edit/${postId}` })
  }, [postId])

  const isSelf = useMemo(
    () => user?.uid === post.userId,
    [user?.uid, post.userId]
  )

  return (
    <>
      <MetaHead title={post.title} content={post.title} />
      {error && <p>{error.message}</p>}
      {post && (
        <div className="mx-auto xl:w-1/2 lg:w-3/5">
          <div className="flex flex-col gap-5">
            <h2 className="text-5xl">{post.title}</h2>
            <div>
              <div className="flex justify-start">
                <CreatedBy value={post.userEmail} />
              </div>
              <div className="flex justify-between">
                <div className="flex gap-5 items-center">
                  <div className="text-sm text-gray-500">
                    <span className="flex gap-2 items-center">
                      <WriteIcon className="w-3" />
                      {post.createdAt?.substring(0, 16)}
                    </span>
                  </div>
                  {user && (
                    <div className="text-sm text-gray-500">
                      <span className="flex gap-2 items-center">
                        <p>최종수정일: </p>
                        {post.updatedAt?.substring(0, 16)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  {isSelf && (
                    <>
                      <Button
                        pill
                        color="gray"
                        className="outline-off"
                        onClick={pushEditPost}
                      >
                        <WriteIcon />
                      </Button>
                      <Button
                        pill
                        color="red"
                        className="outline-off"
                        onClick={handleDelete}
                      >
                        <DeleteIcon />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <MdViewer content={post.content} />
          </div>
        </div>
      )}
    </>
  )
}
export default PostDetail
