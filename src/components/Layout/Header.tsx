import Link from "next/link"
import { useAuth } from "@/firebase/auth"
import React from "react"
import Image from "next/image"

const Header = () => {
  const { user, loginWithGoogle, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link href="/post" className="btn btn-ghost text-xl">
            Dev Diary
          </Link>
        </div>
        <div className="navbar-end">
          {!user && (
            <div className="lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <button onClick={loginWithGoogle}>Login</button>
                </li>
              </ul>
            </div>
          )}
          {user && (
            <>
              <div className="lg:flex">
                <ul className="menu menu-horizontal px-1">
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
                        <Link
                          href="/member/profile"
                          className="justify-between"
                        >
                          Profile
                          <span className="badge">New</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/member/setting">Settings</Link>
                      </li>
                      <li>
                        <Link href={`/member/post`}>My Post</Link>
                      </li>
                      <li>
                        <Link href="/post/write">Write</Link>
                      </li>
                      <li>
                        <p onClick={logout}>Logout</p>
                      </li>
                    </ul>
                  </div>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
