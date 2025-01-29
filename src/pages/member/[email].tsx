import PostList from "@/components/post/PostList"
import { postModel } from "@/firebase/database"
import { useCustomQuery } from "@/hooks/useCustomQuery"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"

const MemberPage = () => {
  const router = useRouter()
  const email = useMemo(() => router.query.email as string, [router])

  const {
    error,
    data: postList,
    refetch,
  } = useCustomQuery({
    key: "posts",
    queryFn: () =>
      email ? postModel.getPostListByUserEmail(email as string) : [],
  })

  useEffect(() => {
    if (email) refetch()
  }, [email])

  return (
    <div>
      {/* <div className="w-[50%]"> */}
      {email && <h1 className="text-3xl">{email} 님의 글</h1>}
      {/* </div> */}
      <PostList error={error} postList={postList} />
    </div>
  )
}
export default MemberPage
