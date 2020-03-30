import React from "react";
import List from "./List";
import {boardsRef,listsRef, cardsRef} from '../firebase';
import PropTypes from 'prop-types';
import {AuthConsumer} from './AuthContext';

class Board extends React.Component {
  state = {
    currentList: [],
    currentBoard: {},
    message: ''
  };

  componentDidMount() {
    this.getBoard(this.props.match.params.boardId);
    this.getList(this.props.match.params.boardId);
  }

  getList = async (boardId) => {
     try {
       const lists = await listsRef.where('list.board', '==', boardId)
         .orderBy('list.createdAt','desc')
         .onSnapshot(snapshot =>{
           snapshot.docChanges()
           .forEach(change => {
             if(change.type === "added") {
             const doc = change.doc;
             const list = {
               id: doc.id,
               title: doc.data().list.title
             }
             this.setState({currentList: [...this.state.currentList, list]})
            }
            if(change.type == "removed") {
              this.setState({currentList: [...this.state.currentList.filter(list => {
                return list.id !== change.doc.id
              })]})
            }
           })
         })
       
       //.get();

     //  lists.forEach(list => {
      //   const data  = list.data().list;
      //   const listObj = {
      //     id: list.id,
      //     ...data
      //   }

        // this.setState({currentList: [...this.state.currentList, listObj]})
     //  })
     } catch(error) {
        console.log("Error fetching lists: ", error);
     }
  }

  getBoard = async boardId => {
    try{ 
        const board = await boardsRef.doc(boardId).get();           
        this.setState({currentBoard: board.data().board})
     
    } catch(error)  { 
      this.setState({message: 'Board not found...'});
    }
  }

 addBoardInput = React.createRef()

  createNewList = async (e, userId) => {
  
    try {
    e.preventDefault();
    const list = {
      title: this.addBoardInput.current.value,
      board: this.props.match.params.boardId,
      createdAt: new Date(),
      user: userId
    }
    
     if(list.title && list.board) {
       await listsRef.add({list})
      //this.setState({currentList: [...this.state.currentList, list]});
     }
     this.addBoardInput.current.value = '';

    } catch(error) {
      console.error("Error creating a new list: ", error);
    }

  }
    
  deleteBoard = async () => {    
    try {    
     const boardId = this.props.match.params.boardId;
     const lists = await listsRef.where('list.board', "==", boardId).get();
  
        if(listsRef.docs.length !== 0) {
          lists.forEach(list => {
            this.deleteList()
          })
      }
      this.setState({message: 'Board not found...'});

      const board = await boardsRef.doc(boardId);
      board.delete();

      this.setState({
        boards: [...this.state.boards.filter(board => {
          return board.id !== boardId
        })]
      });
    } catch(error) {
      console.error("Error deleting board: ", error);
    }
 }

 deleteList = async () => {
   try{
    const cards = await cardsRef.where('card.listId','==', this.props.list.id).get();
    if(cards.docs.length !== 0) {
       cards.forEach(card => {
          card.ref.delete();
       })
      }
      const list = await listsRef.doc(this.props.list.id);
      list.delete();
   } catch(error) {
     console.error("Error deleting list: ",error);
   }
 }

 updateBoard = async (e) => {
  try {
    const newTitle = e.currentTarget.value;
    const board = await boardsRef.doc(this.props.match.params.boardId);
    board.update({'board.title': newTitle});
    
  } catch(error) {
    console.error("Error updating the board: ", error);
  }
}

  render() {
    return (
      <AuthConsumer>
      {({user}) =>(
        <div className="board-wrapper" style={{backgroundColor: this.state.currentBoard.background}}>
       {user.name}
       {this.state.message === ''? (
        <div className="board-header">
        <input type="text" name="boardTitle" onChange={this.updateBoard} defaultValue={this.state.currentBoard.title}/>
        <button onClick={this.deleteBoard}>Delete board</button>
        </div>
        ) : (<h2>{this.state.message}</h2>)} 
        <div className="lists-wrapper">
          {Object.keys(this.state.currentList).map(key => (
            <List key={this.state.currentList[key].id}  
             list = {this.state.currentList[key]}
             deleteList = {this.props.deleteList}
            />
          ))}
        </div>
        <form onSubmit={(e) => this.createNewList(e, user.id)} className="new-list-wrapper">
        <input type="text"
         name="name"
         type={this.state.message === ''? 'text': 'hidden'}
         ref={this.addBoardInput}
          placeholder="+ New List"/>
        </form>
        </div>
      )}
      </AuthConsumer>
    );
  }
}

Board.propTypes = {
  deleteList: PropTypes.func.isRequired,
  updateBoard: PropTypes.func.isRequired
}

export default Board;
