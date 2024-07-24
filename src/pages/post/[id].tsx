import { useAuth } from "@/firebase/auth"
import { postModel } from "@/firebase/database"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useCallback, useEffect, useMemo } from "react"
import { useQuery } from "react-query"

const MdViewer = dynamic(() => import("@/components/post/MdViewer"), {
  ssr: false,
})

const PostDetail = () => {
  const router = useRouter()
  const { user } = useAuth()
  const postId = useMemo(() => router.query.id as string, [router])
  const {
    isLoading,
    error,
    data: post,
  } = useQuery<Post, Error>(["post"], () => postModel.getPostById(postId))
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
      {isLoading && <p>is loading</p>}
      {error && <p>{error.message}</p>}
      {post && (
        <div className="mx-auto xl:w-1/2 lg:w-3/5">
          <div className="">
            <div className="flex flex-col gap-3">
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
                      update
                    </button>
                    <button
                      className="btn btn-active btn-sm btn-link"
                      onClick={handleDelete}
                    >
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
