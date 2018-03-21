import * as React from 'react';
import * as Swiper from 'react-id-swiper';

// static
import './App.css';
const sampleImg = require('./static/images/sample.jpeg');

/* tslint:disable no-any */

interface IAppProps {}

interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
  private swiper: any;

  constructor(props: IAppProps) {
    super(props);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
  }

  render(): JSX.Element {
    const params = {
      slidesPerView: 'auto',
      spaceBetween: 10,
      freeMode: true,
      loop: true,
    };

    const lans: string[] = [
      'Ruby on Rails',
      'React.js',
      'Angular',
      'Vue.js',
      'Fuel PHP',
      'TypeScript',
      'GraphQL',
      'JEST',
      'PWAs',
      'SSR',
    ];

    const rows: JSX.Element[] = lans.map((l, index) => (
      <a href="#" key={index}>
        {l}
      </a>
    ));

    return (
      <div className="App">
        <header className="header">
          <div className="logo">
            <a href="#">Manato</a>
          </div>
          <nav className="nav">
            <div>
              <i className="fa fa-angle-left icon" onClick={this.goPrev} />
            </div>
            <div className="nav-container">
              <Swiper
                {...params}
                ref={(node: any) => {
                  if (node) this.swiper = node.swiper;
                }}
              >
                {rows}
              </Swiper>
            </div>
            <div>
              <i className="fa fa-angle-right icon" onClick={this.goNext} />
            </div>
          </nav>
        </header>
        <main className="main container">
          <div className="works">
            <ul className="works-list">
              {Array.apply(null, Array(7)).map((x: any, i: number) => (
                <li className="works-list-item" key={i}>
                  <div className="card">
                    <img src={sampleImg} />

                    <div className="card-desc">
                      <h3 className="card-desc-heading">EC Website</h3>
                      <p className="card-desc-sub-heading">
                        I’ve been a CMT for ten years now, and I have, literally
                        and figuratively, held the pulse of a steaming
                        cross-section of San Franciscans
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
        </main>
      </div>
    );
  }

  private goNext(): void {
    this.swiper.slideNext();
  }

  private goPrev(): void {
    this.swiper.slidePrev();
  }
}

export default App;
