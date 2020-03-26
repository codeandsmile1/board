import React from 'react';
import PropTypes from 'prop-types';

class CreateBoardForm extends React.Component {
    state = {
        title: '',
        background: "blue"
    } 
   
    handleSubmit = (e) => {
      e.preventDefault();
      const board =  {
          title: this.state.title,
          background: this.state.background,
          createdAt: new Date(),
          user: 'user123'
      }

      if(board.title && board.background) { 
        this.props.createNewBoard(board);
      }
    }

    render() {
       return (
           <div>
           <form  onSubmit={this.handleSubmit} className="create-board-wrapper">
           <input type="text" 
           name="name" 
           placeholder="Board name"
           onChange={(e) => this.setState({title: e.target.value})}
           />
           <select 
            onChange={e => this.setState({background: e.target.value})}
            name="background">
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="black">Black</option>
           </select>
           <button type="submit">Create New Board</button>
           </form>
           </div>
       )
    }
}

CreateBoardForm.propTypes =  {
    createNewBoard: PropTypes.func.isRequired
}

export default CreateBoardForm