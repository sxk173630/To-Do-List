import React, { useState, useEffect } from "react";
import "./App.css";
//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Run only once
  useEffect(() => {
    getLocalTodos();
  }, []);

   //Use effect
   useEffect(() => {
    filterHandler();
  }, [todos, status]);

  //functions/events
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true))
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  //save to local
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  //Checking local storage
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') ===null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else {
     let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
     <header>
       <h1>Sahil's To-Do-List</h1> 
       </header>
       <Form 
       todos={todos} 
       setTodos={setTodos} 
       inputText={inputText} 
       setInputText={setInputText} 
       setStatus={setStatus} 
       />
       <TodoList 
       todos={todos}
       setTodos={setTodos} 
       filteredTodos={filteredTodos} 
       />
    </div>
  );
}

export default App;
