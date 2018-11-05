import * as React from 'react'
import { IData, IPersonal, IPersonalMap } from 'scripts/models/AppModel'
import PersonalItem from 'scripts/views/components/PersonalItem'

interface IProps {
  addCount: (params: number) => void
  setData: (params: IData) => void
  setPersonalMap: (params: IPersonal) => void
  setPersonalsSecond: (params: number) => void
  sortPersonalsByName: () => void
  sortPersonalsByAge: () => void
  toggleDisplayModal: (params: boolean) => void
  count: number
  data: IData
  personals: IPersonal[]
  personalMap: IPersonalMap
  isModalShow: boolean
  isFetching: boolean
  isFetchingTest: boolean
  doFetchData: (keyword: string) => void
}
interface IState {}

export default class AppContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    // 基本、reduxではuiの一時的な状態を保持する以外ではなるべくstateはもたない
    this.state = {}
    this.setData = this.setData.bind(this)
    this.addCount = this.addCount.bind(this)
    this.setPersonalMap = this.setPersonalMap.bind(this)
    this.setPersonalsSecond = this.setPersonalsSecond.bind(this)
    this.sortPersonalsByName = this.sortPersonalsByName.bind(this)
    this.sortPersonalsByAge = this.sortPersonalsByAge.bind(this)
    this.toggleModalShow = this.toggleModalShow.bind(this)
    this.doFetchData = this.doFetchData.bind(this)
  }

  // react v16.3以降で「componentWillReceiveProps」が非推奨になったので
  // 代替として「getDerivedStateFromProps」を使う。
  // 差分を比較するためにstateをもつ必要がある
  public static getDerivedStateFromProps(
    nextProps: IProps,
    prevState: IState
  ): IState {
    if (nextProps.count !== (prevState as IProps).count) {
      console.log('nextProps.count！！！ : ', nextProps.count)
      console.log('prevState.count！！！ : ', (prevState as IProps).count)
      // 何かしらの処理などを挟む
      return { count: nextProps.count }
    }
    return prevState
  }

  private setData(): void {
    this.props.setData({ id: 1, name: 'tongari' })
  }

  private addCount(): void {
    this.props.addCount(1)
  }
  private setPersonalMap(): void {
    this.props.setPersonalMap({
      sex: 'male',
      age: 20,
    })
  }

  private setPersonalsSecond(): void {
    this.props.setPersonalsSecond(40)
  }

  private sortPersonalsByName(): void {
    this.props.sortPersonalsByName()
  }

  private sortPersonalsByAge(): void {
    this.props.sortPersonalsByAge()
  }

  private toggleModalShow(): void {
    this.props.toggleDisplayModal(!this.props.isModalShow)
  }

  private doFetchData(): void {
    this.props.doFetchData('react')
  }

  private renderPersonals(): JSX.Element[] | null {
    if (!this.props.personals) {
      return null
    }
    return this.props.personals.map((personal, index) => {
      return <PersonalItem key={index} personal={personal} />
    })
  }

  public render() {
    const {
      count,
      data,
      isModalShow,
      personalMap,
      isFetching,
      isFetchingTest,
    } = this.props
    return (
      <section className="spec-app-container">
        <h1>App</h1>
        <p>{count}</p>
        <p>data.name: {data.name}</p>
        <p>isModalShow: {isModalShow.toString()}</p>
        <p>isFetching: {isFetching.toString()}</p>
        <p>isFetchingTest: {isFetchingTest.toString()}</p>
        <p>tongari age : {personalMap.tongari.age}</p>
        <ul>{this.renderPersonals()}</ul>
        <button onClick={this.addCount}>addCount</button>
        <button onClick={this.setData}>setData</button>
        <button onClick={this.setPersonalMap}>setPersonalMap</button>
        <button onClick={this.setPersonalsSecond}>setPersonalsSecond</button>
        <button onClick={this.sortPersonalsByName}>sortPersonalsByName</button>
        <button onClick={this.sortPersonalsByAge}>sortPersonalsByAge</button>
        <button onClick={this.toggleModalShow}>toggle modal show</button>
        <button onClick={this.doFetchData}>doFetchData</button>
      </section>
    )
  }
}
