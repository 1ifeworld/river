declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': {
        src?: string;
        alt?: string;
        ar?: boolean;
        autoRotate?: boolean;
        loading?: string;
        cameraControls?: boolean;
        // Add any other props you intend to use with <model-viewer>
      } & React.HTMLAttributes<HTMLElement>;
    }
  }
}
export {}