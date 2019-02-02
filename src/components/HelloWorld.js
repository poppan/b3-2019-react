import React, { Component} from "react";
import firebase from "firebase";

class HelloWorld extends Component {
/*
 mon template
*/
  render () {
    // en vrai la je peux faire plein de choses avant le return
    return (
      <div className="hello">
        <h1>Bonjour { this.state.user ? this.state.user.displayName : 'blaireau' } moi c Helloworld</h1>
        <button onClick={ this.login }>login</button>
        <button onClick={ this.logout }>logout</button>
      </div>
    );
  }

/*
 definition du constructeur
*/
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      tablo: [],
      message: ''
    };
  }

/*
 functions locales
*/
  login(){
    let googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    googleAuthProvider.addScope('https://www.googleapis.com/auth/plus.login')
    //firebase.auth().languageCode = 'fr'
    firebase.auth().signInWithPopup(googleAuthProvider)
  }
  logout(){
    firebase.auth().signOut()
  }

/*
  hook lifecycle
*/

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({user : user})
      } else {
        // No user is signed in.
        this.setState({user : null})
      }
    });
  }

}
export default HelloWorld;