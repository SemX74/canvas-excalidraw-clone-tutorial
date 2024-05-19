import { useEffect, useState } from "react";
import { Tool } from "../types";

export const useTool = () => {
  const [tool, setTool] = useState<Tool>(Tool.POINTER);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "1":
          setTool(Tool.POINTER);
          break;
        case "2":
          setTool(Tool.GRAB);
          break;
        case "3":
          setTool(Tool.RECTANGLE);
          break;
        case "4":
          setTool(Tool.CIRCLE);
          break;
        case "5":
          setTool(Tool.TEXT);
          break;
        case "6":
          setTool(Tool.PENCIL);
          break;
        case "7":
          setTool(Tool.LINE);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setTool(Tool.GRAB);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setTool(Tool.POINTER);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { tool, setTool: setTool as (tool: Tool) => void };
};
