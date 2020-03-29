import React from "react";
import BoardPreview from "../BoardPreview";
import CreateNewBoard from "../CreateBoardForm";
import PropTypes from "prop-types";

class Home extends React.Component {
  componentDidMount() {
    this.props.getBoard();
  }
  render() {
    return (
      <div>
        <p> Home</p>
        <CreateNewBoard createNewBoard={this.props.createNewBoard} />
        <div className="board-preview-wrapper">
          {Object.keys(this.props.boards).map(key => (
            <BoardPreview key={key} boards={this.props.boards[key]} />
          ))}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getBoard: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  createNewBoard: PropTypes.func.isRequired
};

export default Home;
