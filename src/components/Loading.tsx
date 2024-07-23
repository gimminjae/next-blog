interface Props {
  loading: Boolean
  type: "ball" | "ring" | "infinity" | "spinner" | "bars" | "dots"
  size: "xs" | "sm" | "md" | "lg"
  color:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "error"
    | undefined
}
const Loading = ({
  loading = false,
  type = "spinner",
  size = "md",
  color = undefined,
}: Props) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <span
          className={`loading loading-${type} loading-${size} ${
            color ? `text-${color}` : ""
          }`}
        ></span>
      </div>
    </>
  )
}
export default Loading
