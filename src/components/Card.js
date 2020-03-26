import React from 'react';
import PropTypes from 'prop-types';
import {cardsRef} from '../firebase';
import EditCardModal from './EditCardModel'

class Card extends React.Component {
  state = { 
      modalOpen: false
  }

  toggleModal = () => {
      this.setState({modalOpen: !this.state.modalOpen});
      console.log(this.state);
  }

   deleteCard = async (e) => {
       try {
         const cardId = this.props.data.id;
         await cardsRef.doc(cardId).delete();
       } catch(error)  { 
         console.log("Error deleting card: ", error);
       }
   }

    render() {
       return (
           <React.Fragment>
           <div className="card">
               <div className="card-body">
               <p onClick={this.toggleModal}>{this.props.data.text}</p>
               <span onClick={this.deleteCard}>&times;</span>
               </div>
           </div>
           <EditCardModal modalOpen={this.state.modalOpen} toggleModal={this.toggleModal}/>
           </React.Fragment>
       )
    }
}

Card.propTypes = {
    data: PropTypes.object.isRequired
}

export default Card;