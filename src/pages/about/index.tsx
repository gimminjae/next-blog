import Link from "next/link"
import React from "react"

const Home = () => {
  return (
    <div>
      <h1>About</h1>
      <Link href="/post">Go to Post</Link>
    </div>
  )
}
export default Home
