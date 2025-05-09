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
  className = "sm:w-full md:w-full lg:w-[80%] xl:w-[70%]",
  onClick,
  href,
  children,
  ...props
}: Props) => {

  return (
    <FlowbiteCard {...props} id={id} className={className} href={href} onClick={onClick}>
      {children}
    </FlowbiteCard>
  )
}

export default memo(Card)
