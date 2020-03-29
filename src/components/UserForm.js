import React from 'react';
import {AuthConsumer} from './AuthContext';


class UserForm extends React.Component {
    emailInput = React.createRef();
    passwordInput = React.createRef();

    render() {
        return (
           <AuthConsumer>
               {({signUp}) => (
                    <React.Fragment>
                    <div className="sign-up-wrapper">
                   <h2>Sign in or create Account</h2>
                   <form className="sign-up-form">
                   <div>
                       <input type="email" placeholder="Email" name="email" ref={this.emailInput}/>
                   </div>
                   <div>
                       <input type="password" placeholder="Password" name="password" ref={this.passwordInput}/>
                   </div>
                   </form>
                   <div>
                       <button onClick={(e) => signUp(
                           this.emailInput.current.value,
                           this.passwordInput.current.value,
                           e
                       )}>Sign up</button>
                   </div>
                   </div>   
                   </React.Fragment>
               )}
           </AuthConsumer>
        )
    }
}

export default UserForm;