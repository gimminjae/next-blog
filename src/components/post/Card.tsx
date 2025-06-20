import { Card as FlowbiteCard } from "flowbite-react"
import { memo } from "react"

interface Props {
  id?: string
  className?: string
  href?: string
  onClick?: () => void
  children: React.ReactNode
}

const Card = ({
  id,
  className,
  onClick,
  href,
  children,
  ...props
}: Props) => {

  return (
    <div {...props} id={id} className={className} onClick={onClick}>
      {children}
    </div>
  )
}

export default memo(Card)
