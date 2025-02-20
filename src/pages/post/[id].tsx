import { CreatedBy } from "@/components/common"
import { useAuth } from "@/firebase/auth"
import { postModel } from "@/firebase/database"
import { success } from "@/util/toast"
import { Button } from "flowbite-react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useCallback, useEffect, useMemo } from "react"
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6"

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
  const router = useRouter()
  const { user } = useAuth()
  const postId = useMemo(() => router.query.id as string, [router])

  useEffect(() => {
    if (!postId) router.push("/post")
  }, [postId])

  const handleDelete = useCallback(() => {
    if (!confirm("do you delete this post certainly?")) {
      return
    }
    const result = postModel.deletePostById(postId)
    success("삭제되었습니다.\nPost is deleted.")
    router.push("/post")
  }, [user, postId, post])

  const pushEditPost = useCallback(() => {
    router.push(`/post/edit/${postId}`)
  }, [router, postId])

  const isSelf = useMemo(
    () => user?.uid === post.userId,
    [user?.uid, post.userId]
  )

  return (
    <>
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
                      <FaPenToSquare className="w-3" />
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
                        <FaPenToSquare />
                      </Button>
                      <Button
                        pill
                        color="red"
                        className="outline-off"
                        onClick={handleDelete}
                      >
                        <FaRegTrashCan />
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
