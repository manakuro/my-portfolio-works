import * as React from 'react';

import { IHomeState, IWork } from '@/reducers/home';

interface IWorksProps extends IHomeState {
  showOverlay: (e: React.SyntheticEvent<EventTarget>) => void;
}

export default class Works extends React.Component<IWorksProps, {}> {
  constructor(props: IWorksProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="works">
        <ul className="works-list">
          {this.props.works.map((work: IWork, i: number) => (
            <li className="works-list-item" key={i} onClick={this.onClick}>
              <div className="card">
                <img src={work.img} />

                <div className="card-desc">
                  <h3 className="card-desc-heading">{work.title}</h3>
                  <p className="card-desc-sub-heading">{work.description}</p>

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
            </li>
          ))}
        </ul>
      </div>
    );
  }

  private onClick(e: any) {
    this.props.showOverlay(e);
  }
}
