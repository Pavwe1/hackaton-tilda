export type Block = {
  id: string;
  type: string;
  text?: string;
  width?: number;
  height?: number;
  bgColor?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  opacity?: number;
};

export type DragStartEvent = import("@dnd-kit/core").DragStartEvent;
export type DragEndEvent = import("@dnd-kit/core").DragEndEvent;