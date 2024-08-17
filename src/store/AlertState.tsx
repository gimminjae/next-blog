import { create } from "zustand"
import React, { useCallback, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AlertInfo } from "./AlertState"

const messages: any = {
  post: {
    save: {
      ko: "저장되었습니다.",
      en: "save post.",
    },
    delete: {
      en: "post is deleted.",
      ko: "삭제되었습니다.",
    },
  },
  member: {
    join: {
      ko: "환영합니다!",
      en: "Welcome to join!",
    },
    login: {
      en: "Welcome to login!",
      ko: "환영합니다!",
    },
  },
}
interface PostMessage {
  domain: "post"
  method: "save" | "delete"
  lang: "en" | "ko"
}
interface MemberMessage {
  domain: "member"
  method: "join" | "login"
  lang: "en" | "ko"
}
export interface AlertInfo {
  time?: number | undefined
  content: MemberMessage | PostMessage | string
  description?: string | undefined
  type: "info" | "error" | "warning" | "success"
}
export interface AlertObject {
  message: string
  description: string
  type: "info" | "error" | "warning" | "success"
}
const useAlert = () => {
  const [alerts, setAlerts] = useState<AlertObject[]>([])
  const alert = useCallback(
    ({ time, content, description = "", type }: AlertInfo) => {
      const message: string =
        typeof content === "string"
          ? content
          : messages[content?.domain][content?.method][content?.lang]
      const obj: AlertObject = { message, description, type }
      setAlerts((prev) => [...prev, obj])
    },
    []
  )
  return {
    alerts,
    alert,
  }
}

export { useAlert }
