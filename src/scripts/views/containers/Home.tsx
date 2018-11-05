import { Action } from 'typescript-fsa'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import HomeContainer from 'scripts/views/containers/HomeContainer'

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
)(HomeContainer)
