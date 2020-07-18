import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import AppToolbar from "./components/UI/Toolbar/Toolbar";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import {ToastContainer} from 'react-toastify';
import Container from "@material-ui/core/Container";
import './App.css';
import {useSelector} from "react-redux";
import Places from "./containers/Recipe/Places";
import AddPlaces from "./containers/AddRecipe/AddPlaces";
import Placeses from "./containers/Recipes/Placeses";

const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);

function App() {
    const user = useSelector(state => state.users.user);
    return (
        <div className="fonts">
            <AppToolbar/>
            <Container>
                <Switch>
                    <Route path="/recipe/:id" exact component={Places}/>
                    <Route path="/addRecipe" exact component={AddPlaces}/>
                    <Route path="/" exact component={Placeses}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                </Switch>
            </Container>
            <ToastContainer/>
        </div>
    );
}


export default App;

