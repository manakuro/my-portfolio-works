import * as React from 'react';

import sampleImg from './static/images/sample.jpeg';

interface IWorksProps {
  showOverlay: (e: Element) => void;
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
          {Array.apply(null, Array(12)).map((x: null, i: number) => (
            <li className="works-list-item" key={i} onClick={this.onClick}>
              <div className="card">
                <img src={sampleImg} />

                <div className="card-desc">
                  <h3 className="card-desc-heading">EC Website</h3>
                  <p className="card-desc-sub-heading">
                    I’ve been a CMT for ten years now, and I have, literally and
                    figuratively, held the pulse of a steaming cross-section of
                    San Franciscans
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
