import * as React from 'react'

interface IProps {
  id: number
}
interface IState {}

export default class ItemsIndexContainer extends React.Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props)
    this.state = {}
  }
  public render() {
    const { id } = this.props
    return (
      <section className="spec-items-show-container">
        <h1>ITEM / {id}</h1>
      </section>
    )
  }
}
