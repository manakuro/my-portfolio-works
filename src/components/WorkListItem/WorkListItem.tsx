import * as React from 'react'

import { Work, Language } from '@/modules/home/reducer'

export interface WorkListItemProps {
  work: Work
  updateTargetWork: (payload: Work) => any
  updateCircle: HomeDispatchFromProps['updateCircle']
  languages: Language[]
  history?: History
}

import './WorkListItem.css'
import LanguageIcon from '@/components/LanguageIcon'
import { History } from 'history'
import { HomeDispatchFromProps } from '@/components/Home/Home'

export default class WorkListItem extends React.PureComponent<
  WorkListItemProps
> {
  constructor(props: WorkListItemProps) {
    super(props)
  }

  public render(): JSX.Element {
    const languageIcons = this.props.work.languages.map(l => {
      const language = this.getLanguage(l)
      return language ? <LanguageIcon language={language} key={l} /> : null
    })

    return (
      <div className="works-list-item">
        <div className="card">
          <img
            src={this.props.work.img}
            onClick={this.handleClick}
            className="card-img"
          />

          <div className="card-desc">
            <h3 className="card-desc-heading">{this.props.work.title}</h3>
            <p className="card-desc-sub-heading">
              {this.props.work.description}
            </p>

            <div className="tech-list">{languageIcons}</div>
          </div>
        </div>
      </div>
    )
  }

  private getLanguage(id: number): Language | undefined {
    return this.props.languages.find(l => l.id === id)
  }

  private handleClick = (e: React.SyntheticEvent<EventTarget>): void => {
    const nativeEvent: any = e.nativeEvent
    const { pageX, pageY } = nativeEvent

    const marginTop = 130
    const circleStyle = {
      top: `${pageY - (marginTop + 50)}px`,
      left: `${pageX - 50}px`,
    }

    this.props.updateCircle(circleStyle)

    if (this.props.history)
      this.props.history.push({
        pathname: `/works/${this.props.work.id}`,
      })
  }
}
