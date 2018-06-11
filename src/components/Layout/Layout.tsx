import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

// components
import Header from '@/components/Header/Header'

// others
import './Layout.css'
import { HomeState } from '@/modules/home/reducer'
import actions from '@/modules/home/actions'
import { RouteComponentProps } from 'react-router'
import { RootState } from '@/modules/reducers'

interface LayoutProps
  extends LayoutStateFromProps,
    LayoutDispatchFromProps,
    LayoutOwnProps {}

export class Layout extends React.Component<LayoutProps, {}> {
  constructor(props: LayoutProps) {
    super(props)
  }

  public async componentWillMount(): Promise<void> {
    this.props.fetchLanguages()
  }

  public render(): JSX.Element {
    return (
      <div className="layout">
        <Header {...this.props} />

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

export interface LayoutStateFromProps extends HomeState {}

export interface LayoutOwnProps extends RouteComponentProps<any> {}

export function mapStateToProps(state: RootState, ownProps: LayoutOwnProps) {
  return {
    ...state.home,
    ...ownProps,
  }
}

export function mapDispatchToProps(dispatch: Dispatch<() => any>) {
  return {
    fetchLanguages: () => dispatch(actions.fetchLanguages.request()),
    updateSearchQuery: (searchQuery: any) =>
      dispatch(actions.updateSearchQuery(searchQuery)),
  }
}

export default connect<
  LayoutStateFromProps,
  LayoutDispatchFromProps,
  LayoutOwnProps
>(mapStateToProps, mapDispatchToProps)(Layout) as any // @todo resolve types
