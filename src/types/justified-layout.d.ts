declare module 'justified-layout' {
  interface Box {
    aspectRatio: number;
    top: number;
    width: number;
    height: number;
    left: number;
  }

  interface Layout {
    boxes: Box[];
    containerHeight: number;
  }

  interface Options {
    containerWidth: number;
    targetRowHeight: number;
    boxSpacing: number;
  }

  function justifiedLayout(aspectRatios: number[], options: Options): Layout;
  export default justifiedLayout;
} 