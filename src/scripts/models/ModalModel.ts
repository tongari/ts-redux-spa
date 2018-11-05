import * as R from 'ramda'
import BaseModel from 'scripts/models/_BaseModel'

export interface IModalModel {
  readonly isShow: boolean
}

type TModalModelKey = keyof IModalModel

export default class ModalModel extends BaseModel {
  protected createInitialState() {
    const initialState: IModalModel = {
      isShow: false,
    }
    return initialState
  }

  public toggleDisplayModal(state: IModalModel, params: boolean) {
    return R.assoc<boolean, TModalModelKey>('isShow', params)(state)
  }
}
