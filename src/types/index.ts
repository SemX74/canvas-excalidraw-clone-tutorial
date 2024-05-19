export enum Tool {
  POINTER = "POINTER",
  GRAB = "GRAB",
  RECTANGLE = "RECTANGLE",
  CIRCLE = "CIRCLE",
  TEXT = "TEXT",
  PENCIL = "PENCIL",
  LINE = "LINE",
}

export enum ShapeType {
  RECTANGLE = "RECTANGLE",
  CIRCLE = "CIRCLE",
  TEXT = "TEXT",
  LINE = "LINE",
}

export interface Placement2D {
  x: number;
  y: number;
}
export interface Size {
  width: number;
  height: number;
}

export interface CommonStyle {
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface CommonShape extends Placement2D {
  id: string;
  selected?: boolean;
  type: ShapeType;
}

export interface Rectangle extends CommonShape, Size, CommonStyle {
  type: ShapeType.RECTANGLE;
}

export interface Circle extends CommonShape, Size, CommonStyle {
  type: ShapeType.CIRCLE;
  radiusX: number;
  radiusY: number;
}

export interface Text extends CommonShape {
  type: ShapeType.TEXT;
  text: string;
  fontSize: number;
}

export interface Line extends CommonShape, CommonStyle {
  type: ShapeType.LINE;
  points: number[];
}

export type Shape = Rectangle | Circle | Text | Line;
