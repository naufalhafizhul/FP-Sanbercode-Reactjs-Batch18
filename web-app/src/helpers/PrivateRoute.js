import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Component } from 'react';
import { AppContext } from '../context/AppContext';

// class PrivateRoute extends Component {
//     render() {
//         const { component, ...rest } = this.props;
//         return (
//             <Route {...rest} render={(props) => (
//                 localStorage.getItem('isLogin') && localStorage.getItem('user') ?
//                     React.createElement(component, props)
//                     :
//                     <Redirect to={{
//                         pathname: '/',
//                     }} />
//             )} />
//         );
//     }
// }

const PrivateRoute = (props) => {
    const { component, ...rest } = props;
    const { loginState } = useContext(AppContext);

    const [login, setLogin] = loginState;

    return (
        <Route {...rest} render={(props) => (
            login === 1 || localStorage.getItem('isLogin') && localStorage.getItem('user') ?
                React.createElement(component, props)
                :
                <Redirect to={{
                    pathname: '/',
                }} />
        )} />
    );
}

export default PrivateRoute;