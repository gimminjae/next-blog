import { useAuth } from "@/hooks/useAuth"
import dynamic from "next/dynamic"
import { useMemo, ChangeEvent, useCallback, useState, memo } from "react"
import { success, warning } from "@/util/toast"
import useCRouter from "@/hooks/useCRouter"
import usePost from "@/hooks/usePost"
import MetaHead from "@/components/common/Head"
import { WriteIcon } from "@/components/icon/Icons"
import FormTextInput from "@/components/form/FormTextInput"
import FormButton from "@/components/form/FormButton"

const MdEditor = dynamic(() => import("@/components/post/MdEditor"), {
  ssr: false,
})

const WritePostPage = () => {
  const { user } = useAuth()
  const router = useCRouter()

  const [post, setPost] = useState<Post>({
    userId: "",
    userEmail: "",
    title: "",
    content: "",
  })

  const { writePost } = usePost()

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { id, name, value } = e.target
    setPost((prev) => ({ ...prev, [id || name]: value }))
  }, [])

  const setContent = useCallback((value: string) => {
    handleChange({
      target: { id: "content", name: "content", value },
    } as ChangeEvent<HTMLInputElement>)
  }, [])

  const submitPost = useCallback(async () => {
    if (!user) {
      alert("로그인 필요")
      return
    }
    if (!post.title.trim() || !post.content.trim()) {
      warning("제목 혹은 내용이 없습니다.\nTitle, content is empty.")
      return
    }
    const savedPost = await writePost({
      ...post,
      userId: user?.uid!!,
      userEmail: user?.email!!,
    })
    success("글이 작성되었습니다.\nPost is written.")
    router.push({ path: savedPost?.id ? `/post/${savedPost?.id}` : '/' })
  }, [post, user])

  const editorIsValid = useMemo(
    () => typeof window !== "undefined" && MdEditor,
    []
  )

  return (
    <>
      <MetaHead title="Write New Post" content="Write new Post" />
      <div className="flex flex-col gap-5 my-5">
        <div className="flex justify-between">
          <label className="input input-bordered flex items-center gap-2 w-1/2">
            Title
            <FormTextInput
              className="grow"
              type="text"
              id="title"
              value={post.title}
              placeholder="type the title..."
              onChange={handleChange}
            />
          </label>
          <div className="flex gap-3">
            <FormButton
              pill
              color="gray"
              className="outline-off"
              onClick={submitPost}
            >
              <WriteIcon />
            </FormButton>
          </div>
        </div>
        <div>
          {editorIsValid && (
            <MdEditor value={post.content} onChange={setContent} />
          )}
        </div>
      </div>
    </>
  )
}

export default memo(WritePostPage)
