import { memo } from "react"

interface Props {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    href?: string
}

const Card = ({
    children,
    className,
    onClick,
    href = "#",
  }: Props) => {
    return (
      <Card className={className} href={href} onClick={onClick}>
        {children}
      </Card>
    )
  }

  export default memo(Card)