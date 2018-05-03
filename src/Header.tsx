import * as React from 'react';
import * as Swiper from 'react-id-swiper';

export default class Header extends React.Component {
  private swiper: any;

  constructor(props: {}) {
    super(props);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
  }

  public render(): JSX.Element {
    const params = {
      freeMode: true,
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 10,
    };

    const languages: string[] = [
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
      'Elm',
    ];

    const rows: JSX.Element[] = languages.map((l, index) => (
      <a href="#" key={index}>
        {l}
      </a>
    ));

    return (
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
                if (node) {
                  this.swiper = node.swiper;
                }
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
    );
  }

  private goNext(): void {
    this.swiper.slideNext();
  }

  private goPrev(): void {
    this.swiper.slidePrev();
  }
}
