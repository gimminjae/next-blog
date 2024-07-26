import { FaRegFileLines } from "react-icons/fa6"
interface Props {
  title: string
  content: string
  createdAt: string
  btnStr?: string
  author: string
  onClick: () => void
}

const Card = ({
  title,
  content,
  createdAt = "____-__-__",
  btnStr,
  author = "unknown",
  onClick = () => console.log("click"),
}: Props) => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl xl:w-2/3" onClick={onClick}>
        <div className="card-body flex flex-cols items-between">
          <h2 className="card-title">
            <FaRegFileLines />
            {title}
          </h2>
          <p>{content}</p>
          <div className="text-sm text-gray-500 flex justify-between">
            <span>{createdAt?.substring(0, 16)}</span>
            <span>
              <strong>By</strong> {author}
            </span>
          </div>
          {btnStr && (
            <div className="card-actions justify-end">
              <button className="btn btn-primary">{btnStr}</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default Card
