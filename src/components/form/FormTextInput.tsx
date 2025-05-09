import { TextInput } from "flowbite-react"
import React, { memo } from "react"

type Props = {
  id?: string
  type?: string
  value?: string | number
  placeholder?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormTextInput = ({
  id,
  type = "text",
  value,
  placeholder,
  className,
  onChange,
}: Props) => {
  return (
    <TextInput
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
    />
  )
}

export default memo(FormTextInput)
