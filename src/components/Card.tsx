interface Props {
  imageSrc: string;
  alt: string;
  title: string;
  content: string;
  createdAt: string;
  btnStr: string;
  onClick: () => void;
}

const Card = ({
  imageSrc,
  alt,
  title,
  content,
  createdAt = "____-__-__",
  btnStr = "button",
  onClick = () => console.log("click"),
}: Props) => {
  return (
    <>
      <div className="card bg-base-100 w-sm shadow-xl" onClick={onClick}>
        <figure>
          <img
            src={
              imageSrc
                ? imageSrc
                : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={alt ? alt : "image"}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{content}</p>
          <div className="card-actions justify-end items-end">
            <div className="badge badge-outline">{createdAt}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
