import { useAuth } from "@/firebase/auth";
import { postModel } from "@/firebase/database";
import { useQuery } from "react-query";
import { Post } from "../../components/post/Post";

const UsersPostList = () => {
  const { user } = useAuth();
  const {
    isLoading,
    error,
    data: postList,
  } = useQuery<Post[], Error>(["posts"], () =>
    postModel.getPostListByUserId(user?.uid as string)
  );
  return (
    <>
      <div>PostList</div>
      {isLoading && <p>is loading...</p>}
      {error && <p>{error.message}</p>}
      {postList &&
        Array.isArray(postList) &&
        postList.length &&
        // eslint-disable-next-line react/jsx-key
        postList.map((post: Post) => <Post post={post} />)}
    </>
  );
};

export default UsersPostList;
