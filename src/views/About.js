import { Component } from 'react';
import firebase from 'firebase';

class About extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null //This is what our data will eventually be loaded into
    };
    // je pourrais mettre le redirect la mais c'est pas vraiment le role d'un contructeur
    // et la ca marche parce que firebase gere son propre etat
    // !firebase.auth().currentUser && this.props.history.push('/');
  }

  // la c'est plutot bien
  // le lifecycle de mise a dispo React c'est
  // constructor -> componentWillMount -> Render -> ComponentDidMount -> Après on s'en bat
  // la on fait un truc con, si on arrive sur la page pas loggué ca nous redirige en utilisant les props AVANT le render
  componentWillMount () {
    console.log('currentUser :', firebase.auth().currentUser);
    !firebase.auth().currentUser && this.props.history.push('/');
  }

  render () {
    return(
      '(About) normalement je te TEJ si t\'es pas loggué'
    )
  }
}

export default About;