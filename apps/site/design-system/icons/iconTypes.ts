export interface SvgProps
  extends Pick<
    React.SVGProps<SVGSVGElement>,
    'fill' | 'stroke' | 'width' | 'className'
  > {}
