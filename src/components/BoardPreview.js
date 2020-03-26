import React from "react";
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

class BoardPreview extends React.Component {
  goToBoard = () => {
    const  boardId = this.props.boards.id;
    this.props.history.push({
      pathname:`/board/${boardId}`
      }
    )
  } 
  
  render() {
    return (
    
        <ul className="board-preview-item"
         onClick={this.goToBoard}
         style={{backgroundColor: this.props.boards.background}}
         >
        <li>{this.props.boards.title}</li>
        </ul>
    );
  }
}

BoardPreview.propTypes = {
    boards: PropTypes.object.isRequired
}

export default withRouter(BoardPreview);
