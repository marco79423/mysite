import * as React from 'react';
import { connect } from 'react-redux';

import Base from '../../components/base';


export class ArticleList extends React.Component {
    render() {
        return (
            <div>
                <Base/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
