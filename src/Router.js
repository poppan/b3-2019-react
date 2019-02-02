import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import firebase from 'firebase';
import Home from './views/Home';
import About from './views/About';
/*

  pour faire simple, les routes permettent d'envoyer sur les views
  La en vrai c'est crade, je devrais l'appeller ViewRouter ou un truc comme ca pour eviter les collisions avec des libs

*/
// on cree notre propre Route
// en prends les memes arguments/props que Route sauf que on rajoute un test
const RequiresAuthRoute = ({component: Component, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      firebase.auth().currentUser !== null // si le user est loggué
        ? <Component {...props} /> // on envoie le component demandé
        : <Redirect to='/' />} // sinon on redirige sur /
  />;


// J'utilise la syntaxe avec une définition de classe
// car je vais avoir besoin de m'accrocher aux fontions du lifecycle et de faire des traitements
// c'est <main /> (tag html) et pas <Main /> (component) car sinon React va essayer de trouver un composant Main

class Router extends Component {
  isLoggedUser () {
    return (firebase.auth().currentUser !== null)
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <RequiresAuthRoute exact path="/about" component={ About }/>
        </Switch>
      </main>
    )
  }
}


// Si j'ai juste besoin d'un Element avec un render simple Je peux utiliser la syntaxe de declaration DOM,
// Cela permet d'ecrire directement en JSX ce que React va render()
// c'est <main/> (tag html) et pas <Main> (component) car sinon React va essayer de trouver un composant Main
/*
const Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/Home" component={Home}/>
      <Route exact path="/about" component={About}/>
    </Switch>
  </main>
)
*/


export default Router;