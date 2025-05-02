import PostList from "@/components/post/PostList"
import useCRouter from "@/hooks/useCRouter"
import usePost from "@/hooks/usePost"
import Head from "next/head"
import { useEffect, useMemo } from "react"

const MemberPage = () => {
  const router = useCRouter()
  const email = useMemo(() => (router.query.email as string) || "", [router.query])

  const { postListByUserEmail } = usePost({ param: { userEmail: email } })

  return (
    <>
      <Head>
        <title>{`About ${email}`}</title>
        <meta name="description" content={`About ${email}`} />
      </Head>
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
