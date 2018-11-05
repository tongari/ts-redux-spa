import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configStore, { history } from 'scripts/config/configStore'
import { mount, ReactWrapper } from 'enzyme'
import Routes from 'scripts/views/containers/Routes'

describe('containers/Home', () => {
  describe('routes', () => {
    // const rootDiv = document.createElement('div')
    const store = configStore()
    let wrapper: ReactWrapper
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      )
    })

    describe('routing => / ', () => {
      it('valid container', () => {
        history.push('/')
        expect(wrapper.render().hasClass('spec-home-container')).toBeTruthy()
      })
      it('invalid container', () => {
        history.push('/app')
        expect(wrapper.render().hasClass('spec-home-container')).toBeFalsy()
      })
    })

    describe('routing => app ', () => {
      it('valid container', () => {
        history.push('/app')
        expect(wrapper.render().hasClass('spec-app-container')).toBeTruthy()
      })
      it('invalid container', () => {
        history.push('/')
        expect(wrapper.render().hasClass('spec-app-container')).toBeFalsy()
      })
    })

    describe('routing => items ', () => {
      it('valid container', () => {
        history.push('/items')
        expect(
          wrapper.render().hasClass('spec-items-index-container')
        ).toBeTruthy()
      })
      it('invalid container', () => {
        history.push('/')
        expect(
          wrapper.render().hasClass('spec-items-index-container')
        ).toBeFalsy()
      })
    })

    describe('routing => /items/:id ', () => {
      it('valid container', () => {
        history.push('/items/1')
        expect(
          wrapper.render().hasClass('spec-items-show-container')
        ).toBeTruthy()
      })
      it('invalid container', () => {
        history.push('/')
        expect(
          wrapper.render().hasClass('spec-items-show-container')
        ).toBeFalsy()
      })
    })
  })
})
