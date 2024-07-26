import { useAuth } from "@/firebase/auth"
import { postModel } from "@/firebase/database"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { FaPenToSquare } from "react-icons/fa6"

const MdEditor = dynamic(() => import("@/components/post/MdEditor"), {
  ssr: false,
})

const EditPostPage = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [post, setPost] = useState<Post>({
    userId: "",
    userEmail: "",
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
      return
    }
    if (!post.title.trim() || !post.content.trim()) {
      alert("title, content is empty")
      return
    }
    postModel.updatePost({ ...post, userId: user?.uid as string })
  }, [post])

  const savePost = useCallback(async () => {
    await submitPost()
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

  useEffect(() => {
    const interval = setInterval(async () => {
      if (post.content) {
        submitPost()
        console.log("save")
      }
    }, 10000) // 10초마다 실행

    return () => clearInterval(interval) // 컴포넌트가 언마운트될 때 인터벌 정리
  }, [post.content])
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
              placeholder="type the title..."
              value={post.title}
              onChange={handleChange}
            />
          </label>
          <div className="flex gap-3">
            <button className="btn" onClick={savePost}>
              <FaPenToSquare />
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
