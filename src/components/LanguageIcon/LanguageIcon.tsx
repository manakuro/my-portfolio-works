import * as React from 'react'
import { Language } from '@/modules/home/reducer'
import * as ReactTooltip from 'react-tooltip'
import { onlyUpdateForKeys } from 'recompose'
import compose from 'recompose/compose'

export interface LanguageIconProps {
  language: Language
}

export const COMPONENTS = {
  vuejs: () => (
    <span className="icon-vuejs">
      <span className="path1" />
      <span className="path2" />
    </span>
  ),
  rails: () => (
    <span className="icon-vuejs">
      <span className="path1" />
      <span className="path2" />
    </span>
  ),
  react: () => (
    <span className="icon-vuejs">
      <span className="path1" />
      <span className="path2" />
    </span>
  ),
}

export const enhance = compose<LanguageIconProps, LanguageIconProps>(
  onlyUpdateForKeys(['language']),
)

export const LanguageIcon = (props: LanguageIconProps): JSX.Element => {
  const Component = COMPONENTS[props.language.icon]
  if (!Component)
    throw new Error(`There is no such a component: ${props.language.icon}`)

  return (
    <div className="language-icon" data-tip={props.language.name}>
      <Component />
      <ReactTooltip type="success" effect="solid" />
    </div>
  )
}

export default enhance(LanguageIcon)
