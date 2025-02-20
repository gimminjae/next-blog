import { useRouter } from "next/router"
import { memo, useCallback } from "react"

interface Props {
  value?: string | null
}
const CreatedBy = ({ value }: Props) => {
  const { push } = useRouter()

  const moveToMember = useCallback(() => {
    if (value) push(`/member/${value}`)
  }, [value])

  return (
    <span
      className="text-gray-500 whitespace-nowrap hover:underline cursor-pointer"
      onClick={moveToMember}
    >
      <strong>By</strong> {value || "unknown"}
    </span>
  )
}
export default memo(CreatedBy)
