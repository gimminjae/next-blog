import { useAuth } from "@/firebase/auth"
import { postModel } from "@/firebase/database"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

const MdEditor = dynamic(() => import("@/components/post/MdEditor"), {
  ssr: false,
})

const WritePostPage = () => {
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
    postModel.writePost({
      ...post,
      userId: user?.uid!!,
      userEmail: user?.email!!,
    })
    router.push("/post")
  }, [post])
  return (
    <>
      <div className="flex flex-col gap-5 my-5">
        <div className="flex justify-between">
          <label className="input input-bordered flex items-center gap-2 w-1/2">
            Title
            <input
              className="grow"
              type="text"
              id="title"
              value={post.title}
              placeholder="type the title..."
              onChange={handleChange}
            />
          </label>
          <div className="flex gap-3">
            <button className="btn" onClick={submitPost}>
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

export default WritePostPage
