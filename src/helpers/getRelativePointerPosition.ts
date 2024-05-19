import Konva from "konva";

export const getRelativePointerPosition = (node: Konva.Stage | null) => {
  if (!node) return null;

  const transform = node.getAbsoluteTransform().copy();
  transform.invert();
  const pos = node.getStage().getPointerPosition();

  if (!pos) return null;

  return transform.point(pos);
};
