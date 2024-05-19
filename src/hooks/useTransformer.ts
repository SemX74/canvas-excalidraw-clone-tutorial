import Konva from "konva";
import { useEffect, useRef } from "react";
import { Shape } from "../types";
import { NodeConfig, Node } from "konva/lib/Node";

export const useTransformer = ({ shapes }: { shapes: Shape[] }) => {
  const layerRef = useRef<Konva.Layer>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    if (!transformerRef.current) return;

    const nodes = shapes.reduce((acc, shape: Shape) => {
      if (shape.selected) {
        const node = stageRef.current?.findOne("#" + shape.id);
        if (node) {
          return [...acc, node];
        }
      }
      return acc;
    }, [] as Node<NodeConfig>[]);

    transformerRef.current.nodes(nodes);
    transformerRef.current.getLayer()?.batchDraw();
  }, [shapes]);

  return { layerRef, stageRef, transformerRef };
};
