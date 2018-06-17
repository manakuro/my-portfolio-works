import * as React from 'react'
import { shallow } from 'enzyme'
import * as Layout from '@/components/Layout/Layout'
import * as Home from '@/components/Home/Home'

const propsData: Layout.LayoutProps = {
  works: [
    {
      id: 1,
      title: 'EC Website',
      description: `
      I’ve been a CMT for ten years now, and I have, literally and
      figuratively, held the pulse of a steaming cross-section of
      San Franciscans
      `,
      img: 'http://sample.jpg',
      component: 'WorkOne',
      languages: [1, 2],
    },
  ],
  workContentImg: 'http://sample.jpg',
  isShowOverlay: false,
  isShowWorksContent: false,
  isShowWorksContentAnimation: false,
  isExpandWorksContent: false,
  circleStyle: {
    top: 'calc(50% - 50px)',
    left: 'calc(50% - 50px)',
  },
  targetWork: null,
  languages: [],
  searchQuery: {
    languages: [1, 2],
  },
  isLoading: true,
  history: {
    push: jest.fn(),
  } as any,
  match: {
    params: {
      id: 1,
    },
  } as any,
  location: {
    search: {
      query: {
        languages: '1',
      },
    },
  } as any,

  updateSearchQuery: jest.fn(),
  fetchLanguages: jest.fn(),
}

describe('Layout', () => {
  let props: Layout.LayoutProps
  beforeEach(() => {
    props = { ...propsData }
  })

  it('should render component', () => {
    const wrapper = shallow(<Layout.Layout {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentWillMount', () => {
    let component: any
    beforeEach(() => {
      component = new Layout.Layout(props)
    })

    it('should call fetchLanguages', async () => {
      props.fetchLanguages = jest.fn()

      await component.componentWillMount()

      expect(props.fetchLanguages).toHaveBeenCalled()
    })
  })
})
