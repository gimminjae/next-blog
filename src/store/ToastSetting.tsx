import { create } from "zustand"

export interface ToastSettingState {
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

export const useToastSetting = create((set) => ({
  setting: {},
  setSetting: () => set((state: ToastSettingState) => ({})),
  initializeSetting: () => set({}),
}))
