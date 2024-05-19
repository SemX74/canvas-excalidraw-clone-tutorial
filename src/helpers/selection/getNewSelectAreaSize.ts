import { Placement2D } from "../../types";

export const getNewSelectAreaSize = (start: Placement2D, end: Placement2D) => {
  const width = Math.abs(start.x - end.x);
  const height = Math.abs(start.y - end.y);
  const x = (start.x + end.x) / 2;
  const y = (start.y + end.y) / 2;

  return { width, height, x, y };
};
