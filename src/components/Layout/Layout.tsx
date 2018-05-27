import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

/* tslint:disable */

// components
import Header from '@/components/Header/Header'

// others
import './Layout.css'
import { HomeState } from '@/modules/home/reducer'
import actions from '@/modules/home/actions'
import { RootState } from '@/modules/reducers'
import { History, Location } from 'history'
import { withRouter } from 'react-router'

interface LayoutProps extends LayoutStateFromProps, LayoutDispatchFromProps {}

//@todo resolve props type
export class Layout extends React.Component<any, {}> {
  constructor(props: LayoutProps) {
    super(props)
  }

  async componentWillMount(): Promise<void> {
    this.props.fetchLanguages()
  }

  public render(): JSX.Element {
    return (
      <div className="layout">
        <Header
          updateSearchQuery={this.props.updateSearchQuery}
          searchQuery={this.props.searchQuery}
          languages={this.props.languages}
          history={this.props.history}
        />

        <CSSTransition
          in={!this.props.isLoading}
          timeout={200}
          classNames="loader"
        >
          <div className="loader" />
        </CSSTransition>
        <main className="main container">{this.props.children}</main>
      </div>
    )
  }
}

export interface LayoutDispatchFromProps {
  fetchLanguages: () => any
  updateSearchQuery: (searchQuery: any) => any
}

export interface LayoutStateFromProps extends HomeState {
  history?: History
  location?: Location
}

export function mapStateToProps(state: RootState) {
  return state.home
}

export function mapDispatchToProps(dispatch: Dispatch<() => any>) {
  return {
    fetchLanguages: () => dispatch(actions.fetchLanguages.request()),
    updateSearchQuery: (searchQuery: any) =>
      dispatch(actions.updateSearchQuery(searchQuery)),
  }
}

export default connect<LayoutStateFromProps, LayoutDispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Layout) as any) //@todo resolve type
