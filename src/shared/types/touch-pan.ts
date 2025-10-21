export type TouchPanValue = {
  evt?: Event;
  touch?: boolean;
  mouse?: boolean;
  isFirst?: boolean;
  isFinal?: boolean;
  duration?: number;
  direction?: 'up' | 'right' | 'down' | 'left';
  distance?: { x?: number; y?: number };
  offset?: { x?: number; y?: number };
  position?: { top?: number; left?: number };
  delta?: { x?: number; y?: number };
};
