interface InputProps {
  text?: string
  placeholder?: string
  size?: "xs" | "sm" | "md" | "lg"
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "error"
    | ""
  disabled?: boolean
  type?: "email" | "password" | "text"
  border?: boolean
}
export const Input = ({
  text = "",
  placeholder = "",
  size = "md",
  color = "",
  disabled = false,
  type = "text",
  border = true,
}: InputProps) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`input ${color && `input-${color}`} ${
          border && "input-bordered"
        } ${size} w-full max-w-xs`}
        value={text}
        disabled={disabled}
      />
    </>
  )
}
interface LabelInputProps extends InputProps {
  labelType?: "text" | "icon"
  labelPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "inner"
  labelText?: "Email" | "Password" | "Username" | string
}

export const LabelInput = ({
  labelType = "text",
  labelPosition = "inner",
  labelText = "",
  text = "",
  placeholder = "",
  size = "md",
  color = "",
  disabled = false,
  type = "text",
  border = true,
}: LabelInputProps) => {}
