import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  loading,
  ...props
}) => {
  return (
    <button
      type="button"
      {...props}
      className={`flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed ${className}`}
    >
      {loading}
      {children}
    </button>
  );
};

export default Button;
