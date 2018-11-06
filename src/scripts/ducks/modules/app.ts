import { Dispatch } from 'redux'
import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import AppModel, {
  IAppModel,
  IData,
  IPersonal,
} from 'scripts/ducks/models/AppModel'
import * as webApiUtils from 'scripts/ducks/webApiUtils/app'
import * as modalActions from 'scripts/ducks/modules/modal'
const actionCreator = actionCreatorFactory()

// actions
export const addCount = actionCreator<number>('APP_ADD_COUNT')
export const setData = actionCreator<IData>('APP_SET_DATA')
export const setPersonalMap = actionCreator<IPersonal>('APP_SET_PERSONAL_MAP')
export const setPersonalsSecond = actionCreator<number>(
  'APP_SET_PERSONALS_SECOND'
)
export const sortPersonalsByName = actionCreator<void>(
  'APP_SORT_PERSONALS_BY_NAME'
)
export const sortPersonalsByAge = actionCreator<void>(
  'APP_SORT_PERSONALS_BY_AGE'
)
export const fetchData = actionCreator<void>('APP_FETCH_DATA')
// middleware（httpRequestMiddleware）のほうで自動的にdispatch
export const fetchDataSuccess = actionCreator<any>('APP_FETCH_DATA_SUCCESS')
// middleware（httpRequestMiddleware）のほうで自動的にdispatch
export const fetchDataFailure = actionCreator<void>('APP_FETCH_DATA_FAILURE')
export const doFetchData = (keyword: string) => {
  return (dispatch: Dispatch<any>, getState: () => any) => {
    // 単純にAPIにつなげるだけ（こっちのぼうが通常使うはず）
    // return dispatch(
    //   webApiUtils.getYoutubeVideo({
    //     type: fetchData.type,
    //     keyword,
    //   })
    // )
    return (async () => {
      await new Promise(resolve => {
        dispatch(modalActions.toggleDisplayModal(true))
        resolve()
      })
      await new Promise((resolve, reject) => {
        return dispatch(
          webApiUtils.getYoutubeVideo({
            type: fetchData.type,
            keyword,
            // 基本あまりつかわない想定（こんな感じで非同期を連続で使うときなどでresolveするときなど）
            success: () => {
              console.log('success call')
              resolve()
            },
            // 基本あまりつかわない想定
            failure: () => {
              console.log('failure call')
              reject()
            },
          })
        )
      })
      await new Promise(resolve => {
        dispatch(modalActions.toggleDisplayModal(false))
        resolve()
      })
    })()
  }
}

// reducer
const model: AppModel = new AppModel()
export const app = reducerWithInitialState(model.getInitialState())
  .case(addCount, (state: IAppModel, payload: number) => {
    return model.addCount(state, payload)
  })
  .case(setData, (state: IAppModel, payload: IData) => {
    return model.setData(state, payload)
  })
  .case(setPersonalMap, (state: IAppModel, payload: IPersonal) => {
    return model.setPersonalMap(state, payload)
  })
  .case(setPersonalsSecond, (state: IAppModel, payload: number) => {
    return model.setPersonalsSecond(state, payload)
  })
  .case(sortPersonalsByName, (state: IAppModel) => {
    return model.sortPersonalsByName(state)
  })
  .case(sortPersonalsByAge, (state: IAppModel) => {
    return model.sortPersonalsByAge(state)
  })
  .case(fetchData, (state: IAppModel) => {
    console.log('fetchData!!!!!!!!!')
    return model.fetchData(state)
  })
  .case(fetchDataSuccess, (state: IAppModel, payload: any) => {
    console.log('fetchDataSuccess : ', payload.data)
    return model.fetchDataSuccess(state, payload.data)
  })
  .case(fetchDataFailure, (state: IAppModel) => {
    console.log('fetchDataFailure')
    return state
  })
  .build()
export default app
