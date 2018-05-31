import * as React from 'react'
import { Animated } from 'react-animated-css'
import Anime, { AnimeProps } from 'react-anime'
import { connect, Dispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

/* tslint:disable */

// others
import './WorkDetail.css'
import addClassHtml from '@/utils/addClassHtml'
import removeClassHtml from '@/utils/removeClassHtml'
import { HomeState, Work as IWork, SearchQuery } from '@/modules/home/reducer'
import actions from '@/modules/home/actions'
import { RootState } from '@/modules/reducers'
import WorkContent from '@/components/WorkContent/WorkContent'
import { History, Location } from 'history'
import * as classnames from 'classnames'

interface WorkDetailProps
  extends WorkDetailStateFromProps,
    WorkDetailDispatchFromProps {}

export class WorkDetail extends React.Component<WorkDetailProps, {}> {
  public anime: any

  constructor(props: WorkDetailProps) {
    super(props)
  }

  async componentWillMount(): Promise<void> {}

  componentDidUpdate(prevProps: WorkDetailProps) {}

  hideOverlay = (): void => {
    this.props.toggleWorksContent(false)
    removeClassHtml()

    this.props.toggleOverlay(false)
    this.props.toggleWorksContentAnimation(false)
    this.props.toggleWorksContentExpand(false)
  }

  onExitedOverlay = (): void => {
    this.props.updateCircle({
      top: '0px',
      left: '-1000px',
    })
  }

  showWorksContent = (): void => {
    this.props.toggleWorksContent(true)
    addClassHtml('hidden')
  }

  onEnteredShowWorksContent(): void {
    this.props.toggleWorksContentAnimation(true)
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
    }

    return this.props.workContentImg !== '' &&
      this.props.isShowWorksContent &&
      !this.props.isExpandWorksContent ? (
      <Anime {...animeProps} key={`anime-${this.props.workContentImg}`}>
        <div className="uncover-slice" />
        <div className="uncover-slice" />
        <div className="uncover-slice" />
        <div className="uncover-slice" />
        <div className="uncover-slice" />
        <div className="uncover-slice" />
      </Anime>
    ) : null
  }

  public render(): JSX.Element {
    const compressIconClass = classnames('fa', {
      'fa-expand': !this.props.isExpandWorksContent,
      'fa-compress': this.props.isExpandWorksContent,
    })

    const worksBackButtonClass = classnames('fa fa-angle-left icon', {
      expanded: this.props.isExpandWorksContent,
    })

    return (
      <div className="work-detail">
        <CSSTransition
          in={this.props.isShowWorksContent}
          classNames="slide-works"
          timeout={1000}
          onEntered={() => this.onEnteredShowWorksContent()}
        >
          <CSSTransition
            in={this.props.isExpandWorksContent}
            classNames="expand-works"
            timeout={1000}
          >
            <div className="works-content-overlay">
              <div className="expand-overlay" onClick={this.expandWorksContent}>
                <i className={compressIconClass} />
              </div>
              <div className="works-content-wrapper">
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
            </div>
          </CSSTransition>
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
            <i className={worksBackButtonClass} onClick={this.hideOverlay} />
          </div>
        </CSSTransition>
      </div>
    )
  }

  private expandWorksContent = (): void => {
    this.props.toggleWorksContentExpand(!this.props.isExpandWorksContent)
  }
}

export interface WorkDetailDispatchFromProps {
  toggleOverlay: (isShowOverlay: boolean) => any
  toggleWorksContent: (isShowWorksContent: boolean) => any
  toggleWorksContentAnimation: (isShowWorksContentAnimation: boolean) => any
  toggleWorksContentExpand: (isExpandWorksContent: boolean) => any
  updateCircle: (circleStyle: React.CSSProperties) => any
  updateWorkContentImg: (workContentImg: string) => any
  updateTargetWork: (payload: IWork) => any
  updateSearchQuery: (searchQuery: any) => any
  fetchWorks: (searchQuery?: SearchQuery) => any
}

export interface WorkDetailStateFromProps extends HomeState {
  history?: History
  location?: Location
}

export function mapStateToProps(state: RootState) {
  return {
    ...state.home,
  }
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
    toggleWorksContentExpand: (isExpandWorksContent: boolean) =>
      dispatch(actions.toggleWorksContentExpand(isExpandWorksContent)),

    updateCircle: (circleStyle: React.CSSProperties) =>
      dispatch(actions.updateCircle(circleStyle)),
    updateWorkContentImg: (workContentImg: string) =>
      dispatch(actions.updateWorkContentImg(workContentImg)),
    updateTargetWork: (targetWork: IWork) =>
      dispatch(actions.updateTargetWork(targetWork)),
    updateSearchQuery: (searchQuery: any) =>
      dispatch(actions.updateSearchQuery(searchQuery)),

    fetchWorks: () => dispatch(actions.fetchWorks.request()),
  }
}

export default connect<
  WorkDetailStateFromProps,
  WorkDetailDispatchFromProps,
  void
>(mapStateToProps, mapDispatchToProps)(WorkDetail)
