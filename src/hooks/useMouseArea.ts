import { KonvaEventObject } from "konva/lib/Node";
import { useRef, useState } from "react";
import { Shape, ShapeType, Tool } from "../types";
import { getRelativePointerPosition } from "../helpers/getRelativePointerPosition";
import Konva from "konva";
import { SelectionBox } from "../helpers/selection/isShapeInSelection";
import { getNewSelectAreaSize } from "../helpers/selection/getNewSelectAreaSize";
import { ShapeStyle } from "../App";
import { v4 as uuidv4 } from "uuid";
import { shapeSizing } from "../helpers/selection/shapeSizing";

const initialMouseArea = {
  visible: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  startX: 0,
  startY: 0,
};

interface UseMouseAreaProps {
  tool: Tool;
  style: ShapeStyle;
  onAppendShape: (shape: Shape) => void;
  selectShape: (shapeId: string) => void;
  unselectShapes: () => void;
  selectShapesInArea: (selectionBox: SelectionBox) => void;
}

export const useMouseArea = ({
  tool,
  onAppendShape,
  selectShape,
  selectShapesInArea,
  unselectShapes,
  style,
}: UseMouseAreaProps) => {
  const previewLayerRef = useRef<Konva.Layer>(null);
  const activeShape = useRef<Shape | null>(null);
  const mouseDown = useRef<boolean>(false);
  const shapeDragging = useRef<boolean>(false);
  const [selectedArea, setSelectedArea] = useState(initialMouseArea);

  const onMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    mouseDown.current = true;
    if (tool === Tool.GRAB) return;
    const stage = e.target.getStage();
    const pos = getRelativePointerPosition(stage);
    if (!pos) return;

    if (e.target !== stage) {
      const shapeId = e.target.attrs.id;
      selectShape(shapeId);
      shapeDragging.current = true;
      return;
    } else {
      unselectShapes();
    }

    if (tool === Tool.TEXT) {
      const shape: Shape = {
        type: ShapeType.TEXT,
        ...pos,
        id: uuidv4(),
        text: "Dev Routine",
        ...style,
      };
      onAppendShape(shape);
      return;
    }

    const selectedArea = {
      visible: tool === Tool.POINTER,
      startX: pos.x,
      startY: pos.y,
      width: 0,
      height: 0,
      ...pos,
    };

    const size = { width: 0, height: 0 };

    setSelectedArea(selectedArea);

    let shape: Shape | null = null;

    const shapeId = uuidv4();

    if (tool === Tool.PENCIL) {
      shape = {
        type: ShapeType.LINE,
        id: shapeId,
        points: [pos.x, pos.y],
        ...pos,
        ...style,
      };
    }

    if (tool === Tool.RECTANGLE) {
      shape = {
        type: ShapeType.RECTANGLE,
        id: shapeId,
        ...pos,
        ...size,
        ...style,
      };
    }

    if (tool === Tool.CIRCLE) {
      shape = {
        id: shapeId,
        type: ShapeType.CIRCLE,
        radiusX: 0,
        radiusY: 0,
        ...size,
        ...style,
        ...pos,
      };
    }

    if (!shape) return;
    activeShape.current = shape;

    switch (tool) {
      case Tool.PENCIL:
        previewLayerRef.current?.add(
          new Konva.Line({ ...shape, ...size, x: 0, y: 0 })
        );
        break;
      case Tool.RECTANGLE:
        previewLayerRef.current?.add(new Konva.Rect(shape));
        break;
      case Tool.CIRCLE:
        previewLayerRef.current?.add(
          new Konva.Ellipse({
            ...shape,
            radiusX: 0,
            radiusY: 0,
            id: shape.id,
          })
        );
        break;

      default:
        break;
    }
  };

  const onMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!mouseDown.current || shapeDragging.current) return;
    const stage = e.target.getStage();
    const pos = getRelativePointerPosition(stage);
    if (!pos) return;

    const { height, width, x, y } = getNewSelectAreaSize(pos, {
      x: selectedArea.startX,
      y: selectedArea.startY,
    });

    const rectSelection = shapeSizing.getRectSize({ height, width }, { x, y });

    if (tool === Tool.POINTER) {
      setSelectedArea({ ...selectedArea, ...rectSelection });
      selectShapesInArea(rectSelection);
      return;
    }

    const shape = activeShape?.current;
    const shapeToEdit = previewLayerRef.current?.findOne(`#${shape?.id}`);

    if (!shapeToEdit || !shape) return;

    if (tool === Tool.PENCIL && shape.type === ShapeType.LINE) {
      const points = shape.points.concat([pos.x, pos.y]);
      shape.points = points;
      shapeToEdit.setAttrs({ points });
    }

    if (tool === Tool.RECTANGLE) {
      shapeToEdit.setAttrs(rectSelection);
      activeShape.current = { ...shape, ...rectSelection };
    }

    if (tool === Tool.CIRCLE) {
      const newSize = shapeSizing.getEllipseSize({ height, width }, { x, y });
      shapeToEdit.setAttrs(newSize);
      activeShape.current = { ...shape, ...newSize };
    }

    previewLayerRef.current?.batchDraw();
  };

  const onMouseUp = () => {
    mouseDown.current = false;
    shapeDragging.current = false;
    if (tool !== Tool.POINTER && tool !== Tool.GRAB) {
      const shape = activeShape.current;
      if (!shape) return;
      const shapeToRemove = previewLayerRef.current?.findOne(`#${shape.id}`);
      shapeToRemove?.destroy();
      previewLayerRef.current?.batchDraw();

      onAppendShape(shape);
      activeShape.current = null;
    }

    setSelectedArea(initialMouseArea);
  };

  return { selectedArea, onMouseDown, onMouseMove, onMouseUp, previewLayerRef };
};
