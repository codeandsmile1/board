import React from 'react';
import {AuthConsumer} from './AuthContext';

const Header = () => (
    <header>
        <AuthConsumer>
            {({user, logOut}) => (
                <React.Fragment>
                    <div className="user-area">
                    {user.id? (
                    <React.Fragment>    
                    <small>User: {user.email}</small>
                    <button onClick={(e) => logOut(e)}>Log Out</button>
                    </React.Fragment>
                    ) :(<small>Please sign in</small>)}
                    </div>
                </React.Fragment>
            )}
        </AuthConsumer>
    </header>
)

export default Header;