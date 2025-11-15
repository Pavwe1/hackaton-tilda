export type Block = {
  id: string;
  type: string;
  template?: string;
  schema?: Record<string, any>;
  text?: string;
  width?: number;
  height?: number;
  bgColor?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  opacity?: number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  textAlign?: "left" | "right" | "center" | "justify";
  textDecoration?: string;
  textTransform?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  border?: string;
  borderRadius?: string;
  display?: string;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
  zIndex?: number;
  [key: string]: any;
};


export type DragStartEvent = import("@dnd-kit/core").DragStartEvent;
export type DragEndEvent = import("@dnd-kit/core").DragEndEvent;

export type Tag = {
  id: string;
  name: string;
};

export type BlockType = {
  id: string;
  name: string;
  tag_id: string;
  template?: string;
  schema?: Record<string, any>;
};

