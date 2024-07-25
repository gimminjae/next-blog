import { useAuth } from "@/firebase/auth"
import { postModel } from "@/firebase/database"
import { useQuery } from "react-query"
import PostList from "@/components/PostList"

const UsersPostList = () => {
  const { user } = useAuth()
  const { error, data: postList } = useQuery(["posts"], () =>
    postModel.getPostListByUserId(user?.uid as string)
  )
  return (
    <>
      <h1 className="text-5xl mx-3 my-3">My Post</h1>
      <PostList error={error} postList={postList} />
    </>
  )
}

export default UsersPostList
