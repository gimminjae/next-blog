import { useAuth } from "@/firebase/auth"
import { postModel } from "@/firebase/database"
import { error, info, success, warning } from "@/util/toast"
import { Button, TextInput } from "flowbite-react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { FaPenToSquare, FaArrowRotateLeft } from "react-icons/fa6"

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

  const [firstContent, setFirstContent] = useState<string>("")

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
      error("로그인 필요")
      return
    }
    if (!post.title.trim() || !post.content.trim()) {
      warning("제목 혹은 내용이 없습니다.\nTitle, content is empty.")
      return
    }
    postModel.updatePost({ ...post, userId: user?.uid as string })
  }, [post])

  const savePost = useCallback(async () => {
    await submitPost()
    success("글이 수정되었습니다.\nPost is modified.")
    router.push(`/post/${post.id}`)
  }, [post])

  const resetPost = useCallback(() => {
    setContent(firstContent)
    info("초기화되었습니다.\nInitialized successfully")
  }, [firstContent])

  const getPost = useCallback(async () => {
    const postId = router.query.id
    const apiPost = await postModel.getPostById(postId as string)
    setPost(apiPost)
    setFirstContent(apiPost.content)
  }, [router])

  useEffect(() => {
    getPost()
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (post.content) {
        submitPost()
        info("임시저장되었습니다.\nSaved temporary successfully")
      }
    }, 15000) // 15초마다 실행

    return () => clearInterval(interval) // 컴포넌트가 언마운트될 때 인터벌 정리
  }, [post.content])

  return (
    <>
      <div className="flex flex-col gap-5 my-5">
        <div className="flex justify-between">
          <label className="input input-bordered flex items-center gap-2  w-1/2">
            Title
            <TextInput
              className="grow"
              type="text"
              id="title"
              value={post.title}
              placeholder="type the title..."
              onChange={handleChange}
            />
          </label>
          <div className="flex gap-3">
            <Button
              pill
              color="gray"
              className="outline-off"
              onClick={resetPost}
            >
              <FaArrowRotateLeft />
            </Button>
            <Button
              pill
              color="gray"
              className="outline-off"
              onClick={savePost}
            >
              <FaPenToSquare />
            </Button>
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
