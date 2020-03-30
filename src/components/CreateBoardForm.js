import React from 'react';
import PropTypes from 'prop-types';
import {AuthConsumer} from '../components/AuthContext';

class CreateBoardForm extends React.Component {
    state = {
        title: '',
        background: "blue"
    } 
   
    handleSubmit = (e, userId) => {
      e.preventDefault();
     
      const board =  {
          title: this.state.title,
          background: this.state.background,
          createdAt: new Date(),
          user: userId
      }
      console.log(board);
      if(board.title && board.background && board.user) { 
        this.props.createNewBoard(board);
      }
    }

    render() {
       return (
         <AuthConsumer>
           {({user}) => (
           <form  onSubmit={(e) => this.handleSubmit(e, user.id)} className="create-board-wrapper">
           <input type="text" 
           name="name" 
           placeholder="Board name"
           onChange={(e) => this.setState({title: e.target.value})}
           />
           <select 
            onChange={e => this.setState({background: e.target.value})}
            name="background">
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="pink">Pink</option>
           </select>
           <button type="submit">Create New Board</button>
           </form>
          )}    
           </AuthConsumer>
       )
    }
}

CreateBoardForm.propTypes =  {
    createNewBoard: PropTypes.func.isRequired
}

export default CreateBoardForm