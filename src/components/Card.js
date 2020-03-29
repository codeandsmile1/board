import React from 'react';
import PropTypes from 'prop-types';
import {cardsRef} from '../firebase';
import EditCardModal from './EditCardModel';
import TextareaAutosize from 'react-autosize-textarea';


class Card extends React.Component {
  state = { 
      modalOpen: false
  }

  toggleModal = () => {
      this.setState({modalOpen: !this.state.modalOpen});
  }

   deleteCard = async (e) => {
       try {
         const cardId = this.props.data.id;
         await cardsRef.doc(cardId).delete();
       } catch(error)  { 
         console.error("Error deleting card: ", error);
       }
   }

    render() {
       return (
           <React.Fragment>
           <div className="card">
               <div className="cards-labels">
                   {
                       this.props.data.labels.map(label => {
                           return <span key={label} style={{background: label}} className="label"></span>
                       })
                   }

               </div>
               <div className="card-body">
               <TextareaAutosize 
                 readOnly
                 value={this.props.data.text}
                 onClick={this.toggleModal}></TextareaAutosize>
               <span onClick={this.deleteCard}>&times;</span>
               </div>
           </div>
           <EditCardModal
            modalOpen={this.state.modalOpen} 
            toggleModal={this.toggleModal}
            cardData={this.props.data}
            />
           </React.Fragment>
       )
    }
}

Card.propTypes = {
    data: PropTypes.object.isRequired
}

export default Card;