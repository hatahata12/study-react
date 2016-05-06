import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

// クリックしたときにdispatch(setVisibilityFilter())

//connectの引数は、connect([mapStateToProps], [mapDispatchToProps])であるため、
//mapDispatchToPropsだけを使うときでも、mapStateToPropsが必要になります。
//またmapStateToPropsは、objectを返す関数でないとだめなので、とりあえずstateをそのまま返します。
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink