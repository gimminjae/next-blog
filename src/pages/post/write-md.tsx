// import MdEditor from "@/components/post/MdEditor"
import dynamic from "next/dynamic";
import { useCallback, useState } from 'react'

const MdEditor = dynamic(() => import("@/components/post/MdEditor"), {
  ssr: false,
});

const WritePageMd = () => {
    const [post, setPost] = useState<Post>({
        userId: "",
        title: "",
        content: "",
      });
      const setContent = useCallback((value: string) => {
        setPost(prev => ({...prev, content: value}))
      }, [])
      const handleSubmit = useCallback(() => {
        console.log('post: ', post)
      }, [post])
    return (
        <>
        {
          typeof window !== "undefined" && MdEditor && <MdEditor value={post.content} onChange={setContent} />
        }
        <button className="btn btn-primary" onClick={handleSubmit}>submit</button>
        </>        
    )
}
export default WritePageMd