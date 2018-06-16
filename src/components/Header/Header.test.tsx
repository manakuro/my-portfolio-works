import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { handleClick, Header, search, next, prev } from './Header'
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
    const wrapper = shallow(<Header {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  describe('search', () => {
    it('should successfully search', () => {
      search(props)

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

      handleClick(e, props, id)

      expect(props.updateSearchQuery).toHaveBeenCalledWith({ languages: [2] })
    })
  })

  describe('next', () => {
    it('should successfully go to next', () => {
      const swiper: any = {
        slideNext: jest.fn(),
      }

      next(swiper)

      expect(swiper.slideNext).toHaveBeenCalled()
    })
  })

  describe('prev', () => {
    it('should successfully go to next', () => {
      const swiper: any = {
        slidePrev: jest.fn(),
      }

      prev(swiper)

      expect(swiper.slidePrev).toHaveBeenCalled()
    })
  })
})
