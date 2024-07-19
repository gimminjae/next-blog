import Link from "next/link";
import { useAuth } from "@/firebase/auth";
import React from "react";

const Header = () => {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <header>
      <div className="flex">
        <Link href="/">logo</Link> |<Link href="/post/write">write</Link> |
        <Link href="/post">posts</Link>
        <h1>{user?.displayName}</h1>
        <h1>{user?.email}</h1>
      </div>

      <div className="flex gap-4">
        {user ? (
          <button onClick={logout} className="btn">
            로그아웃
          </button>
        ) : (
          <>
            <button onClick={loginWithGoogle} className="btn btn-primary">
              Google로 로그인
            </button>
            <Link href="/member/login">
              <button className="p-2 bg-green-500 rounded">로그인</button>
            </Link>
            <Link href="/member/signup">
              <button className="p-2 bg-yellow-500 rounded">회원가입</button>
            </Link>
            <Link href="/about">About</Link>
            <Link href="/post">Post</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
