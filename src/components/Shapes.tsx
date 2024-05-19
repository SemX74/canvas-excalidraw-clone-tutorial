import { FC } from "react";
import { Shape, ShapeType, Tool } from "../types";
import { Ellipse, Line, Rect, Text } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

interface ShapesProps {
  shapes: Shape[];
  tool: Tool;
  onDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
}

const Shapes: FC<ShapesProps> = ({ shapes, onDragEnd, tool }) => {
  const common = {
    onDragEnd,
    draggable: tool === Tool.POINTER,
    onMouseOver: (e: KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      if (stage) {
        stage.container().style.cursor = "move";
      }
    },
    onMouseLeave: (e: KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      if (stage) {
        stage.container().style.cursor =
          tool === Tool.GRAB ? "grab" : "default";
      }
    },
  };

  return (
    <>
      {shapes.map((shape) => {
        const activeProps = shape.selected
          ? { shadowColor: "blue", shadowBlur: 40, shadowOpacity: 1 }
          : {};
        switch (shape.type) {
          case ShapeType.TEXT:
            return (
              <Text
                key={shape.id}
                {...shape}
                strokeWidth={1}
                {...common}
                {...activeProps}
              />
            );
          case ShapeType.CIRCLE:
            return (
              <Ellipse
                key={shape.id}
                {...shape}
                {...common}
                {...activeProps}
                width={shape.radiusX * 2}
                height={shape.radiusY * 2}
              />
            );
          case ShapeType.RECTANGLE:
            return (
              <Rect
                key={shape.id}
                {...shape}
                {...common}
                {...activeProps}
              />
            );
          case ShapeType.LINE:
            return (
              <Line
                key={shape.id}
                {...shape}
                {...common}
                {...activeProps}
                x={0}
                y={0}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default Shapes;
