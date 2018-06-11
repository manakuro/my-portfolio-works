import * as React from 'react'
import * as Swiper from 'react-id-swiper'
import * as queryString from 'query-string'
import { xor } from 'lodash'
import * as classNames from 'classnames'

import './Header.css'
import { HomeState, SearchQuery } from '@/modules/home/reducer'
import { History } from 'history'

export interface HeaderProps {
  languages: HomeState['languages']
  searchQuery: SearchQuery
  updateSearchQuery: (searchQuery: any) => any
  history: History
}

const SWIPER_OPTIONS = {
  freeMode: true,
  slidesPerView: 'auto',
  spaceBetween: 10,
}

export default class Header extends React.PureComponent<HeaderProps, {}> {
  private swiper: any

  constructor(props: HeaderProps) {
    super(props)
  }

  public render(): JSX.Element {
    const mapActiveLanguages = this.props.searchQuery.languages.reduce(
      (acc, l) => {
        acc[l] = true
        return acc
      },
      {},
    )

    const rows: JSX.Element[] | null = this.props.languages.length
      ? this.props.languages.map(l => (
          // @todo figure out the best practice for passing args in event handler
          // @see https://github.com/palantir/tslint-react/issues/96
          <a
            href="#"
            key={l.id}
            // tslint:disable-next-line jsx-no-lambda
            onClick={e => this.clickHandler(e, l.id)}
            className={classNames('header-Nav_Link', {
              'header-Nav_Link-active': mapActiveLanguages[l.id],
            })}
          >
            {l.name}
          </a>
        ))
      : null

    return (
      <header className="header">
        <div className="header-Logo">
          <a href="/">Manato</a>
        </div>
        <nav className="header-Nav">
          <div>
            <i
              className="fa fa-angle-left header-Nav_Icon"
              onClick={this.prev}
            />
          </div>
          <div className="header-Nav_Container">
            {rows && (
              <Swiper
                {...SWIPER_OPTIONS}
                ref={(node: any) => {
                  if (node) this.swiper = node.swiper
                }}
              >
                {rows}
              </Swiper>
            )}
          </div>
          <div>
            <i
              className="fa fa-angle-right header-Nav_Icon"
              onClick={this.next}
            />
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
