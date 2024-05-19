import { FC } from "react";
import Button from "./Button";
import { Shape, ShapeType, Text } from "../types";
import { ShapeStyle } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

interface ShapeOptionsProps {
  style: ShapeStyle;
  onApplyStyles: (styles: Partial<ShapeStyle>) => void;
  activeShapes: Shape[];
  deleteShapes: () => void;
}

const strokeColors = ["white", "red", "black", "blue"];
const backgroundColors = [...strokeColors, "transparent"];
const cornerRadius = [0, 5, 10];

const ShapeOptions: FC<ShapeOptionsProps> = ({
  onApplyStyles,
  activeShapes,
  style,
  deleteShapes,
}) => {
  const textShape = activeShapes.find(
    (shape) => shape.type === ShapeType.TEXT
  ) as Text | undefined;

  const options: {
    title: string;
    options: ShapeStyle[keyof ShapeStyle][];
    key: keyof ShapeStyle;
    type: "color" | "text";
  }[] = [
    {
      title: "Background",
      options: backgroundColors,
      key: "fill",
      type: "color",
    },
    {
      title: "Stroke",
      options: strokeColors,
      key: "stroke",
      type: "color",
    },
    {
      title: "Corner radius",
      options: cornerRadius,
      key: "cornerRadius",
      type: "text",
    },
  ];

  return (
    <menu className="flex z-20 flex-col items-center absolute p-4 left-5 top-24 w-fit gap-1 rounded-lg bg-gray-800">
      <div className="flex flex-col gap-5">
        {options.map((option) => (
          <div key={option.title} className="flex flex-col items-start">
            <b>{option.title}</b>
            <div className="flex gap-1">
              {option.options.map((opt) => {
                return (
                  <Button
                    active={style[option.key] === opt}
                    onClick={() => onApplyStyles({ [option.key]: opt })}
                    key={opt}
                    className={option.type === "color" ? "w-fit p-2" : ""}
                  >
                    {option.type === "color" ? (
                      opt === "transparent" ? (
                        <div
                          style={{ backgroundColor: opt as string }}
                          className="h-7 w-7 rounded border border-gray-100"
                        >
                          x
                        </div>
                      ) : (
                        <div
                          style={{ backgroundColor: opt as string }}
                          className="h-7 w-7 border-3 rounded "
                        />
                      )
                    ) : (
                      opt
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {textShape && (
        <>
          <b className="text-start w-full mt-4">Text</b>
          <input
            className="p-2 w-full rounded mt-2"
            value={textShape.text}
            onChange={(e) => onApplyStyles({ text: e.target.value })}
          />
          <b className="text-start w-full mt-4">Font size</b>
          <input
            type="number"
            value={textShape.fontSize}
            onChange={(e) =>
              onApplyStyles({ fontSize: Number(e.target.value) })
            }
            className="p-2 w-full rounded mt-2"
            max={100}
            min={0}
            step={5}
          />
        </>
      )}

      {activeShapes.length > 0 && (
        <Button onClick={deleteShapes} className="bg-red-100 mr-auto mt-6 hover:text-red-100 hover:bg-red-600 text-red-600">
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      )}
    </menu>
  );
};

export default ShapeOptions;
