import * as React from 'react'
import * as Swiper from 'react-id-swiper'
import * as queryString from 'query-string'
import { xor } from 'lodash'
import * as classNames from 'classnames'
import compose from 'recompose/compose'

import './Header.css'
import { HomeState, SearchQuery } from '@/modules/home/reducer'
import { History } from 'history'
import { lifecycle, onlyUpdateForKeys, withHandlers } from 'recompose'

export interface HeaderProps {
  languages: HomeState['languages']
  searchQuery: SearchQuery
  updateSearchQuery: (searchQuery: any) => any
  history: History
}

export interface WithHandlers {
  handleClick: (e: React.SyntheticEvent<EventTarget>, id: number) => any
}

const SWIPER_OPTIONS = {
  freeMode: true,
  slidesPerView: 'auto',
  spaceBetween: 10,
}

export function search(props: HeaderProps): void {
  props.history.push({
    pathname: '/',
    search: `?${queryString.stringify(props.searchQuery)}`,
  })
}

export function handleClick(
  e: React.SyntheticEvent<EventTarget>,
  props: HeaderProps,
  id: number,
): void {
  e.preventDefault()

  const languages = xor(props.searchQuery.languages, [id])
  props.updateSearchQuery({ languages })
}

export function next(swiper: any): void {
  swiper.slideNext()
}

export function prev(swiper: any): void {
  swiper.slidePrev()
}

const enhance = compose<HeaderProps & WithHandlers, HeaderProps>(
  withHandlers({
    handleClick: (props: HeaderProps) => async (
      e: React.SyntheticEvent<EventTarget>,
      id: number,
    ) => handleClick(e, props, id),
  }),
  lifecycle({
    componentWillReceiveProps(nextProps: HeaderProps) {
      if (this.props.searchQuery.languages !== nextProps.searchQuery.languages)
        search(nextProps)
    },
  }),
  onlyUpdateForKeys([
    'languages',
    'searchQuery',
    'updateSearchQuery',
    'history',
  ]),
)

export const Header = (props: HeaderProps & WithHandlers): JSX.Element => {
  let swiper: any

  const mapActiveLanguages = props.searchQuery.languages.reduce((acc, l) => {
    acc[l] = true
    return acc
  }, {})

  const rows: JSX.Element[] | null = props.languages.length
    ? props.languages.map(l => (
        // @todo figure out the best practice for passing args in event handler
        // @see https://github.com/palantir/tslint-react/issues/96
        <a
          href="#"
          key={l.id}
          // tslint:disable-next-line jsx-no-lambda
          onClick={e => props.handleClick(e, l.id)}
          className={classNames('header-Nav_Link', {
            'header-Nav_Link-active': mapActiveLanguages[l.id],
          })}
        >
          {l.name}
        </a>
      ))
    : null

  const nav: JSX.Element | null = rows ? (
    <Swiper
      {...SWIPER_OPTIONS}
      ref={(node: any) => {
        if (node) swiper = node.swiper
      }}
    >
      {rows}
    </Swiper>
  ) : null

  return (
    <header className="header">
      <div className="header-Logo">
        <a href="/">Manato</a>
      </div>
      <nav className="header-Nav">
        <div>
          <i
            className="fa fa-angle-left header-Nav_Icon"
            // tslint:disable-next-line jsx-no-lambda
            onClick={() => prev(swiper)}
          />
        </div>
        <div className="header-Nav_Container">{nav}</div>
        <div>
          <i
            className="fa fa-angle-right header-Nav_Icon"
            // tslint:disable-next-line jsx-no-lambda
            onClick={() => next(swiper)}
          />
        </div>
      </nav>
    </header>
  )
}

export default enhance(Header)
