import { Action } from 'typescript-fsa'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import ItemsShowContainer from 'scripts/views/containers/items/ItemsShowContainer'

interface IStateToProps {
  id: number
}

interface IDispatchToProps {}

const mapStateToProps = (state: any, ownProps: any): IStateToProps => {
  return {
    id: ownProps.match.params.id,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action<any>>
): IDispatchToProps => bindActionCreators({}, dispatch)

export default connect<IStateToProps, IDispatchToProps>(
  mapStateToProps,
  mapDispatchToProps
)(ItemsShowContainer)
