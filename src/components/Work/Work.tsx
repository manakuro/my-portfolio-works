import * as React from 'react'

import { IWork } from '@/modules/home/reducer'

interface IWorkProps {
  work: IWork
  showOverlay: (e: React.SyntheticEvent<EventTarget>) => any
  updateTargetWork: (payload: IWork) => any
}

import './Work.css'

export default class Work extends React.PureComponent<IWorkProps> {
  constructor(props: IWorkProps) {
    super(props)
  }

  public render(): JSX.Element {
    return (
      <div className="works-list-item" onClick={this.handleClick}>
        <div className="card">
          <img src={this.props.work.img} />

          <div className="card-desc">
            <h3 className="card-desc-heading">{this.props.work.title}</h3>
            <p className="card-desc-sub-heading">
              {this.props.work.description}
            </p>

            <ul className="tech-list">
              <li className="tech-list-item">
                <span className="icon-vuejs">
                  <span className="path1" />
                  <span className="path2" />
                </span>
              </li>
              <li className="tech-list-item">
                <span className="icon-vuejs">
                  <span className="path1" />
                  <span className="path2" />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  private handleClick = (e: React.SyntheticEvent<EventTarget>): void => {
    this.props.updateTargetWork(this.props.work)
    this.props.showOverlay(e)
  }
}
