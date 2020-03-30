import React from 'react';
import {firebaseAuth} from '../firebase';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    user: {}
  }; 

  componentWillMount() {
   
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
         user: {
          id: user.uid,
          email: user.email
        }})
        console.log(user)
      } else {
        // No user is signed in.
        this.setState({user: {}});
      }
    })
  }


  signUp = async (email, password, e) => {
    try {
      e.preventDefault();
      await firebaseAuth.createUserWithEmailAndPassword(email, password);
    } catch(error) { 
      console.error("Error authentication: ", error);
    }
  }

  logIn = async (email, password, e) => {
    try {
      e.preventDefault();
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      console.log("Log in")
    } catch(error) {
      console.error("Error loging in: ", error);
    }
  }

  logOut = async (e) => { 
    try {
     // e.preventDefault();
     await firebaseAuth.signOut();
     console.log('Log out')
     this.setState({user: {}});
    } catch(error) {
      console.error("Error loging out: ", error);
    }
  }

  render() {
    return ( 
    <AuthContext.Provider value = {{
       user: this.state.user,
       signUp: this.signUp, 
       logIn:this.logIn, 
       logOut: this.logOut}} >
       {this.props.children}
    </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer}