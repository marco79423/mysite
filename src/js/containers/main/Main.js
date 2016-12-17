import * as React from 'react';
import {connect} from 'react-redux';

import Counter from '../../components/counter';
import main from '../../ducks/main';


export class Main extends React.Component {
  render() {
    const {value, onClicked} = this.props;
    return (
      <div>
        <Counter value={value} onClicked={onClicked}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    value: state.getIn(['main', 'value'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClicked: () => dispatch(main.actions.addValue())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);