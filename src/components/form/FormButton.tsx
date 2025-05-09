import { Button } from "flowbite-react"
import { ButtonHTMLAttributes, memo } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
    color?: "red" | "blue" | "gray" | "dark" | "light" | "success" | "failure" | "warning" | "purple" | "info"
    fullSized?: boolean
    gradientDuoTone?: "purpleToBlue" | "cyanToBlue" | "greenToBlue" | "purpleToPink" | "pinkToOrange" | "tealToLime" | "redToYellow"
    gradientMonochrome?: "info" | "success" | "cyan" | "teal" | "lime" | "failure" | "pink" | "purple"
    outline?: boolean
    pill?: boolean
    size?: "xs" | "sm" | "lg" | "xl"
  }
  

const FormButton = ({ children, isLoading, color = "blue", ...props }: Props) => {
  return (
    <Button
      color={color}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </Button>
  )
}

export default memo(FormButton)