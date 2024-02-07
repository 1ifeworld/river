declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': {
        src?: string;
        alt?: string;
        ar?: boolean;
        autoRotate?: boolean;
        autoplay?: boolean;
        loading?: string;
        cameraControls?: boolean;
      } & React.HTMLAttributes<HTMLElement>;
    }
  }
}
export {}