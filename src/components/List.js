import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";
import { cardsRef, listsRef } from "../firebase";

class List extends React.Component {
  state = {
    currentCards: []
  };

  componentDidMount() {
    this.getCards(this.props.list.id);
  }

  getCards = async listId => {
    try {
      const cards = await cardsRef
        .where("card.listId", "==", listId)
        .orderBy("card.createdAt")
        .get();

      cards.forEach(card => {
        const data = card.data().card;
        const cardObj = {
          id: card.id,
          ...data
        };
        console.log(cardObj);
        this.setState({ currentCards: [...this.state.currentCards, cardObj] });
      });
    } catch (error) {
      console.log("Error fetching cards: ", error);
    }
  };

  createNewCard = async e => {
    try {
      e.preventDefault();

      const card = {
        text: this.nameInput.current.value,
        listId: this.props.list.id,
        labels: [],
        createdAt: new Date()
      };

      if (card.text && card.listId) {
        await cardsRef.add({ card });
        //this.setState({currentCards: [...this.state.currentCards, card]})
      }

      this.nameInput.current.value = "";
    } catch (error) {
      console.log("Insert cards: ", error);
    }
  };

  deleteList = () => {
    const listId = this.props.list.id;
    this.props.deleteList(listId);
  };

  updateList = async e => {
    try {
      debugger;
      const listId = this.props.list.id;
      const newTitle = e.currentTarget.value;
      const list = await listsRef.doc(listId);
      list.update({ "list.title": newTitle });
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

  nameInput = React.createRef();
  render() {
    return (
      <div className="list">
        <div className="list-header">
          <input
            type="text"
            name="listTitle"
            onChange={this.updateList}
            defaultValue={this.props.list.title}
          />
          <span onClick={this.deleteList}>&times;</span>
        </div>
        {Object.keys(this.state.currentCards).map(key => (
          <Card key={key} data={this.state.currentCards[key]} />
        ))}
        <form onSubmit={this.createNewCard} className="new-card-wrapper">
          <input
            type="text"
            name="name"
            ref={this.nameInput}
            placeholder="+ New Card"
          />
        </form>
      </div>
    );
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  deleteList: PropTypes.object.isRequired
};

export default List;
