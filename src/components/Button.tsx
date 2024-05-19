import { FC, PropsWithChildren } from "react";
import cn from "../helpers/cn";

interface ButtonProps extends PropsWithChildren {
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({ active, onClick, children, className }) => {
  return (
    <button
      className={cn(
        "bg-transparent relative hover:bg-gray-700 text-gray-300",
        {
          "bg-blue-400 hover:bg-blue-500 text-gray-800": active,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
