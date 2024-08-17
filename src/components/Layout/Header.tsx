import Link from "next/link"
import { useAuth } from "@/firebase/auth"
import React from "react"
import Image from "next/image"
import {
  FaGoogle,
  FaPenToSquare,
  FaArrowRightFromBracket,
  FaHouse,
} from "react-icons/fa6"
import { useAlert } from "@/store/AlertState"

const Header = () => {
  const { user, loginWithGoogle, logout } = useAuth()
  const { alert } = useAlert()

  return (
    <header className="sticky top-0 z-30">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link href="/post" className="btn btn-ghost text-xl">
            Dev Diary
          </Link>
          <button
            onClick={() => {
              alert({
                time: 5,
                content: "alert test",
                description: "test description",
                type: "info",
              })
            }}
          >
            button
          </button>
        </div>
        <div className="navbar-end">
          {!user && (
            <div>
              <ul className="menu menu-horizontal px-1">
                <li>
                  <button onClick={loginWithGoogle}>
                    <FaGoogle />
                  </button>
                </li>
              </ul>
            </div>
          )}
          {user && (
            <>
              <div className="flex flex-nowrap content-center">
                <ul className="menu menu-horizontal rounded-box">
                  <li>
                    <Link className="tooltip" data-tip="My Page" href="/member">
                      <FaHouse />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="tooltip"
                      data-tip="Write"
                      href="/post/write"
                    >
                      <FaPenToSquare />
                    </Link>
                  </li>
                  <li>
                    <p className="tooltip" data-tip="Logout" onClick={logout}>
                      <FaArrowRightFromBracket />
                    </p>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header)
