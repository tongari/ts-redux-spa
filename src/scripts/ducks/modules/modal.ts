import actionCreatorFactory from 'typescript-fsa'
const actionCreator = actionCreatorFactory()
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import ModalModel, { IModalModel } from 'scripts/models/ModalModel'

// actions
export const toggleDisplayModal = actionCreator<boolean>('TOGGLE_DISPLAY_MODAL')

// reducer
const model: ModalModel = new ModalModel()
export const modal = reducerWithInitialState(model.getInitialState())
  .case(toggleDisplayModal, (state: IModalModel, payload: boolean) => {
    return model.toggleDisplayModal(state, payload)
  })
  .build()
