import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { fontSizeStyle } from 'styles/local/variables/fontSize'
import { spaceStyle } from 'styles/local/variables/space'

const Header: React.SFC = () => {
  return (
    <Nav>
      <Anchor to={'/'}>HOME</Anchor>
      <span> | </span>
      <Anchor to={'/app'}>APP</Anchor>
      <span> | </span>
      <Anchor to={'/items'}>ITEMS</Anchor>
      <span> | </span>
      <Anchor to={'/items/1'}>ITEM / 1</Anchor>
      <span> | </span>
      <Anchor to={'/items/2'}>ITEM / 2</Anchor>
    </Nav>
  )
}

export default Header

const Nav = styled.nav`
  margin: ${spaceStyle.M};
  padding: ${spaceStyle.S};
`

const Anchor = styled(Link)`
  opacity: 0.7;
  font-weight: bold;
  font-size: ${fontSizeStyle.XXL};
  transition: color 0.3s ease;
  &:hover {
    color: #440044;
  }
`
