import { useAuth } from "@/firebase/auth";
import { postModel } from "@/firebase/database";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

const ToastEditor = dynamic(() => import("@/components/post/Editor"), {
  ssr: false,
});

const WritePostPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [post, setPost] = useState<Post>({
    userId: "",
    title: "",
    content: "",
  });

  const editorRef = useRef(null);
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
    // postModel.writePost({ ...post, userId: user?.uid as string });
    // router.push("/post");
    console.log(post);
  }, [post]);

  const [preview, setPreview] = useState<any>(
    typeof window !== "undefined" && window.innerWidth > 1000
      ? "vertical"
      : "tab"
  );

  const handleResize = () => {
    setPreview(window.innerWidth > 1000 ? "vertical" : "tab");
  };

  // 3. resize이벤트 구독
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div>write post</div>
      <input
        className="input input-primary"
        type="text"
        id="title"
        value={post.title}
        onChange={handleChange}
      />
      {typeof window !== "undefined" && editorRef && (
        <ToastEditor
          editorRef={editorRef}
          initialValue=""
          initialEditType="markdown"
          id="content"
          onChange={handleChange}
          preview={preview} // 4. preview state 사용
        />
      )}
      <button className="btn btn-primary" onClick={submitPost}>
        submit
      </button>
    </>
  );
};

export default WritePostPage;
