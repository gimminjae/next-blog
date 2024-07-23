import { useAuth } from "@/firebase/auth"
import { postModel } from "@/firebase/database"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { ChangeEvent, useCallback, useEffect, useState } from "react"

const MdEditor = dynamic(() => import("@/components/post/MdEditor"), {
  ssr: false,
})

const EditPostPage = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [post, setPost] = useState<Post>({
    userId: "",
    title: "",
    content: "",
  })
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { id, name, value } = e.target
    setPost((prev) => ({ ...prev, [id || name]: value }))
  }, [])
  const setContent = useCallback((value: string) => {
    handleChange({
      target: { id: "content", name: "content", value },
    } as ChangeEvent<HTMLInputElement>)
  }, [])

  const submitPost = useCallback(() => {
    if (!user) {
      alert("로그인 필요")
    }
    if (!post.title.trim() || !post.content.trim()) {
      alert("title, content is empty")
    }
    postModel.updatePost({ ...post, userId: user?.uid as string })
    router.push(`/post/${post.id}`)
  }, [post])

  const getPost = useCallback(async () => {
    const postId = router.query.id
    const apiPost = await postModel.getPostById(postId as string)
    setPost(apiPost)
  }, [router])

  useEffect(() => {
    getPost()
  }, [])
  return (
    <>
      <div className="flex flex-col gap-5 my-5">
        <div className="flex justify-between">
          <label className="input input-bordered flex items-center gap-2  w-1/2">
            Title
            <input
              className="grow"
              type="text"
              id="title"
              value={post.title}
              onChange={handleChange}
            />
          </label>
          <div className="flex gap-3">
            <div className="whitespace-nowrap">Banner Image</div>
            <input
              type="file"
              className="file-input file-input-bordered file-input-md w-full max-w-xs"
            />
            <button className="btn btn-primary" onClick={submitPost}>
              submit
            </button>
          </div>
        </div>
        <div>
          {typeof window !== "undefined" && MdEditor && (
            <MdEditor value={post.content} onChange={setContent} />
          )}
        </div>
      </div>
    </>
  )
}

export default EditPostPage
