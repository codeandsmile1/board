import React from "react";
import "./style.css";
import Board from "./components/Board";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {boardsRef} from './firebase';
import {AuthProvider} from './components/AuthContext';
import UserForm from './components/UserForm';
import Header from './components/Header';

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

  render() {
    return (
      <div>
         <BrowserRouter>
         <AuthProvider>
         <Header/>
         <Switch>
           <Route exact path='/' component={UserForm}/>
         <Route exact path="/:userId/boards"
          render={(props) => (
            <Home 
            {...props}
            getBoard = {this.getBoard}
            boards={this.state.boards}         
            createNewBoard={this.createNewBoard}/>
          )
          }/>
         <Route
         path="/board/:boardId" 
         component={Board}
         render = {(props) => (
           <Board 
           {...props}
           />
         )}
         />
         <Route component={PageNotFound}/>
         </Switch>
         </AuthProvider>
         </BrowserRouter>
      </div>
    );
  }
}

export default App;
