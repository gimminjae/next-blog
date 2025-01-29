import PostList from "@/components/post/PostList"
import { useAuth } from "@/firebase/auth"
import { postModel } from "@/firebase/database"
import { useCustomQuery } from "@/hooks/useCustomQuery"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"

const MemberPage = () => {
  const router = useRouter()
  const { user } = useAuth()
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
      <h1 className="font-5xl">My Page</h1>
      <PostList error={error} postList={postList} />
    </div>
  )
}
export default MemberPage
