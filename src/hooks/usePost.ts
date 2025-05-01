import { postModel } from "@/firebase/database"

type Param = {
  userId?: string
  postId?: string
}

type Props = {
  param?: Param
  byType?: "user" | "id"
}

const usePost = (
  { param, byType }: Props = { param: {}, byType: undefined }
) => {
  const deleteById = (id: string) => postModel.deletePostById(id)
  return { deleteById }
}

export default usePost
