import * as React from 'react'
import * as Swiper from 'react-id-swiper'

import './Header.css'
import { HomeState } from '@/modules/home/reducer'

export interface HeaderProps {
  languages: HomeState['languages']
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
          <a href="#" key={l.id}>
            {l.name}
          </a>
        ))
      : null

    return (
      <header className="header">
        <div className="logo">
          <a href="#">Manato</a>
        </div>
        <nav className="nav">
          <div>
            <i className="fa fa-angle-left icon" onClick={this.goPrev} />
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
            <i className="fa fa-angle-right icon" onClick={this.goNext} />
          </div>
        </nav>
      </header>
    )
  }

  private goNext = (): void => {
    this.swiper.slideNext()
  }

  private goPrev = (): void => {
    this.swiper.slidePrev()
  }
}
