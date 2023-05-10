import clx from "classnames";

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
        "whitespace-pre-wrap rounded p-4 text-slate-600",
        rtl ? "bg-blue-100 text-right" : "bg-gray-300"
      )}
    >
      {children}
    </div>
  );
};

export default Card;
