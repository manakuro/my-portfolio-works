import * as React from 'react';
import * as Swiper from 'react-id-swiper';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
const ReactMarkdown = require('react-markdown');

// static
import './App.css';
const sampleImg = require('./static/images/sample.jpeg');

/* tslint:disable no-any */

interface IAppProps {}

interface IAppState {
  offsetWidth: number;
  offsetHeight: number;
  isAnime: boolean;
  isShowOverlay: boolean;
  pageX: number;
  pageY: number;
  circleStyle: object;
  isShowWorksContent: boolean;
  worksContent: string | null;
}

const WORKS_CONTENT = `
## EC Website

This is a copy website of NIKE.com, which is developed by Vue.js, 
Ruby on Rails and GraphQL.

Changes are automatically rendered as you type.

- Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
- Renders actual, "native" React DOM elements
- Allows you to escape or skip HTML (try toggling the checkboxes above)
- If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature | Support |
| ------ | ----------- |
| tables | ✔ |
| alignment | ✔ |
| wewt | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal
`;

class App extends React.Component<IAppProps, IAppState> {
  private swiper: any;

  constructor(props: IAppProps) {
    super(props);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showWorksContent = this.showWorksContent.bind(this);

    this.state = {
      offsetWidth: 0,
      offsetHeight: 0,
      isAnime: false,
      isShowOverlay: false,
      pageX: 0,
      pageY: 0,
      circleStyle: {},
      isShowWorksContent: false,
      worksContent: null,
    };
  }

  async handleClick(e: any) {
    const { pageX, pageY } = e.nativeEvent;
    await this.setState({
      isShowOverlay: !this.state.isShowOverlay,
      pageX,
      pageY,
      circleStyle: {
        top: `${pageY - 50}px`,
        left: `${pageX - 50}px`,
      },
    });
    console.log('this.state', this.state);
  }

  componentDidMount(): void {
    this.initOverlay();
  }

  initOverlay(): void {
    this.setState({
      offsetWidth: window.innerWidth,
      offsetHeight: window.innerHeight,
    });
  }

  showWorksContent(): void {
    this.setState({
      isShowWorksContent: !this.state.isShowWorksContent,
      worksContent: WORKS_CONTENT,
    });
    this.overFlowHiddenHtml();
  }

  overFlowHiddenHtml(): void {
    const { documentElement, body } = document;
    documentElement.className = 'hidden';
    body.className = 'hidden';
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

    const circleClass: string = classNames('circle', {
      active: this.state.isShowOverlay,
    });

    return (
      <div className="App">
        <CSSTransition
          in={this.state.isShowWorksContent}
          classNames="slide-works"
          timeout={1000}
        >
          <div className="works-content-overlay">
            <h2 className="works-content-heading">EC Website</h2>
            <ReactMarkdown
              className="markdown-body"
              source={this.state.worksContent}
            />
          </div>
        </CSSTransition>

        <CSSTransition
          in={this.state.isShowOverlay}
          classNames="scale"
          timeout={1000}
          onEnter={() => this.showWorksContent()}
        >
          <div className={circleClass} style={this.state.circleStyle} />
        </CSSTransition>

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
                <li
                  className="works-list-item"
                  key={i}
                  onClick={this.handleClick}
                >
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
