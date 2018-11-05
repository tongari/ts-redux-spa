import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import styled from 'styled-components'
import configStore, { history } from 'scripts/config/configStore'
import Header from 'scripts/views/containers/Header'
import Routes from 'scripts/views/containers/Routes'

const ContainerStyle = styled.div`
  padding: 30px;
`

ReactDOM.render(
  <Provider store={configStore()}>
    <ConnectedRouter history={history}>
      <>
        <Header />
        <ContainerStyle>
          <Routes />
        </ContainerStyle>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
