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
    postModel.writePost({ ...post, userId: user?.uid as string })
    router.push("/post")
  }, [post])
  return (
    <>
      <div className="flex justify-between">
        <input
          className="input input-primary"
          type="text"
          id="title"
          value={post.title}
          onChange={handleChange}
        />
        <button className="btn btn-primary" onClick={submitPost}>
          submit
        </button>
      </div>
      <div>
        {typeof window !== "undefined" && MdEditor && (
          <MdEditor value={post.content} onChange={setContent} />
        )}
      </div>
    </>
  )
}

export default WritePostPage
