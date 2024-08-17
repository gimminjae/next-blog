import { AlertObject } from "../../store/AlertState"

interface Props {
  message: string
  description: string
  type: "info" | "error" | "warning" | "success"
}
const AlertComponent = ({
  message = "",
  description = "",
  type = "info",
}: AlertObject) => {
  return (
    <>
      <div className="absolute bottom-0 left-0">
        alert {message} {description} {type}
      </div>
    </>
  )
}

export default AlertComponent
