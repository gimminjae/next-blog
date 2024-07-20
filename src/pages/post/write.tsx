import { useAuth } from "@/firebase/auth";
import { postModel } from "@/firebase/database";
import React, { useCallback, useState } from "react";

const WritePostPage = () => {
  const { user } = useAuth();

  const [post, setPost] = useState<Post>({
    userId: "",
    title: "",
    content: "",
  });
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, name, value } = e.target;
    setPost((prev) => ({ ...prev, [id || name]: value }));
  }, []);

  const submitPost = useCallback(() => {
    if (!user) {
      alert("로그인 필요");
    }
    if (!post.title.trim() || !post.content.trim()) {
      alert("title, content is empty");
    }
    postModel.writePost({ ...post, userId: user?.uid as string });
  }, [post]);
  return (
    <>
      <div>write post</div>
      <input
        type="text"
        id="title"
        value={post.title}
        onChange={handleChange}
      />
      <input
        type="text"
        id="content"
        value={post.content}
        onChange={handleChange}
      />
      <button className="btn btn-primary" onClick={submitPost}>
        submit
      </button>
    </>
  );
};

export default WritePostPage;
