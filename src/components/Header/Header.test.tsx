import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Header } from './Header'
import { HeaderProps, WithHandlers } from '@/components/Header/Header'

const props: HeaderProps & WithHandlers = {
  languages: [],
  history: {
    push: jest.fn(),
  } as any,
  updateSearchQuery: jest.fn(),
  searchQuery: {
    languages: [],
  },
  handleClick: jest.fn(),
}

describe('Header', () => {
  it('should render', () => {
    const wrapper = shallow(<Header {...props} />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
