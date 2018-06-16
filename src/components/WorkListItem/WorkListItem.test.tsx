import * as React from 'react'
import { shallow } from 'enzyme'
import * as WorkListItem from './WorkListItem'
import { WorkListItemPropsWithCompose } from '@/components/WorkListItem/WorkListItem'

const props: WorkListItemPropsWithCompose = {
  work: {
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
  updateTargetWork: jest.fn(),
  updateCircle: jest.fn(),
  languages: [
    { id: 1, name: 'Ruby on Rails', icon: 'rails' },
    { id: 2, name: 'React.js', icon: 'react' },
  ],
  history: {
    push: jest.fn(),
  } as any,
  handleClick: jest.fn(),
}

describe('WorkListItem', () => {
  it('should render', () => {
    const wrapper = shallow(<WorkListItem.WorkListItem {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
