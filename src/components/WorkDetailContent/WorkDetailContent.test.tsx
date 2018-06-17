import * as React from 'react'
import { shallow } from 'enzyme'
import * as WorkDetailContent from '@/components/WorkDetailContent/WorkDetailContent'

const propsData: WorkDetailContent.WorkDetailContentProps &
  WorkDetailContent.WorkDetailContentWithHandlers = {
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
  updateWorkContentImg: jest.fn(),
  handleIntersection: jest.fn(),
}

describe('WorkDetailContent', () => {
  let props: WorkDetailContent.WorkDetailContentProps &
    WorkDetailContent.WorkDetailContentWithHandlers
  beforeEach(() => {
    props = { ...propsData }
  })

  let wrapper

  it('should render', () => {
    wrapper = shallow(
      <WorkDetailContent.WorkDetailContentComponent {...props} />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should return null when there is no target component', () => {
    props.targetWork = null

    wrapper = shallow(
      <WorkDetailContent.WorkDetailContentComponent {...props} />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('WorkDetailContent Class', () => {
    it('should render enhanced component', () => {
      wrapper = shallow(<WorkDetailContent.default {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('handleIntersection', () => {
    it('should call updateWorkContentImg', () => {
      const entry: any = {
        isIntersecting: true,
        target: {
          getAttribute: jest.fn(() => ({ src: 'src!' })),
        },
      }
      props.updateWorkContentImg = jest.fn()

      WorkDetailContent.handleIntersection(entry, props)

      expect(props.updateWorkContentImg).toHaveBeenCalledWith({ src: 'src!' })
    })

    it('should NOT call updateWorkContentImg when there is no src', () => {
      const entry: any = {
        isIntersecting: true,
        target: {
          getAttribute: jest.fn(() => null),
        },
      }
      props.updateWorkContentImg = jest.fn()

      WorkDetailContent.handleIntersection(entry, props)

      expect(props.updateWorkContentImg).not.toHaveBeenCalled()
    })

    it('should NOT call updateWorkContentImg when isIntersecting is false', () => {
      const entry: any = {
        isIntersecting: false,
        target: {
          getAttribute: jest.fn(() => null),
        },
      }
      props.updateWorkContentImg = jest.fn()

      WorkDetailContent.handleIntersection(entry, props)

      expect(props.updateWorkContentImg).not.toHaveBeenCalled()
    })
  })
})
