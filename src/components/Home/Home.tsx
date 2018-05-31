import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

/* tslint:disable */

// others
import './Home.css'
import { HomeState, Work as IWork, SearchQuery } from '@/modules/home/reducer'
import actions from '@/modules/home/actions'
import { RootState } from '@/modules/reducers'
import Work from '@/components/Work/Work'
import { History, Location } from 'history'
import * as queryString from 'query-string'
import { WorkDetail } from '@/components/WorkDetail/WorkDetail'

interface HomeProps extends HomeStateFromProps, HomeDispatchFromProps {}

export class Home extends React.Component<HomeProps, {}> {
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

  public render(): JSX.Element {
    return (
      <div className="home">
        <WorkDetail {...this.props} />
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
  toggleWorksContentExpand: (isExpandWorksContent: boolean) => any
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

export default connect<HomeStateFromProps, HomeDispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
