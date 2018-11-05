import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import ItemsShowContainer from 'scripts/views/containers/items/ItemsShowContainer'

describe('containers/Home', () => {
  let wrapper: ReactWrapper
  beforeEach(() => {
    wrapper = mount(<ItemsShowContainer id={1} />)
  })

  it('valid id', () => {
    expect(wrapper.prop('id')).toBe(1)
  })
})
