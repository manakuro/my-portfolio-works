import * as React from 'react'
import { shallow } from 'enzyme'
import * as Header from './Header'
import { HeaderPropsWithCompose } from '@/components/Header/Header'

const props: HeaderPropsWithCompose = {
  languages: [
    { id: 1, name: 'Ruby on Rails', icon: 'rails' },
    { id: 2, name: 'React.js', icon: 'react' },
  ],
  history: {
    push: jest.fn(),
  } as any,
  updateSearchQuery: jest.fn(),
  searchQuery: {
    languages: [1, 2],
  },
  handleClick: jest.fn(),
}

describe('Header', () => {
  it('should render', () => {
    const wrapper = shallow(<Header.Header {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('search', () => {
    it('should successfully search', () => {
      Header.search(props)

      expect(props.history.push).toHaveBeenCalledWith({
        pathname: '/',
        search: '?languages=1&languages=2',
      })
    })
  })

  describe('handleClick', () => {
    it('should successfully update query', () => {
      const e: any = {
        preventDefault: jest.fn(),
      }
      const id = 1

      Header.handleClick(e, props, id)

      expect(props.updateSearchQuery).toHaveBeenCalledWith({ languages: [2] })
    })
  })

  describe('next', () => {
    it('should successfully go to next', () => {
      const swiper: any = {
        slideNext: jest.fn(),
      }

      Header.next(swiper)

      expect(swiper.slideNext).toHaveBeenCalled()
    })
  })

  describe('prev', () => {
    it('should successfully go to next', () => {
      const swiper: any = {
        slidePrev: jest.fn(),
      }

      Header.prev(swiper)

      expect(swiper.slidePrev).toHaveBeenCalled()
    })
  })
})
