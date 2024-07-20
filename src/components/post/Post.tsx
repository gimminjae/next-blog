import { useRouter } from "next/router";

export function Post(props: { post: Post }) {
  const { post } = props;
  const router = useRouter();
  return (
    <>
      <div onClick={() => router.push(`/post/${post.id}`)}>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    </>
  );
}
