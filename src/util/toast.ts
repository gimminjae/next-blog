import { toast, ToastContent } from "react-toastify"

interface Props {
  position:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"
  autoClose: number
  hideProgressBar: boolean
  closeOnClick: boolean
  pauseOnHover: boolean
  draggable: true
  progress: any
  theme: "light" | "dark" | "colored"
  transition: any
}
const alert = {
  toast: (message: string, option: Props) =>
    toast<ToastContent<Props>>(message, option),
  info: (message: string, option: Props) => toast.info(message, option),
}
export default toast
