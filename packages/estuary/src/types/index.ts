import * as React from 'react'

/*
 * Disallow strings from React.ReactNode
 */
export type ReactNodeNoStrings =
  | React.ReactElement
  | boolean
  | null
  | undefined