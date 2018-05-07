import * as React from 'react';
import { Animated } from 'react-animated-css';
import Anime, { AnimeProps } from 'react-anime';
import * as ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

/* tslint:disable */

// components
import TheHeader from '@/components/TheHeader/TheHeader';
import HomeWorks from './HomeWorks';

// others
import './Home.css';
import addClassHtml from '@/utils/addClassHtml';
import removeClassHtml from '@/utils/removeClassHtml';
import { IHomeState as IAppProps } from '@/reducers/home';
import { IReducers } from '@/reducers/reducers';

export interface IAppState {
  isShowOverlay: boolean;
  pageX: number;
  pageY: number;
  circleStyle: object;
  isShowWorksContent: boolean;
  isWorksContentAnimation: boolean;
}

export class Home extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.showOverlay = this.showOverlay.bind(this);
    this.showWorksContent = this.showWorksContent.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
    this.onExitedOverlay = this.onExitedOverlay.bind(this);

    this.state = {
      isShowOverlay: false,
      pageX: 0,
      pageY: 0,
      circleStyle: {},
      isShowWorksContent: false,
      isWorksContentAnimation: false,
    };
  }

  async showOverlay(e: React.SyntheticEvent<EventTarget>) {
    const nativeEvent: any = e.nativeEvent;
    const { pageX, pageY } = nativeEvent;
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

  componentDidMount(): void {}

  showWorksContent(): void {
    this.setState({
      isShowWorksContent: true,
    });
    addClassHtml('hidden');
  }

  onEnteredShowWorksContent(): void {
    this.setState({
      isWorksContentAnimation: true,
    });
  }

  public render(): JSX.Element {
    const animeProps: AnimeProps = {
      children: [],
      easing: 'easeInOutCirc',
      duration: 1000,
      delay: (_, i: number, t: number) => Math.abs(t / 2 - i) * 80,
      translateX: '-100%',
      scale: 1,
      value: '',
      translateY: 0,
      rotate: 0,
      opacity: 1,
      color: '',
      backgroundColor: '',
      points: '',
      strokeDashoffset: 0,
    };

    return (
      <div className="home">
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
                source={this.props.workContent}
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
                    <img src={this.props.workContentImg} />
                  </a>

                  <div className="uncover-slices">
                    {false && (
                      <Anime {...animeProps}>
                        <div className="uncover-slice" />
                        <div className="uncover-slice" />
                        <div className="uncover-slice" />
                        <div className="uncover-slice" />
                        <div className="uncover-slice" />
                        <div className="uncover-slice" />
                      </Anime>
                    )}
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
          <div className="circle" style={this.state.circleStyle} />
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

        <TheHeader />
        <main className="main container">
          <HomeWorks showOverlay={this.showOverlay} {...this.props} />
        </main>
      </div>
    );
  }
}

export function mapStateToProps(state: IReducers) {
  return state.home;
}

export function mapDispatchToProps(dispatch: any) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
