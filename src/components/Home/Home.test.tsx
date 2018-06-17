import * as React from 'react'
import { shallow } from 'enzyme'
import * as Home from '@/components/Home/Home'

const propsData: Home.HomeProps = {
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

  toggleOverlay: jest.fn(),
  toggleWorksContent: jest.fn(),
  toggleWorksContentAnimation: jest.fn(),
  toggleWorksContentExpand: jest.fn(),
  updateCircle: jest.fn(),
  updateWorkContentImg: jest.fn(),
  updateTargetWork: jest.fn(),
  updateSearchQuery: jest.fn(),
  fetchWorks: jest.fn(),
  fetchWork: jest.fn(),
}

describe('Home', () => {
  let props: Home.HomeProps
  beforeEach(() => {
    props = { ...propsData }
  })

  it('should render component', () => {
    const wrapper = shallow(<Home.Home {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentWillMount', () => {
    let component: any
    beforeEach(() => {
      component = new Home.Home(props)
      component.mergeQuery = jest.fn()
    })

    it('should call', async () => {
      await component.componentWillMount()

      expect(props.fetchWorks).toHaveBeenCalled()
      expect(component.mergeQuery).toHaveBeenCalled()
    })
  })

  describe('componentDidUpdate', () => {
    let component: any
    beforeEach(() => {
      component = new Home.Home(props)
    })

    it('should call fetchWorks when searchQuery changes', async () => {
      const prevProps = {
        searchQuery: {
          languages: [1],
        },
      }

      component.props.searchQuery = {
        languages: [1, 2],
      }

      await component.componentDidUpdate(prevProps)

      expect(props.fetchWorks).toHaveBeenCalled()
    })
  })

  describe('mergeQuery', () => {
    let component: any
    beforeEach(() => {
      component = new Home.Home(props)
    })

    it('should update search query', async () => {
      props.location.search = '?languages=1&languages=2'

      await component.mergeQuery()

      expect(props.updateSearchQuery).toHaveBeenCalledWith({
        languages: [1, 2],
      })
    })
  })
})
