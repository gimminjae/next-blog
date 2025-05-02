import MetaHead from "@/components/common/Head"
import PostList from "@/components/post/PostList"
import useCRouter from "@/hooks/useCRouter"
import usePost from "@/hooks/usePost"
import { useMemo } from "react"

const MemberPage = () => {
  const router = useCRouter()
  const email = useMemo(() => (router.query.email as string) || "", [router.query])

  const { postListByUserEmail } = usePost({ param: { userEmail: email } })

  return (
    <>
      <MetaHead title={`About ${email}`} content={`About ${email}`} />
      <div>
        {email && (
          <h1 className="text-3xl my-5 text-center">
            <strong>{email}</strong> 님의 글
          </h1>
        )}
        <PostList
          error={postListByUserEmail?.error}
          postList={postListByUserEmail?.data}
        />
      </div>
    </>
  )
}
export default MemberPage
