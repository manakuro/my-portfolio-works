import * as React from 'react';
import { Animated } from 'react-animated-css';
// import Anime from 'react-anime';
import { CSSTransition } from 'react-transition-group';

import * as classNames from 'classnames';

/* tslint:disable */
/* tslint:disable no-var-requires */
/* tslint:disable no-empty-interface */

// static
import './App.css';
import Header from './Header';
import Works from './Works';

import sampleImg from './static/images/sample.jpeg';
const ReactMarkdown = require('react-markdown');

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
  isWorksContentAnimation: boolean;
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

function addClassHtml(className: string): void {
  const { documentElement, body } = document;
  documentElement.className = className;
  body.className = className;
}

function removeClassHtml(): void {
  const { documentElement, body } = document;
  documentElement.className = '';
  body.className = '';
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.showOverlay = this.showOverlay.bind(this);
    this.showWorksContent = this.showWorksContent.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
    this.onExitedOverlay = this.onExitedOverlay.bind(this);

    this.state = {
      offsetWidth: 0,
      offsetHeight: 0,
      isAnime: false,
      isShowOverlay: false,
      pageX: 0,
      pageY: 0,
      circleStyle: {},
      isShowWorksContent: false,
      isWorksContentAnimation: false,
      worksContent: null,
    };
  }

  async showOverlay(e: any) {
    const { pageX, pageY } = e.nativeEvent;
    await this.setState({
      isShowOverlay: true,
      pageX,
      pageY,
      circleStyle: {
        top: `${pageY - 50}px`,
        left: `${pageX - 50}px`,
      },
    });
  }

  hideOverlay(): void {
    this.setState({
      isShowWorksContent: false,
    });
    removeClassHtml();

    this.setState({
      isShowOverlay: false,
      isWorksContentAnimation: false,
    });
  }

  onExitedOverlay(): void {
    this.setState({
      circleStyle: {
        top: '0px',
        left: '-1000px',
      },
    });
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
      isShowWorksContent: true,
      worksContent: WORKS_CONTENT,
    });
    addClassHtml('hidden');
  }

  onEnteredShowWorksContent(): void {
    this.setState({
      isWorksContentAnimation: true,
    });
  }

  render(): JSX.Element {
    const circleClass: string = classNames('circle', {
      active: this.state.isShowOverlay,
    });

    return (
      <div className="App">
        <CSSTransition
          in={this.state.isShowWorksContent}
          classNames="slide-works"
          timeout={1000}
          onEntered={() => this.onEnteredShowWorksContent()}
        >
          <div className="works-content-overlay">
            <Animated
              animationIn="fadeInDown"
              animationOut="fadeOut"
              isVisible={this.state.isWorksContentAnimation}
            >
              <h2 className="works-content-heading">EC Website</h2>
            </Animated>
            <Animated
              animationIn="fadeInDown"
              animationOut="fadeOut"
              animationInDelay={300}
              isVisible={this.state.isWorksContentAnimation}
            >
              <ReactMarkdown
                className="markdown-body"
                source={this.state.worksContent}
              />
            </Animated>
          </div>
        </CSSTransition>
        <Animated
          className="works-content-left-wrapper"
          animationIn="fadeIn"
          animationOut="fadeOut"
          animateOnMount={false}
          isVisible={this.state.isWorksContentAnimation}
        >
          <div className="works-content-left">
            <div className="works-content-left-inner">
              <Animated
                animationIn="fadeInDown"
                animationOut="fadeOut"
                animationInDelay={300}
                isVisible={this.state.isWorksContentAnimation}
              >
                <div className="uncover">
                  <a href="https://google.com" target="blank">
                    <img src={sampleImg} />
                  </a>

                  <div className="uncover-slices">
                    <div className="uncover-slice" />
                    <div className="uncover-slice" />
                    <div className="uncover-slice" />
                    <div className="uncover-slice" />
                  </div>
                </div>
              </Animated>
            </div>
          </div>
        </Animated>

        <CSSTransition
          in={this.state.isShowOverlay}
          classNames="scale"
          timeout={1000}
          onEnter={() => this.showWorksContent()}
          onExit={() => this.onExitedOverlay()}
        >
          <div className={circleClass} style={this.state.circleStyle} />
        </CSSTransition>

        <CSSTransition
          in={this.state.isShowWorksContent}
          classNames="slide-button"
          timeout={1000}
        >
          <div className="works-back-button">
            <i className="fa fa-angle-left icon" onClick={this.hideOverlay} />
          </div>
        </CSSTransition>

        <Header />
        <main className="main container">
          <Works showOverlay={this.showOverlay} />

          {/*<Anime*/}
          {/*easing="easeOutElastic"*/}
          {/*duration={1000}*/}
          {/*direction="alternate"*/}
          {/*loop={true}*/}
          {/*delay={(el, index: number) => index * 240}*/}
          {/*translateX="13rem"*/}
          {/*scale={[0.75, 0.9]}*/}
          {/*value=""*/}
          {/*translateY={0}*/}
          {/*rotate={0}*/}
          {/*opacity={1}*/}
          {/*color="#000"*/}
          {/*backgroundColor="#000"*/}
          {/*points=""*/}
          {/*strokeDashoffset={0}*/}
          {/*>*/}
          {/*<div className="blue" />*/}
          {/*<div className="green" />*/}
          {/*<div className="red" />*/}
          {/*</Anime>*/}
        </main>
      </div>
    );
  }
}

export default App;
