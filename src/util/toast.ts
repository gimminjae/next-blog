import { ToastSettingState } from "@/store/ToastSetting"
import { toast, ToastContent } from "react-toastify"

const alert = {
  toast: (message: string, option: ToastSettingState) =>
    toast<ToastContent<ToastSettingState>>(message, option),
  info: (message: string, option: ToastSettingState) =>
    toast.info(message, option),
}
export default toast
