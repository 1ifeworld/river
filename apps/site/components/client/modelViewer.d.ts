declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src: string
      alt?: string
      'auto-rotate'?: boolean
      'camera-controls'?: boolean
      style?: React.CSSProperties
      ar?: boolean
      'ar-modes'?: string
      'environment-image'?: string
      'shadow-intensity'?: number
    }
  }
}
