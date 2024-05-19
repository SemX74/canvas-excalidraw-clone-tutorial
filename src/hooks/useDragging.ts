import { KonvaEventObject } from "konva/lib/Node";
import { useState, useCallback } from "react";

export const getLimitedScale = (currScale: number, min: number, max: number) =>
  Math.max(min, Math.min(max, currScale));

export const useDragging = () => {
  const [scaleBorders] = useState({ min: 0.1, max: 1 }); // Максимум та мінімум зуму
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState<number>(1);

  const onWheel = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      e.evt.preventDefault();
      const scaleBy = 1.05; // Це множник швидкості зуму
      const stage = e.target.getStage();
      if (!stage) return;
      const oldScale = stage.scaleX();

      const pointerPosition = stage?.getPointerPosition();
      if (!pointerPosition) return;

      const mousePointTo = {
        x: (pointerPosition.x - stage.x()) / oldScale,
        y: (pointerPosition.y - stage.y()) / oldScale,
      };

      // Якщо змінити < на >, то зум буде інвертований
      const newScale =
        e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

      const finalScale = getLimitedScale(
        newScale,
        scaleBorders.min,
        scaleBorders.max
      );

      setStageScale(finalScale);
      setStagePos({
        x: pointerPosition.x - mousePointTo.x * finalScale,
        y: pointerPosition.y - mousePointTo.y * finalScale,
      });
    },
    [scaleBorders.max, scaleBorders.min]
  );

  return { stagePos, stageScale, onWheel };
};
