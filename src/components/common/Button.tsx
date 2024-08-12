import React from "react"

interface Props {
  size?: "xs" | "sm" | "md" | "lg" | "responsive" | undefined
  type?: "submit" | "button" | undefined
  color?:
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "ghost"
    | "link"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "glass"
    | undefined
  line?: "outline" | "active" | undefined
  disabled?: boolean | undefined
  wideBlock?: "wide" | "block" | undefined
  onClick?: () => void
  children?: any
}
const Button = ({
  size = undefined,
  type = "button",
  color = undefined,
  line = undefined,
  disabled = false,
  wideBlock = undefined,
  onClick = () => console.log("click"),
  children,
}: Props) => {
  return (
    <>
      <button
        className={`btn ${
          size &&
          (size === "responsive"
            ? "btn-xs sm:btn-sm md:btn-md lg:btn-lg"
            : `btn-${size}`)
        } ${disabled && "btn-disabled"} ${color && `btn-${color}`} ${
          line && `btn-${line}`
        } ${wideBlock && `btn-${wideBlock}`}`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}
export default React.memo(Button)
