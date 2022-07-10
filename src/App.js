import React, { useState } from 'react';
import './App.css';

const App = ()=> {      //Main function

  const [todo,setTodo] = useState("") ;
  const [toDos, setToDos] = useState([]) ;
  const [editId, setEditId] = useState(0) ;

  const handleSubmit = (e)=> {
    e.preventDefault() ;

    if(editId) {
      const editToDo = toDos.find((i) => i.id === editId) ;
      const updateToDos = toDos.map((t)=>
      t.id === editToDo.id ? (t = {id : t.id, todo}) : ({id : t.id , todo : t.todo})) ;
      setToDos(updateToDos) ;
      setEditId(0) ;
      setTodo('') ;
      return ;


    }

    if(todo !== "") {
      setToDos([{id : `${todo}-${Date.now()}`, todo}, ...toDos]) ;
      setTodo("") ;
    }

  };

  const handleDelete = (id)=> {
    const delToDO = toDos.filter((to)=> to.id !== id);    //handleDelete function for Delete button
    setToDos([...delToDO]);
  } ;

  const handleEdit = (id)=> {
    const editToDo = toDos.find((i)=> i.id === id) ;
    setTodo(editToDo.todo) ;
    setEditId(id) ;
  }


  return ( 
  <div className='App'>
    <div className='container'>
      <h1>Todo List App</h1>
      <form className='todoForm' onSubmit={handleSubmit}>
        <input type = 'text' value={todo} onChange={(e)=> setTodo(e.target.value)}/>
        <button type = 'submit' >{editId ? "Update" : "Go"}</button>
      </form>

      <ul className='allToDos'>
      {
        toDos.map((t)=> (
          <li className='singleToDos'>
            <span className='toDoText' key={t.id}>{t.todo}</span>
            <button onClick={()=> handleEdit(t.id)}>Edit</button>
            <button onClick={()=> handleDelete(t.id)}>Delete</button>
          </li>
        
      ))} 
    

      </ul>
    </div>
  </div>
  );
} ;

export default App;
