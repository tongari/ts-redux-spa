import * as React from 'react'

interface IProps {}
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
    return (
      <section className="spec-items-index-container">
        <h1>ITEM</h1>
      </section>
    )
  }
}
