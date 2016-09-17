import * as React from 'react';
import { connect } from 'react-redux';

import Base from '../../components/base';
import Header from '../../components/header';
import Nav from '../../components/nav';
import MainSection from '../../components/main-section';
import Footer from '../../components/footer';


export class ArticleList extends React.Component {
    render() {
        return (
            <Base>
                <Header/>
                <Nav/>
                <MainSection/>
                <Footer/>
            </Base>
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
