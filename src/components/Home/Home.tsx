import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

// others
import './Home.css'
import { HomeState, Work, SearchQuery } from '@/modules/home/reducer'
import actions from '@/modules/home/actions'
import { RootState } from '@/modules/reducers'
import WorkListItem from '@/components/WorkListItem/WorkListItem'
import { History, Location } from 'history'
import * as queryString from 'query-string'
import { WorkDetail } from '@/components/WorkDetail/WorkDetail'
import { Route } from 'react-router'

export interface HomeProps extends HomeStateFromProps, HomeDispatchFromProps {}

export class Home extends React.Component<HomeProps, {}> {
  constructor(props: HomeProps) {
    super(props)
  }

  public async componentWillMount(): Promise<void> {
    await this.mergeQuery()
    this.props.fetchWorks()
  }

  public componentDidUpdate(prevProps: HomeProps) {
    if (prevProps.searchQuery !== this.props.searchQuery)
      this.props.fetchWorks()
  }

  public render(): JSX.Element {
    return (
      <div className="home">
        <Route
          path="/works/:id"
          exact={true}
          render={routeProps => {
            // tslint:disable-next-line jsx-no-lambda
            return <WorkDetail {...this.props} {...routeProps} />
          }}
        />
        <div className="works">
          <div className="works-list">
            {this.props.works.map((work, index) => (
              <WorkListItem
                key={index}
                work={work}
                updateTargetWork={this.props.updateTargetWork}
                languages={this.props.languages}
                updateCircle={this.props.updateCircle}
                history={this.props.history}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  private async mergeQuery(): Promise<void> {
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
}

export interface HomeDispatchFromProps {
  toggleOverlay: (isShowOverlay: boolean) => any
  toggleWorksContent: (isShowWorksContent: boolean) => any
  toggleWorksContentAnimation: (isShowWorksContentAnimation: boolean) => any
  toggleWorksContentExpand: (isExpandWorksContent: boolean) => any
  updateCircle: (circleStyle: React.CSSProperties) => any
  updateWorkContentImg: (workContentImg: string) => any
  updateTargetWork: (payload: Work) => any
  updateSearchQuery: (searchQuery: any) => any
  fetchWorks: (searchQuery?: SearchQuery) => any
  fetchWork: (id: number) => any
}

export interface HomeStateFromProps extends HomeState {
  location?: Location
  history?: History
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
    updateTargetWork: (targetWork: Work) =>
      dispatch(actions.updateTargetWork(targetWork)),
    updateSearchQuery: (searchQuery: any) =>
      dispatch(actions.updateSearchQuery(searchQuery)),

    fetchWorks: () => dispatch(actions.fetchWorks.request()),
    fetchWork: (id: number) => dispatch(actions.fetchWork.request(id)),
  }
}

export default connect<HomeStateFromProps, HomeDispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
