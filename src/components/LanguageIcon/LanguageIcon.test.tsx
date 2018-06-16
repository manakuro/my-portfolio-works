import * as React from 'react'
import { shallow } from 'enzyme'
import * as LanguageIcon from './LanguageIcon'
import { LanguageIconProps } from '@/components/LanguageIcon/LanguageIcon'

const props: LanguageIconProps = {
  language: { id: 1, name: 'Ruby on Rails', icon: 'rails' },
}

describe('LanguageIcon', () => {
  it('should render', () => {
    const wrapper = shallow(<LanguageIcon.LanguageIcon {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
