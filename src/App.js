import React from "react";
import "./style.css";
import Board from "./components/Board";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {boardsRef, listsRef, cardsRef} from './firebase'

class App extends React.Component {
  state = {
    boards: []
  }

  getBoard = async userId => {
    try {
        this.setState({boards: []});
        const boards = await boardsRef.get();
        
        boards.forEach(board => {
        const data = board.data().board;
           const  boardObj = {
             id: board.id,
             ...data
           }
          
           this.setState({boards: [...this.state.boards, boardObj]})
        })
    } catch(error) {
       console.log("Error getting boards", error)
    }
  }

  createNewBoard = async board => {
    try { 
      const newBoard = await boardsRef.add({board});
    
      const boardObj = {
        id:newBoard.id,
        ...board
      }
      this.setState({boards: [...this.state.boards, boardObj]});

    } catch(error) {
      console.log('Error creating new board: ', error);
    }
  }

  deleteList = async (listId) => {
    try {
       const cards = await cardsRef.where('card.listId','==', listId).get();
       if(cards.docs.length !== 0) {
          cards.forEach(card => {
             card.ref.delete();
          })
       }
       await listsRef.doc(listId).delete();

    } catch(error) {
      console.log("Error deleting list: ",error);
    }
  }

  deleteBoard = async (boardId) => {
    try { 
      const board = await boardsRef.doc(boardId);
      const lists = await listsRef.where('list.board', "==", boardId).get();
            
         if(listsRef.docs.length !== 0) {
           lists.forEach(list => {
             this.deleteList(list.ref.id)
           })
         }

     this.setState({
       boards: [...this.state.boards.filter(board => {
         return board.id !== boardId
       })]
     });

     board.delete();

    } catch(error) {
      console.log("Error deleting board: ", error);
    }
  }

  render() {
    return (
      <div>
         <BrowserRouter>
         <Switch>
         <Route exact path="/:userId/boards"
          render={(props) => (
            <Home 
            {...props}
            getBoard = {this.getBoard}
            boards={this.state.boards} 
            
            createNewBoard={this.createNewBoard}/>
          )
          }/>
         <Route path="/board/:boardId" component={Board}
         render = {(props) => (
           <Board 
           {...props}
           deleteBoard = {this.deleteBoard}
           deleteList = {this.deleteList}
           />
         )}
         />
         <Route component={PageNotFound}/>
         </Switch>
         </BrowserRouter>
      </div>
    );
  }
}

export default App;
