import SkeletonCard from "./SkeletonCard";

interface Props {
  columnNumber: number;
  length: number;
}
const SkeletonCardList = ({ columnNumber, length }: Props) => {
  return (
    <div
      className={`grid grid-cols-${columnNumber} gap-4 place-content-center`}
    >
      {new Array(length).fill("").map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonCardList;
