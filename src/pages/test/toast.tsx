import { info, success, warning, error, alert } from "@/util/toast"
const Toast = () => {
  return (
    <>
      <button onClick={() => info("info")}>info</button>
      <button onClick={() => success("success")}>success</button>
      <button onClick={() => warning("warning")}>warning</button>
      <button onClick={() => error("error")}>error</button>
      <button
        onClick={() => {
          alert("default")
        }}
      >
        default
      </button>
    </>
  )
}
export default Toast
