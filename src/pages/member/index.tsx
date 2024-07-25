import Link from "next/link"
import React from "react"

const MyPage = () => {
  return (
    <div>
      <h1>Profile</h1>
      <Link href="/post">Go to Post</Link>
    </div>
  )
}
export default MyPage
