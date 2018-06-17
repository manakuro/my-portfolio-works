import * as React from 'react'
import { Animated } from 'react-animated-css'
import Anime, { AnimeProps } from 'react-anime'
import { CSSTransition } from 'react-transition-group'
import compose from 'recompose/compose'

// others
import './WorkDetail.css'
import addClassHtml from '@/utils/addClassHtml'
import removeClassHtml from '@/utils/removeClassHtml'
import WorkDetailContent from '@/components/WorkDetailContent/WorkDetailContent'
import * as classnames from 'classnames'
import { HomeState } from '@/modules/home/reducer'
import { HomeDispatchFromProps, HomeOwnProps } from '@/components/Home/Home'
import { withHandlers } from 'recompose'

export interface WorkDetailProps {
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
  history: HomeOwnProps['history']
  match: HomeOwnProps['match']
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

export function renderWorkContentImgAnimation(
  props: WorkDetailProps,
): JSX.Element | null {
  return props.workContentImg !== '' &&
    props.isShowWorksContent &&
    !props.isExpandWorksContent ? (
    <Anime {...ANIME_PROPS} key={`anime-${props.workContentImg}`}>
      <div className="work-detail-Uncover_Slice" />
      <div className="work-detail-Uncover_Slice" />
      <div className="work-detail-Uncover_Slice" />
      <div className="work-detail-Uncover_Slice" />
      <div className="work-detail-Uncover_Slice" />
      <div className="work-detail-Uncover_Slice" />
    </Anime>
  ) : null
}

export function goBack(props: WorkDetailProps): void {
  props.history.goBack()
}

export function hideOverlay(props: WorkDetailProps): void {
  props.toggleWorksContent(false)
  removeClassHtml()

  props.toggleOverlay(false)
  props.toggleWorksContentAnimation(false)
  props.toggleWorksContentExpand(false)
}

export function onExitedOverlay(props: WorkDetailProps): void {
  props.updateCircle({
    top: '0px',
    left: '-1000px',
  })

  goBack(props)
}

export function showWorksContent(props: WorkDetailProps): void {
  props.toggleWorksContent(true)
  addClassHtml('hidden')
}

export function onEnteredShowWorksContent(props: WorkDetailProps): void {
  props.toggleWorksContentAnimation(true)
}

export function expandWorksContent(props: WorkDetailProps): void {
  props.toggleWorksContentExpand(!props.isExpandWorksContent)
}

const enhance = compose<
  WorkDetailProps & WorkDetailWithHandlers,
  WorkDetailProps
>(
  withHandlers({
    expandWorksContent: (props: WorkDetailProps) => () =>
      expandWorksContent(props),
    hideOverlay: (props: WorkDetailProps) => () => hideOverlay(props),
    onEnteredShowWorksContent: (props: WorkDetailProps) => () =>
      onEnteredShowWorksContent(props),
    showWorksContent: (props: WorkDetailProps) => () => showWorksContent(props),
    onExitedOverlay: (props: WorkDetailProps) => () => onExitedOverlay(props),
  }),
)

export type WorkDetailWithHandlers = {
  [P in
    | 'expandWorksContent'
    | 'hideOverlay'
    | 'onEnteredShowWorksContent'
    | 'showWorksContent'
    | 'onExitedOverlay']: () => any
}

export const WorkDetailComponent = (
  props: WorkDetailProps & WorkDetailWithHandlers,
) => {
  const {
    isExpandWorksContent,
    isShowWorksContent,
    isShowWorksContentAnimation,
    updateWorkContentImg,
    isShowOverlay,
    circleStyle,
    targetWork,
    workContentImg,
  } = props

  const compressIconClass = classnames('fa', {
    'fa-expand': !isExpandWorksContent,
    'fa-compress': isExpandWorksContent,
  })

  const worksBackButtonClass = classnames('fa fa-angle-left icon', {
    expanded: isExpandWorksContent,
  })

  return (
    <div className="work-detail">
      <CSSTransition
        in={isShowWorksContent}
        appear={true}
        classNames="slide-works"
        timeout={1000}
        onEntered={props.onEnteredShowWorksContent}
      >
        <CSSTransition
          in={isExpandWorksContent}
          appear={true}
          classNames="expand-works"
          timeout={1000}
        >
          <div className="work-detail-Overlay">
            <div
              className="work-detail-ExpandOverlay"
              onClick={props.expandWorksContent}
            >
              <i className={compressIconClass} />
            </div>
            <div className="work-detail-Content_Wrapper">
              <Animated
                animationIn="fadeInDown"
                animationOut="fadeOut"
                isVisible={isShowWorksContentAnimation}
              >
                <h2 className="work-detail-Content_Heading">EC Website</h2>
              </Animated>
              <Animated
                animationIn="fadeInDown"
                animationOut="fadeOut"
                animationInDelay={300}
                isVisible={isShowWorksContentAnimation}
              >
                <WorkDetailContent
                  updateWorkContentImg={updateWorkContentImg}
                  targetWork={targetWork}
                />
              </Animated>
            </div>
          </div>
        </CSSTransition>
      </CSSTransition>
      <Animated
        className="work-detail-ContentLeftWrapper"
        animationIn="fadeIn"
        animationOut="fadeOut"
        animateOnMount={false}
        isVisible={isShowWorksContentAnimation}
      >
        <div className="work-detail-ContentLeft">
          <div className="work-detail-ContentLeft_Inner">
            <Animated
              animationIn="fadeInDown"
              animationOut="fadeOut"
              animationInDelay={300}
              isVisible={isShowWorksContentAnimation}
            >
              <div className="work-detail-Uncover">
                <a href="https://google.com" target="blank">
                  <img src={workContentImg} />
                </a>

                <div className="work-detail-Uncover_Slices">
                  {renderWorkContentImgAnimation(props)}
                </div>
              </div>
            </Animated>
          </div>
        </div>
      </Animated>

      <CSSTransition
        in={isShowOverlay}
        appear={true}
        classNames="scale"
        timeout={1000}
        onEnter={props.showWorksContent}
        onExited={props.onExitedOverlay}
      >
        <div className="work-detail-Circle" style={circleStyle} />
      </CSSTransition>

      <CSSTransition
        in={isShowWorksContent}
        appear={true}
        classNames="slide-button"
        timeout={1000}
      >
        <div className="work-detail-BackButton">
          <i className={worksBackButtonClass} onClick={props.hideOverlay} />
        </div>
      </CSSTransition>
    </div>
  )
}

// NOTE: might not want to use lifecycle in recompose
// @see https://github.com/acdlite/recompose/issues/653#issuecomment-383645282
export const Enhanced = enhance(WorkDetailComponent)

export default class WorkDetail extends React.Component<WorkDetailProps, {}> {
  constructor(props: WorkDetailProps) {
    super(props)
  }

  public async componentDidMount(): Promise<void> {
    this.props.toggleOverlay(true)

    let { id } = this.props.match.params
    id = parseInt(id, 10)

    await this.props.fetchWork(id)

    if (!this.props.targetWork) this.props.history.push('/')
  }

  public render() {
    return <Enhanced {...this.props} />
  }
}
