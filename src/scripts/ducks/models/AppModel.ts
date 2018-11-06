import * as R from 'ramda'
import BaseModel from 'scripts/ducks/models/_BaseModel'

export interface IData {
  readonly id: number
  readonly name: string
}

export interface IPersonal {
  readonly name?: string
  readonly sex: string
  readonly age: number
}

export interface IPersonalMap {
  readonly tongari: IPersonal
  readonly tabe: IPersonal
}

interface IResultApi {
  readonly id: number
  readonly body: string
  readonly postId: number
}

export interface IAppModel {
  readonly isFetching: boolean
  readonly isFetchingTest: boolean
  readonly count: number
  readonly data: IData
  readonly personalMap: IPersonalMap
  readonly personals: IPersonal[]
  readonly resultApi: IResultApi[]
}

type TAppModelKey = keyof IAppModel
type TPersonalMapKey = keyof IPersonalMap
type TPersonalKey = keyof IPersonal

export default class AppModel extends BaseModel {
  protected createInitialState() {
    const initialState: IAppModel = {
      isFetching: false,
      isFetchingTest: false,
      count: 0,
      data: {
        id: 0,
        name: 'huga',
      },
      personalMap: {
        tongari: {
          sex: 'male',
          age: 39,
        },
        tabe: {
          sex: 'male',
          age: 26,
        },
      },
      personals: [
        {
          name: 'tongari',
          sex: 'male',
          age: 39,
        },
        {
          name: 'rikuson',
          sex: 'male',
          age: 26,
        },
        {
          name: 'kawaoka',
          sex: 'male',
          age: 28,
        },
      ],
      resultApi: [],
    }
    return initialState
  }

  public addCount(state: IAppModel, params: number) {
    let result = R.assoc<number, TAppModelKey>('count', state.count + params)(
      state
    )
    result = this.setFetching(result, true)
    result = R.assoc<boolean, TAppModelKey>('isFetchingTest', true)(result)
    return result
  }
  public setData(state: IAppModel, params: IData) {
    return R.assoc<IData, TAppModelKey>('data', params)(state)
  }

  public setPersonalMap(state: IAppModel, params: IPersonal) {
    const path: [TAppModelKey, TPersonalMapKey, TPersonalKey] = [
      'personalMap',
      'tongari',
      'age',
    ]
    return R.assocPath<number, [TAppModelKey, TPersonalMapKey, TPersonalKey]>(
      path,
      params.age
    )(state as any)

    // これでも可能だがtypescriptの恩恵はない
    // const clone: any = R.clone(state)
    // clone.personalMap.tongari.age = params.age
    // return clone as IAppModel
  }

  public setPersonalsSecond(state: IAppModel, params: number) {
    const path: [TAppModelKey, number, TPersonalKey] = ['personals', 1, 'age']
    return R.assocPath<number, [TAppModelKey, number, TPersonalKey]>(
      path,
      params
    )(state as any)
  }

  public sortPersonalsByName(state: IAppModel) {
    const sortByName = R.sortBy(
      R.compose(
        R.toLower,
        R.prop<TPersonalKey>('name')
      )
    )
    return R.assoc<IPersonal[], TAppModelKey>(
      'personals',
      sortByName(state.personals)
    )(state)
  }

  public sortPersonalsByAge(state: IAppModel) {
    const sortByAge = R.sortBy(R.prop<TPersonalKey>('age'))
    return R.assoc<IPersonal[], TAppModelKey>(
      'personals',
      sortByAge(state.personals)
    )(state)
  }

  public fetchData(state: IAppModel) {
    return this.setFetching(state, true)
  }

  public fetchDataSuccess(state: IAppModel, params: IResultApi[]) {
    let result = R.assoc<IResultApi[], TAppModelKey>('resultApi', params)(state)
    result = this.setFetching(result, false)
    return result
  }

  private setFetching(state: IAppModel, params: boolean): any {
    return R.assoc<boolean, TAppModelKey>('isFetching', params)(state)
  }
}
