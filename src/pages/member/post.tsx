import { useAuth } from "@/firebase/auth"
import { postModel } from "@/firebase/database"
import PostList from "@/components/post/PostList"
import { useCustomQuery } from "@/hooks/useCustomQuery"

const UsersPostList = () => {
  const { user } = useAuth()
  const { error, data: postList } = useCustomQuery({
    key: "posts", 
    queryFn: () =>
      postModel.getPostListByUserId(user?.uid as string)
  })
  return (
    <>
      <h1 className="text-5xl mx-3 my-3">My Post</h1>
      <PostList error={error} postList={postList} />
    </>
  )
}

export default UsersPostList
