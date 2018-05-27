import * as React from 'react'
import { Language } from '@/modules/home/reducer'
import * as ReactTooltip from 'react-tooltip'

interface LanguageIconProps {
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

export default class LanguageIcon extends React.PureComponent<
  LanguageIconProps,
  {}
> {
  constructor(props: LanguageIconProps) {
    super(props)
  }

  public render(): JSX.Element {
    const Component = COMPONENTS[this.props.language.icon]
    if (!Component)
      throw new Error(
        `There is no such a component: ${this.props.language.icon}`,
      )

    return (
      <div className="tech-list-item" data-tip={this.props.language.name}>
        <Component />
        <ReactTooltip type="success" effect="solid" />
      </div>
    )
  }
}
