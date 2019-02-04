import React, {Component} from "react";
import firebase from "firebase";
import marked from "marked";

class HelloWorld extends Component {
  /*
   mon template
  */
  render () {
    // en vrai la je peux faire plein de choses avant le return
    // comme définir un nom pour dire bonjour
    let welcomeName = this.state.user ? this.state.user.displayName : 'blaireau';
    let userCanSendMessage = this.state.user ? true : false; // operateur ternaire, on peut aussi l'utiliser en inline JSX
    return (
      <div className="hello">

        <h1>Bonjour {welcomeName} moi c Helloworld</h1>
        <button onClick={this.login}>login</button>
        <button onClick={this.logout}>logout</button>

        <ul>
          {this.state.tablo.map(item => (
            <li key={item.ts} dangerouslySetInnerHTML={{__html: marked(item.message)}}/>
          ))}
        </ul>

        <p>L'evenement submit du form est traité et on l'empeche de continuer son comportement par defaut </p>
        <p>l'input est lié de facon bi-directionnelle (bind) a this.state.message </p>
        <p>on bind les fonction a (this) pour qu'elles puissent acceder au scope du composant</p>
        <p>on utilise l'ordre d'évaluation de '&&' pour faire un 'if'</p>

        { userCanSendMessage &&
          <form onSubmit={this.handleMessageFormSubmit.bind(this)}>
            <label>
              texte
              <input type="text" value={this.state.value} onChange={this.handleMessageChange.bind(this)}/>
            </label>
            <label>
              fichier
              <input type="file"/>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        }


      </div>
    );
  }

  /*
   definition du constructeur
  */
  constructor (props) {
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
  login () {
    let googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    googleAuthProvider.addScope('https://www.googleapis.com/auth/plus.login')
    //firebase.auth().languageCode = 'fr'
    firebase.auth().signInWithPopup(googleAuthProvider)
  }

  logout () {
    firebase.auth().signOut()
  }

  handleMessageChange (event) {
    this.setState({message: event.target.value});
  }

  handleMessageFormSubmit (event) {
    event && event.preventDefault();
    if (this.state.user !== null) {
      let entry = {
        ts: new Date().getTime(),
        uid: this.state.user.uid,
        displayName: this.state.user.displayName,
        message: this.state.message.toString()
      }
      firebase.database().ref('messages/').push(entry, (error) => {
        if (error) {
          alert("dla merde")
        } else {
          // alert("yeah")
          this.state.message = '';
        }
      });
    }
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

    firebase.database().ref('messages/').on('value', snapshot => {
      if (snapshot.val() !== null) {
        this.setState({tablo: Object.values(snapshot.val())});
      }
    });

  }

}

export default HelloWorld;