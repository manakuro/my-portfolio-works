import * as React from 'react'
import { Animated } from 'react-animated-css'
import Anime, { AnimeProps } from 'react-anime'
import { connect, Dispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

/* tslint:disable */

// others
import './Home.css'
import addClassHtml from '@/utils/addClassHtml'
import removeClassHtml from '@/utils/removeClassHtml'
import { HomeState, IWork, SearchQuery } from '@/modules/home/reducer'
import actions from '@/modules/home/actions'
import { RootState } from '@/modules/reducers'
import Work from '@/components/Work/Work'
import WorkContent from '@/components/WorkContent/WorkContent'
import { History, Location } from 'history'
import * as queryString from 'query-string'

interface HomeProps extends HomeStateFromProps, HomeDispatchFromProps {}

export class Home extends React.Component<HomeProps, {}> {
  public anime: any

  constructor(props: HomeProps) {
    super(props)
  }

  async componentWillMount(): Promise<void> {
    await this.mergeQuery()

    this.props.fetchWorks()
  }

  componentDidUpdate(prevProps: HomeProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.props.fetchWorks()
    }
  }

  async mergeQuery(): Promise<void> {
    if (this.props.location) {
      const query = queryString.parse(this.props.location.search)
      if (query.languages) {
        if (typeof query.languages === 'string')
          query.languages = query.languages.split()
        query.languages = query.languages.map((l: string) => parseInt(l, 10))
      }

      await this.props.updateSearchQuery(query)
    }
  }

  showOverlay = (e: React.SyntheticEvent<EventTarget>): void => {
    const nativeEvent: any = e.nativeEvent
    const { pageX, pageY } = nativeEvent
    const circleStyle = {
      top: `${pageY - 50}px`,
      left: `${pageX - 50}px`,
    }

    this.props.toggleOverlay(true)
    this.props.updateCircle(circleStyle)
  }

  hideOverlay = (): void => {
    this.props.toggleWorksContent(false)
    removeClassHtml()

    this.props.toggleOverlay(false)
    this.props.toggleWorksContentAnimation(false)
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

    return this.props.workContentImg !== '' && this.props.isShowWorksContent ? (
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

        <div className="works">
          <div className="works-list">
            {this.props.works.map((work, index) => (
              <Work
                key={index}
                work={work}
                updateTargetWork={this.props.updateTargetWork}
                showOverlay={this.showOverlay}
                languages={this.props.languages}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export interface HomeDispatchFromProps {
  toggleOverlay: (isShowOverlay: boolean) => any
  toggleWorksContent: (isShowWorksContent: boolean) => any
  toggleWorksContentAnimation: (isShowWorksContentAnimation: boolean) => any
  updateCircle: (circleStyle: React.CSSProperties) => any
  updateWorkContentImg: (workContentImg: string) => any
  updateTargetWork: (payload: IWork) => any
  updateSearchQuery: (searchQuery: any) => any
  fetchWorks: (searchQuery?: SearchQuery) => any
}

export interface HomeStateFromProps extends HomeState {
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

export default connect<HomeStateFromProps, HomeDispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
