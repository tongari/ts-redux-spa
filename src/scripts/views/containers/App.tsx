import { Action } from 'typescript-fsa'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from 'scripts/ducks/modules/app'
import * as ModalActions from 'scripts/ducks/modules/modal'
import AppContainer from 'scripts/views/containers/AppContainer'
import {
  IAppModel,
  IData,
  IPersonal,
  IPersonalMap,
} from 'scripts/models/AppModel'
import { IModalModel } from 'scripts/models/ModalModel'

interface IStateToProps {
  count: number
  data: IData
  personals: IPersonal[]
  personalMap: IPersonalMap
  isModalShow: boolean
  isFetching: boolean
  isFetchingTest: boolean
}

interface IDispatchToProps {
  addCount: (params: number) => void
  setData: (params: IData) => void
  setPersonalMap: (params: IPersonal) => void
  setPersonalsSecond: (params: number) => void
  sortPersonalsByName: () => void
  sortPersonalsByAge: () => void
  toggleDisplayModal: (params: boolean) => void
  doFetchData: (keyword: string) => void
}

const mapStateToProps = (state: any): IStateToProps => {
  const appState: IAppModel = state.app
  const modalState: IModalModel = state.modal
  return {
    count: appState.count,
    data: appState.data,
    personals: appState.personals,
    personalMap: appState.personalMap,
    isFetching: appState.isFetching,
    isFetchingTest: appState.isFetchingTest,
    isModalShow: modalState.isShow,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action<any>>
): IDispatchToProps =>
  bindActionCreators(
    {
      addCount: AppActions.addCount,
      setData: AppActions.setData,
      setPersonalMap: AppActions.setPersonalMap,
      setPersonalsSecond: AppActions.setPersonalsSecond,
      sortPersonalsByName: AppActions.sortPersonalsByName,
      sortPersonalsByAge: AppActions.sortPersonalsByAge,
      toggleDisplayModal: ModalActions.toggleDisplayModal,
      doFetchData: AppActions.doFetchData,
    },
    dispatch
  )

export default connect<IStateToProps, IDispatchToProps>(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)
