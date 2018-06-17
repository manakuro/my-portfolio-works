import * as React from 'react'
import { shallow } from 'enzyme'
import * as WorkDetail from './WorkDetail'
import {
  WorkDetailProps,
  WorkDetailWithHandlers,
} from '@/components/WorkDetail/WorkDetail'

const propsData: WorkDetailProps & WorkDetailWithHandlers = {
  toggleOverlay: jest.fn(),
  toggleWorksContent: jest.fn(),
  toggleWorksContentAnimation: jest.fn(),
  toggleWorksContentExpand: jest.fn(),
  updateCircle: jest.fn(),
  updateWorkContentImg: jest.fn(),
  fetchWork: jest.fn(),

  workContentImg: 'http://sample.jpg',
  isShowOverlay: false,
  isShowWorksContent: false,
  isExpandWorksContent: false,
  isShowWorksContentAnimation: false,

  circleStyle: {
    top: 'calc(50% - 50px)',
    left: 'calc(50% - 50px)',
  },

  targetWork: {
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
  history: {
    push: jest.fn(),
    goBack: jest.fn(),
    location: {},
  } as any,
  match: {
    params: {
      id: 1,
    },
  } as any,
  expandWorksContent: jest.fn(),
  hideOverlay: jest.fn(),
  onEnteredShowWorksContent: jest.fn(),
  showWorksContent: jest.fn(),
  onExitedOverlay: jest.fn(),
}

describe('WorkDetail', () => {
  let props: WorkDetailProps & WorkDetailWithHandlers
  beforeEach(() => {
    props = { ...propsData }
  })

  it('should render component', () => {
    const wrapper = shallow(<WorkDetail.WorkDetailComponent {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('WorkDetail class', () => {
    let wrapper: any

    it('should render enhanced component', () => {
      wrapper = shallow(<WorkDetail.default {...props} />)
      expect(wrapper).toMatchSnapshot()
    })

    describe('componentDidMount', () => {
      it('should show overlay', async () => {
        wrapper = await shallow(<WorkDetail.default {...props} />)

        expect(props.toggleOverlay).toHaveBeenCalledWith(true)
        expect(props.fetchWork).toHaveBeenCalledWith(1)
      })
      it('should go back to top page', async () => {
        props.targetWork = null

        wrapper = await shallow(<WorkDetail.default {...props} />)

        expect(props.toggleOverlay).toHaveBeenCalledWith(true)
        expect(props.fetchWork).toHaveBeenCalledWith(1)
        expect(props.history.push).toHaveBeenCalledWith('/')
      })
    })
  })

  describe('renderWorkContentImgAnimation', () => {
    it('should render work content image with animation', () => {
      props.isShowWorksContent = true
      props.isExpandWorksContent = false
      const result: any = WorkDetail.renderWorkContentImgAnimation(props)

      expect(shallow(result)).toMatchSnapshot()
    })
    it('should return null', () => {
      props.isShowWorksContent = false
      props.isExpandWorksContent = true
      const result: any = WorkDetail.renderWorkContentImgAnimation(props)

      expect(result).toEqual(null)
    })
  })

  describe('goBack', () => {
    it('should go back', () => {
      props.history.location.state = {
        fromWorkListItem: true,
      }

      WorkDetail.goBack(props)
      expect(props.history.goBack).toHaveBeenCalled()
    })

    it('should go to top when user come from other url', () => {
      props.history.location.state = null

      WorkDetail.goBack(props)
      expect(props.history.push).toHaveBeenCalledWith('/')
    })
  })

  describe('hideOverlay', () => {
    it('should hide work content', () => {
      WorkDetail.hideOverlay(props)

      expect(props.toggleWorksContent).toHaveBeenCalledWith(false)
      expect(props.toggleOverlay).toHaveBeenCalledWith(false)
      expect(props.toggleWorksContentAnimation).toHaveBeenCalledWith(false)
      expect(props.toggleWorksContentExpand).toHaveBeenCalledWith(false)
    })
  })

  describe('onExitedOverlay', () => {
    it('should initialize circle style and go back to home', () => {
      WorkDetail.onExitedOverlay(props)

      expect(props.updateCircle).toHaveBeenCalledWith({
        top: '0px',
        left: '-1000px',
      })
    })
  })

  describe('showWorksContent', () => {
    it('should show work content', () => {
      WorkDetail.showWorksContent(props)

      expect(props.toggleWorksContent).toHaveBeenCalledWith(true)
    })
  })

  describe('onEnteredShowWorksContent', () => {
    it('should show work content animation', () => {
      WorkDetail.onEnteredShowWorksContent(props)

      expect(props.toggleWorksContentAnimation).toHaveBeenCalledWith(true)
    })
  })

  describe('expandWorksContent', () => {
    it('should expand work content', () => {
      WorkDetail.expandWorksContent(props)

      expect(props.toggleWorksContentExpand).toHaveBeenCalledWith(
        !props.isExpandWorksContent,
      )
    })
  })
})
