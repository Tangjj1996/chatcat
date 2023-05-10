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
        "rounded bg-gray-300 p-4 text-slate-600",
        rtl && ["text-right", "bg-blue-100"]
      )}
    >
      {children}
    </div>
  );
};

export default Card;
