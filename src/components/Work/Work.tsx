import * as React from 'react'

import { Work as IWork, Language } from '@/modules/home/reducer'

interface WorkProps {
  work: IWork
  showOverlay: (e: React.SyntheticEvent<EventTarget>) => any
  updateTargetWork: (payload: IWork) => any
  languages: Language[]
}

import './Work.css'
import LanguageIcon from '@/components/LanguageIcon'

export default class Work extends React.PureComponent<WorkProps> {
  constructor(props: WorkProps) {
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
    this.props.updateTargetWork(this.props.work)
    this.props.showOverlay(e)
  }
}
