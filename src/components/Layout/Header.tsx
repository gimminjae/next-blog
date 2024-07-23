import Link from "next/link"
import { useAuth } from "@/firebase/auth"
import React from "react"
import Image from "next/image"

const Header = () => {
  const { user, loginWithGoogle, logout } = useAuth()

  return (
    <header>
      <div className="navbar bg-base-100 sticky top-0 z-30">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">
            Dev Diary
          </Link>
        </div>
        <div className="navbar-center lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/post">Posts</Link>
            </li>
            {user && (
              <li>
                <Link href={`/member/post`}>My Post</Link>
              </li>
            )}
            {user && (
              <li>
                <Link href="/post/write">Write</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {!user && (
            <div className="lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link href="/member/login">Login</Link>
                </li>
                <li>
                  <Link href="/member/signup">Sign up</Link>
                </li>
              </ul>
            </div>
          )}
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {/* <Image
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  /> */}
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href="/member/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link href="/member/setting">Settings</Link>
                </li>
                <li>
                  <p onClick={logout}>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* <div className="flex">
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
      </div> */}
    </header>
  )
}

export default Header
