import * as React from 'react'
import { Animated } from 'react-animated-css'
import Anime, { AnimeProps } from 'react-anime'
import { CSSTransition } from 'react-transition-group'

/* tslint:disable */

// others
import './WorkDetail.css'
import addClassHtml from '@/utils/addClassHtml'
import removeClassHtml from '@/utils/removeClassHtml'
import WorkDetailContent from '@/components/WorkDetailContent/WorkDetailContent'
import * as classnames from 'classnames'
import { HomeState } from '@/modules/home/reducer'
import { HomeDispatchFromProps } from '@/components/Home/Home'
import { History, Location } from 'history'

interface WorkDetailProps {
  toggleOverlay: HomeDispatchFromProps['toggleOverlay']
  toggleWorksContent: HomeDispatchFromProps['toggleWorksContent']
  toggleWorksContentAnimation: HomeDispatchFromProps['toggleWorksContentAnimation']
  toggleWorksContentExpand: HomeDispatchFromProps['toggleWorksContentExpand']
  updateCircle: HomeDispatchFromProps['updateCircle']
  updateWorkContentImg: HomeDispatchFromProps['updateWorkContentImg']
  fetchWork: HomeDispatchFromProps['fetchWork']

  workContentImg: HomeState['workContentImg']
  isShowOverlay: HomeState['isShowOverlay']
  isShowWorksContent: HomeState['isShowWorksContent']
  isExpandWorksContent: HomeState['isExpandWorksContent']
  circleStyle: HomeState['circleStyle']
  isShowWorksContentAnimation: HomeState['isShowWorksContentAnimation']
  targetWork: HomeState['targetWork']
  history: History
  location: Location
  match: any
}

const ANIME_PROPS: AnimeProps = {
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

export class WorkDetail extends React.Component<WorkDetailProps, {}> {
  public anime: any

  constructor(props: WorkDetailProps) {
    super(props)
  }

  public async componentDidMount(): Promise<void> {
    this.props.toggleOverlay(true)

    let { id } = this.props.match.params
    id = parseInt(id, 10)

    await this.props.fetchWork(id)

    if (!this.props.targetWork) {
      this.props.history.push('/')
    }
  }

  public renderWorkContentImgAnimation = (): JSX.Element | null => {
    return this.props.workContentImg !== '' &&
      this.props.isShowWorksContent &&
      !this.props.isExpandWorksContent ? (
      <Anime {...ANIME_PROPS} key={`anime-${this.props.workContentImg}`}>
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
          appear={true}
          classNames="slide-works"
          timeout={1000}
          onEntered={() => this.onEnteredShowWorksContent()}
        >
          <CSSTransition
            in={this.props.isExpandWorksContent}
            appear={true}
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
                  <WorkDetailContent
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
          appear={true}
          classNames="scale"
          timeout={1000}
          onEnter={() => this.showWorksContent()}
          onExited={() => this.onExitedOverlay()}
        >
          <div className="circle" style={this.props.circleStyle} />
        </CSSTransition>

        <CSSTransition
          in={this.props.isShowWorksContent}
          appear={true}
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

  private goBack(): void {
    if (this.props.history) this.props.history.goBack()
  }

  private hideOverlay = (): void => {
    this.props.toggleWorksContent(false)
    removeClassHtml()

    this.props.toggleOverlay(false)
    this.props.toggleWorksContentAnimation(false)
    this.props.toggleWorksContentExpand(false)
  }

  private onExitedOverlay = (): void => {
    this.props.updateCircle({
      top: '0px',
      left: '-1000px',
    })

    this.goBack()
  }

  private showWorksContent = (): void => {
    this.props.toggleWorksContent(true)
    addClassHtml('hidden')
  }

  private onEnteredShowWorksContent(): void {
    this.props.toggleWorksContentAnimation(true)
  }

  private expandWorksContent = (): void => {
    this.props.toggleWorksContentExpand(!this.props.isExpandWorksContent)
  }
}
