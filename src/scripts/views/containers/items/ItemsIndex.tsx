import { Action } from 'typescript-fsa'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import ItemsIndexContainer from 'scripts/views/containers/items/ItemsIndexContainer'

interface IStateToProps {}

interface IDispatchToProps {}

const mapStateToProps = (state: any): IStateToProps => {
  return {}
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action<any>>
): IDispatchToProps => bindActionCreators({}, dispatch)

export default connect<IStateToProps, IDispatchToProps>(
  mapStateToProps,
  mapDispatchToProps
)(ItemsIndexContainer)
