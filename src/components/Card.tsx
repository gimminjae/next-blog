interface Props {
  title: string
  content: string
  createdAt: string
  btnStr?: string
  onClick: () => void
}

const Card = ({
  title,
  content,
  createdAt = "____-__-__",
  btnStr,
  onClick = () => console.log("click"),
}: Props) => {
  return (
    <>
      <div
        className="card bg-base-100 w-full max-w-96 shadow-xl"
        onClick={onClick}
      >
        <div className="card-body flex flex-cols items-between">
          <h2 className="card-title">{title}</h2>
          <div className="text-sm text-gray-500">
            {createdAt?.substring(0, 16)}
          </div>
          {btnStr && (
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default Card
