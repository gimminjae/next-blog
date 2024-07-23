import { useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/firebase/auth"

const SignUp = () => {
  const { register } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await register(email, password)
      router.push("/")
    } catch (err) {
      setError(
        "회원가입 실패: 이메일 형식이 올바르지 않거나 비밀번호가 너무 짧습니다."
      )
    }
  }

  return (
    <div>
      <h2>회원가입</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <label>
          이메일:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}

export default SignUp
