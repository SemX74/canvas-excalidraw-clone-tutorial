import { Shape } from "../../types";

export type SelectionBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const isShapeInSelection = (
  shape: Shape,
  selectionBox: SelectionBox
) => {
  return (
    shape.x >= selectionBox.x &&
    shape.x <= selectionBox.x + selectionBox.width &&
    shape.y >= selectionBox.y &&
    shape.y <= selectionBox.y + selectionBox.height
  );
};
