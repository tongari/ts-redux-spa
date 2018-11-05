import * as React from 'react'
import styled from 'styled-components'
import HandIcon from 'resources/hand.svg'
import { spaceStyle } from 'styles/local/variables/space'

interface IProps {}
interface IState {}

export default class HomeContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {}
  }
  public render() {
    return (
      <section className="spec-home-container">
        <Title>
          <img src={HandIcon} width="30" />
          <i />
          <h1>HOME</h1>
        </Title>
      </section>
    )
  }
}

const Title = styled.section`
  display: flex;
  align-items: center;
  > img {
    margin-right: ${spaceStyle.XXS};
  }
  > i {
    width: 35px;
    height: 35px;
    display: inline-block;
    margin-right: ${spaceStyle.XXS};
    background-image: url(${HandIcon});
    background-repeat: no-repeat;
  }
`
