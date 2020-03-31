import React from 'react';
import {AuthConsumer} from './AuthContext';

class UserForm extends React.Component {
    emailInput = React.createRef();
    passwordInput = React.createRef();

    redirect = (userId) => { 
        this.props.history.push(`/${userId}/boards`);
    }

   showPassword = () => {
       const password = document.getElementsByName("password");
        
       if(password[0].type === 'password') {
           password[0].type = "text";
       } else {
           password[0].type = "password";
       }
   }

    render() {
        return (
           <AuthConsumer>
               {({signUp, logIn, user, authMessage}) => (
                    <React.Fragment>
                        {!user.id ?  (
                    <div className="sign-up-wrapper">
                   <h2>Sign in or create Account</h2>
               {authMessage ? (<span>{authMessage}</span>): ''}

                   <form className="sign-up-form">
                   <div>
                       <input type="email" placeholder="Email" name="email" ref={this.emailInput}/>
                   </div>
                   <div>
                       <input type="password" placeholder="Password" name="password" ref={this.passwordInput}/>                                 
                   </div>
                   <div>
                   <label>Show Password</label>
                       <input type="checkbox" onClick={this.showPassword}/>  
                   </div>
                   </form>
                   <div>
                       <button onClick={(e) => logIn(
                           this.emailInput.current.value,
                           this.passwordInput.current.value,
                           e
                       )}>Log in</button>
                       <button onClick={(e) => signUp(
                           this.emailInput.current.value,
                           this.passwordInput.current.value,
                           e
                       )}>Sign up</button>
                   </div>
                   </div>   
                   ) : (<button onClick={() => this.redirect(user.id)}>Go to my boards</button>)}
                   </React.Fragment>
               )}
           </AuthConsumer>
        )
    }
}

export default UserForm;