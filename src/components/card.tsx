import clx from "classnames";
import ReactMd from "react-markdown";

interface CardProps {
  rtl?: boolean;
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  rtl,
}) => {
  return (
    <div
      className={clx(
        "whitespace-pre-wrap rounded p-4",
        rtl
          ? "bg-blue-400 text-right text-slate-50"
          : "bg-gray-300 text-slate-600"
      )}
    >
      <ReactMd children={children as string}></ReactMd>
    </div>
  );
};

export default Card;
