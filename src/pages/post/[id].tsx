import { useAuth } from "@/firebase/auth"
import { postModel } from "@/firebase/database"
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
    router.push("/post")
  }, [user, postId, post])

  const pushEditPost = useCallback(() => {
    router.push(`/post/edit/${postId}`)
  }, [router, postId])
  return (
    <>
      {error && <p>{error.message}</p>}
      {post && (
        <div className="mx-auto xl:w-1/2 lg:w-3/5 animate-fade-up">
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex justify-end">
                <span className="text-gray-500 whitespace-nowrap">
                  <strong>By</strong> {post.userEmail || "unknown"}
                </span>
              </div>
              <h1 className="text-6xl">{post.title}</h1>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-5 items-center">
                <div className="text-sm text-gray-500">
                  {post.createdAt?.substring(0, 16)}
                </div>
                <div className="text-sm text-gray-500">
                  {post.updatedAt?.substring(0, 16)}
                </div>
              </div>
              <div className="flex">
                {user?.uid === post.userId && (
                  <>
                    <button
                      className="btn btn-active btn-sm btn-link"
                      onClick={pushEditPost}
                    >
                      <FaPenToSquare />
                      update
                    </button>
                    <button
                      className="btn btn-active btn-sm btn-link"
                      onClick={handleDelete}
                    >
                      <FaRegTrashCan />
                      delete
                    </button>
                  </>
                )}
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
