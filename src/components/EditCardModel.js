import React from "react";
import { cardsRef } from "../firebase";
import PropTypes from "prop-types";
import TextareaAutosize from "react-autosize-textarea";

class EditCardModal extends React.Component {
  //keep in state available labels
  state = {
    availableLabels: ["#80ccff", "#80ffaa"],
    selectedLabels: []
  };

  componentDidMount() {
    this.setState({
      selectedLabels: this.props.cardData.labels
    });
  }
  textInput = React.createRef();

  //Update Card
  updateCard = async e => {
    try {
      e.preventDefault();

      const cardId = this.props.cardData.id;
      const newText = this.textInput.current.value;
      const labels = this.state.selectedLabels;

      const card = await cardsRef.doc(cardId);
      card.update({ "card.text": newText, "card.labels": labels });
      this.props.toggleModal();
    } catch (error) {
      console.error("Error updating cards: ", error);
    }
  };

  setLabel = label => {
    const labels = [...this.state.selectedLabels];
    if (labels.includes(label)) {
      const newLabels = labels.filter(element => {
        return element !== label;
      });
      this.setState({ selectedLabels: [...newLabels] });
    } else {
      labels.push(label);
      this.setState({ selectedLabels: [...labels] });
    }
  };

  render() {
    return (
      <div
        className="modal-wrapper"
        style={{ display: this.props.modalOpen ? "block" : "none" }}
      >
        <div className="modal-body">
          <form onSubmit={this.updateCard}>
            <div>
              <span className="modal-close" onClick={this.props.toggleModal}>
                &times;
              </span>
              <p className="label-title">add / remove labels</p>
              {this.state.availableLabels.map(label => {
                return (
                  <span
                    className="label"
                    key={label}
                    style={{ background: label }}
                    onClick={() => this.setLabel(label)}
                  ></span>
                );
              })}
              <hr />
            </div>
            <div className="edit-area">
              <span className="edit-icon">&#x270E;</span>
              <TextareaAutosize
                className="textbox-edit"
                defaultValue={this.props.cardData.text}
                ref={this.textInput}
              ></TextareaAutosize>
            </div>
            <div>
              <p className="label-title">label:</p>
              {this.state.selectedLabels.map(label => {
                return (
                  <span
                    className="label"
                    style={{ background: label }}
                    key={label}
                  ></span>
                );
              })}
              <hr />
            </div>
            <button type="submit">Save changes</button>
          </form>
        </div>
      </div>
    );
  }
}

EditCardModal.propsType = {
  modalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  cardData: PropTypes.object.isRequired
};

export default EditCardModal;
