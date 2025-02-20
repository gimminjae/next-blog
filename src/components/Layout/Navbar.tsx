import { useAuth } from "@/firebase/auth"
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { memo, useCallback } from "react"
import { FaArrowRightFromBracket, FaGoogle } from "react-icons/fa6"
import { IoMdSettings } from "react-icons/io"
import { MdSpaceDashboard } from "react-icons/md"
import { RxAvatar } from "react-icons/rx"

function HeaderNavbar() {
  const { user, logout, loginWithGoogle } = useAuth()
  const { push } = useRouter()

  const move = useCallback((path: string) => () => push(path), [])
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <Link href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Dev Diary
          </span>
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {(user && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <h1 className="text-4xl">
                <RxAvatar />
              </h1>
            }
          >
            <Dropdown.Header>
              {/* <span className="block text-sm">Bonnie Green</span> */}
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={move(`/member/${user?.email}`)}>
              <MdSpaceDashboard className="mr-2 h-3 w-3" />
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item onClick={move("/setting")}>
              <IoMdSettings className="mr-2 h-3 w-3" />
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>
              <FaArrowRightFromBracket className="mr-2 h-3 w-3" />
              Log out
            </Dropdown.Item>
          </Dropdown>
        )) || (
          <Button onClick={loginWithGoogle}>
            <FaGoogle className="mr-2 h-5 w-5" />
            Login
          </Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default memo(HeaderNavbar)
{
  /* <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">
            Dev Diary
          </Link>
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
                    <Link
                      className="tooltip"
                      data-tip="My Page"
                      href={`/member/${user?.email}`}
                    >
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
      </div> */
}
