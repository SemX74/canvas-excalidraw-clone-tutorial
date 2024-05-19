import { FC } from "react";
import {
  faArrowPointer,
  faHand,
  faFont,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle, faSquare } from "@fortawesome/free-regular-svg-icons";
import { Tool } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

interface ToolBarProps {
  activeTool: string;
  onChange: (tool: Tool) => void;
}

const ToolBar: FC<ToolBarProps> = ({ activeTool, onChange }) => {
  const options = [
    {
      id: Tool.POINTER,
      icon: faArrowPointer,
    },
    {
      id: Tool.GRAB,
      icon: faHand,
    },
    {
      id: Tool.RECTANGLE,
      icon: faSquare,
    },
    {
      id: Tool.CIRCLE,
      icon: faCircle,
    },
    {
      id: Tool.TEXT,
      icon: faFont,
    },
    {
      id: Tool.PENCIL,
      icon: faPencil,
    },
  ];

  return (
    <menu className="flex z-20 items-center absolute p-2 top-5 left-1/2 -translate-x-1/2 w-fit gap-1 rounded-lg bg-gray-800">
      {options.map((option, i) => {
        return (
          <Button
            onClick={() => onChange(option.id)}
            active={option.id === activeTool}
            key={option.id}
          >
            <FontAwesomeIcon icon={option.icon} />
            <span className="absolute text-xs right-1 bottom-0">{i + 1}</span>
          </Button>
        );
      })}
    </menu>
  );
};

export default ToolBar;
