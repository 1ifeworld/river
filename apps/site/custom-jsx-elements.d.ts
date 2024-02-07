declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': {
        ref?: RefObject<HTMLElement>;
        src?: string;
        ios?: boolean;
        alt?: string;
        ar?: boolean;
        progress?: boolean;
        autoRotate?: boolean;
        preload?: boolean;
        autoplay?: boolean;
        loading?: string;
        cameraControls?: boolean;
      } & React.HTMLAttributes<HTMLElement>;
    }
  }
}
export {}