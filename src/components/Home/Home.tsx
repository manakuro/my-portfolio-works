import * as React from 'react';
import { Animated } from 'react-animated-css';
import Anime, { AnimeProps } from 'react-anime';
import { connect, Dispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

/* tslint:disable */

// components
import Header from '@/components/Header/Header';

// others
import './Home.css';
import addClassHtml from '@/utils/addClassHtml';
import removeClassHtml from '@/utils/removeClassHtml';
import { IHomeState, IWork } from '@/reducers/home/index';
import actions from '@/reducers/home/actions';
import { IReducers } from '@/reducers/reducers';
import Work from '@/components/Work/Work';
import WorkContent from '@/components/WorkContent/WorkContent';

interface IHomeProps extends IHomeStateFromProps, IHomeDispatchFromProps {}

export class Home extends React.Component<IHomeProps, {}> {
  public anime: any;

  constructor(props: IHomeProps) {
    super(props);
  }

  showOverlay = (e: React.SyntheticEvent<EventTarget>): void => {
    const nativeEvent: any = e.nativeEvent;
    const { pageX, pageY } = nativeEvent;
    const circleStyle = {
      top: `${pageY - 50}px`,
      left: `${pageX - 50}px`,
    };

    this.props.toggleOverlay(true);
    this.props.updateCircle(circleStyle);
  };

  hideOverlay = (): void => {
    this.props.toggleWorksContent(false);
    removeClassHtml();

    this.props.toggleOverlay(false);
    this.props.toggleWorksContentAnimation(false);
  };

  onExitedOverlay = (): void => {
    this.props.updateCircle({
      top: '0px',
      left: '-1000px',
    });
  };

  showWorksContent = (): void => {
    this.props.toggleWorksContent(true);
    addClassHtml('hidden');
  };

  onEnteredShowWorksContent(): void {
    this.props.toggleWorksContentAnimation(true);
  }

  renderWorkContentImgAnimation = (): JSX.Element | null => {
    const animeProps: AnimeProps = {
      children: [],
      easing: 'easeInOutCirc',
      duration: 500,
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

    return this.props.workContentImg !== '' && this.props.isShowWorksContent ? (
      <Anime {...animeProps} key={`anime-${this.props.workContentImg}`}>
        <div className="uncover-slice" />
        <div className="uncover-slice" />
        <div className="uncover-slice" />
        <div className="uncover-slice" />
        <div className="uncover-slice" />
        <div className="uncover-slice" />
      </Anime>
    ) : null;
  };

  public render(): JSX.Element {
    return (
      <div className="home">
        <CSSTransition
          in={this.props.isShowWorksContent}
          classNames="slide-works"
          timeout={1000}
          onEntered={() => this.onEnteredShowWorksContent()}
        >
          <div className="works-content-overlay">
            <Animated
              animationIn="fadeInDown"
              animationOut="fadeOut"
              isVisible={this.props.isShowWorksContentAnimation}
            >
              <h2 className="works-content-heading">EC Website</h2>
            </Animated>
            <Animated
              animationIn="fadeInDown"
              animationOut="fadeOut"
              animationInDelay={300}
              isVisible={this.props.isShowWorksContentAnimation}
            >
              <WorkContent
                updateWorkContentImg={this.props.updateWorkContentImg}
                targetWork={this.props.targetWork}
              />
            </Animated>
          </div>
        </CSSTransition>
        <Animated
          className="works-content-left-wrapper"
          animationIn="fadeIn"
          animationOut="fadeOut"
          animateOnMount={false}
          isVisible={this.props.isShowWorksContentAnimation}
        >
          <div className="works-content-left">
            <div className="works-content-left-inner">
              <Animated
                animationIn="fadeInDown"
                animationOut="fadeOut"
                animationInDelay={300}
                isVisible={this.props.isShowWorksContentAnimation}
              >
                <div className="uncover">
                  <a href="https://google.com" target="blank">
                    <img src={this.props.workContentImg} />
                  </a>

                  <div className="uncover-slices">
                    {this.renderWorkContentImgAnimation()}
                  </div>
                </div>
              </Animated>
            </div>
          </div>
        </Animated>

        <CSSTransition
          in={this.props.isShowOverlay}
          classNames="scale"
          timeout={1000}
          onEnter={() => this.showWorksContent()}
          onExit={() => this.onExitedOverlay()}
        >
          <div className="circle" style={this.props.circleStyle} />
        </CSSTransition>

        <CSSTransition
          in={this.props.isShowWorksContent}
          classNames="slide-button"
          timeout={1000}
        >
          <div className="works-back-button">
            <i className="fa fa-angle-left icon" onClick={this.hideOverlay} />
          </div>
        </CSSTransition>

        <Header />
        <main className="main container">
          <div className="works">
            <div className="works-list">
              {this.props.works.map((work: IWork) => (
                <Work
                  key={work.id}
                  work={work}
                  updateTargetWork={this.props.updateTargetWork}
                  showOverlay={this.showOverlay}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export interface IHomeDispatchFromProps {
  toggleOverlay: (isShowOverlay: boolean) => any;
  toggleWorksContent: (isShowWorksContent: boolean) => any;
  toggleWorksContentAnimation: (isShowWorksContentAnimation: boolean) => any;
  updateCircle: (circleStyle: React.CSSProperties) => any;
  updateWorkContentImg: (workContentImg: string) => any;
  updateTargetWork: (payload: IWork) => any;
}

export interface IHomeStateFromProps extends IHomeState {}

export function mapStateToProps(state: IReducers) {
  return state.home;
}

export function mapDispatchToProps(dispatch: Dispatch<() => any>) {
  return {
    toggleOverlay: (isShowOverlay: boolean) =>
      dispatch(actions.toggleOverlay(isShowOverlay)),
    toggleWorksContent: (isShowWorksContent: boolean) =>
      dispatch(actions.toggleWorksContent(isShowWorksContent)),
    toggleWorksContentAnimation: (isShowWorksContentAnimation: boolean) =>
      dispatch(
        actions.toggleWorksContentAnimation(isShowWorksContentAnimation),
      ),
    updateCircle: (circleStyle: React.CSSProperties) =>
      dispatch(actions.updateCircle(circleStyle)),
    updateWorkContentImg: (workContentImg: string) =>
      dispatch(actions.updateWorkContentImg(workContentImg)),
    updateTargetWork: (targetWork: IWork) =>
      dispatch(actions.updateTargetWork(targetWork)),
  };
}

export default connect<IHomeStateFromProps, IHomeDispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
