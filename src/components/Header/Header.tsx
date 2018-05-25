import * as React from 'react'
import * as Swiper from 'react-id-swiper'
import * as queryString from 'query-string'
import { xor } from 'lodash'

import './Header.css'
import { HomeState, SearchQuery } from '@/modules/home/reducer'
import { History } from 'history'

export interface HeaderProps {
  languages: HomeState['languages']
  searchQuery: SearchQuery
  updateSearchQuery: (searchQuery: any) => any
  history?: History
}

export default class Header extends React.PureComponent<HeaderProps, {}> {
  private swiper: any

  constructor(props: HeaderProps) {
    super(props)
  }

  public render(): JSX.Element {
    const params = {
      freeMode: true,
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 10,
    }

    const rows: JSX.Element[] | null = this.props.languages.length
      ? this.props.languages.map(l => (
          // @todo figure out the best practice for passing args in event handler
          // @see https://github.com/palantir/tslint-react/issues/96
          // tslint:disable-next-line jsx-no-lambda
          <a href="#" key={l.id} onClick={e => this.clickHandler(e, l.id)}>
            {l.name}
          </a>
        ))
      : null

    return (
      <header className="header">
        <div className="logo">
          <a href="/">Manato</a>
        </div>
        <nav className="nav">
          <div>
            <i className="fa fa-angle-left icon" onClick={this.prev} />
          </div>
          <div className="nav-container">
            {rows && (
              <Swiper
                {...params}
                ref={(node: any) => {
                  if (node) this.swiper = node.swiper
                }}
              >
                {rows}
              </Swiper>
            )}
          </div>
          <div>
            <i className="fa fa-angle-right icon" onClick={this.next} />
          </div>
        </nav>
      </header>
    )
  }

  private clickHandler = async (
    e: React.SyntheticEvent<EventTarget>,
    id: number,
  ): Promise<void> => {
    e.preventDefault()

    const languages = xor(this.props.searchQuery.languages, [id])
    await this.props.updateSearchQuery({ languages })

    this.search()
  }

  private search = (): void => {
    if (this.props.history)
      this.props.history.push({
        pathname: '/',
        search: `?${queryString.stringify(this.props.searchQuery)}`,
      })
  }

  private next = (): void => {
    this.swiper.slideNext()
  }

  private prev = (): void => {
    this.swiper.slidePrev()
  }
}
