import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PrivateRoute from '../../../helpers/PrivateRoute';
import Login from '../../../pages/Login/Login';
import Movies from '../../../pages/Movies/Movies';
import MoviesDetail from '../../../pages/Movies/MoviesDetail';
import MoviesForm from '../../../pages/Movies/MoviesForm';
import MoviesTable from '../../../pages/Movies/MoviesTable';
import Register from '../../../pages/Register/Register';
import Games from '../../../pages/Games/Games';
import GamesDetail from '../../../pages/Games/GamesDetail';
import GamesForm from '../../../pages/Games/GamesForm';
import GamesTable from '../../../pages/Games/GamesTable';
import ChangePass from '../../../pages/ChangePass/ChangePass';
import LayoutMenu from '../LayoutMenu/LayoutMenu';

const Routes = () => {

    return (

        <Switch>
            <Route exact path='/'>
                <Login />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
            <PrivateRoute path='/change-password' component={ChangePass} />
            <Route path='/movies' component={Movies} />
            <PrivateRoute path='/movies-add' component={MoviesForm} />
            <PrivateRoute path='/movies-table' component={MoviesTable} />
            <Route exact path='/movies-detail/:id' component={MoviesDetail} />
            <PrivateRoute path='/movies-edit/:id' component={MoviesForm} />
            <Route path='/games' component={Games} />
            <PrivateRoute path='/games-add' component={GamesForm} />
            <PrivateRoute path='/games-table' component={GamesTable} />
            <Route exact path='/games-detail/:id' component={GamesDetail} />
            <PrivateRoute path='/games-edit/:id' component={GamesForm} />

        </Switch>
    );
}

export default Routes;