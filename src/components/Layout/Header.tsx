import { useAuth } from "@/firebase/auth"
import { memo } from "react"
import HeaderNavbar from "./Navbar"

const Header = () => {
  const { user, loginWithGoogle, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30">
      <HeaderNavbar />
    </header>
  )
}

export default memo(Header)
