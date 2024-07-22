import { useAuth } from "@/firebase/auth";
import { postModel } from "@/firebase/database";
import { useQuery } from "react-query";
import PostList from "@/components/PostList";

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
      <div>My Post</div>
      {isLoading && <p>is loading...</p>}
      {error && <p>{error.message}</p>}
      {postList && Array.isArray(postList) && postList.length && (
        // eslint-disable-next-line react/jsx-key
        <PostList isLoading={isLoading} error={error} postList={postList} />
      )}
    </>
  );
};

export default UsersPostList;
