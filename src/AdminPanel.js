import './App.css';
import React, { useState, useEffect } from 'react';
import Toast from './components/Toast/Toast';
import Slider from './components/slider/Slider';
import { BrowserRouter as Router, Switch, Route, Link, Routes, Navigate,useLocation } from 'react-router-dom';
import Task from './components/Task/Task'
import axios from 'axios';

function App({password}) {
    const [todoList, setTodoList] = useState([{}]); // state to hold the to-do list items
    const [text, setNewText] = useState(""); // state to hold the new to-do item
    const [toast, setToast] = useState(false);
    // const [check, setcheck] = useState(false);
    // const [vote, setVote] = useState(1);
    // const [checkAdmin, setAdmin] = useState("0");
    const [pass, setPass] = useState(0);
    // const passwords = location.state? location.state.password:"0";
    useEffect(()=>{
        
    },[])

    useEffect(()=>{
        // const passwords = location.state? location.state.password:"0";
        const passwords = location.state? location.state.password:"0";
        var api =  axios.create({
          baseURL: 'https://presi.collegesuvidha.in'
        });
        var val = "password";
        var url = `/manifest/access.php?task=${val}&passw=${passwords}`;
        api.get(url)
          .then(response => response.data)
          .then((data) => {
            // console.log(parseInt(data));
            setPass(parseInt(data));
          })
          .catch((error) => {
            console.error(error);
          }); 

   
 val = "task";
  url = `/manifest/access.php?task=${val}&passw=${passwords}`;
  
  api.get(url)
    .then(response => (response.data))
    .then((data) => {
      
      setTodoList(data);
    })
    .catch((error) => {
      console.error(error);
    });
 
    },[]);

    const handleSubmit = (e) => {
        const passwords = location.state? location.state.password:"0";
        e.preventDefault();
        let formData = new FormData();
        formData.append('Task',text);
        formData.append('vote',1);
        formData.append('verify',false);
        formData.append('email',"Non");
        // setTodoList([...todoList, text]); // add the new to-do item to the list
        setNewText(''); // clear the input field
        // addTodo(text,vote,check,setNewText,setTodoList)
        setToast(true);
        setTimeout(() => setToast(false), 3000);
        const lastTask = document.querySelector('.tasks-lists:first-child')
        // lastTask.scrollIntoView({ behavior: 'smooth' });
        
        // }
        const val = "task";
        axios({
            method:'post',
            url: `https://presi.collegesuvidha.in/manifest/task.php`,
            data:formData,
            config: {headers: {'Content-Type' : 'multipart/form-data' }}
        })
            .then(function (response){
            //   console.log(response);

            })
            .catch(function (response){
              console.log(response.error)
            })
        
        }
        const location = useLocation();
        
    return (
                        <div>
                            {!location.state ?
                                <div>

                                    <Slider />
                                </div>:null
                            }
                            <span className='mani-logn'>

                                <h1>SUGGESTION
                    
                                    {
                                        toast === true ? <Toast toasted={toast} /> : null
                                    }
                                </h1>
                                {location.state && location.state.login  ? (<Link to='/login' > Logout </Link>) : null}
                            </span>
                                <div className='main'>
                                    <div className='blur'></div>
                                    <div className='blur-page'></div>
                                    <ul >
                                        { todoList.map((item,index) => (
                                            <li key={index}>
                                               
                                                <Task name={item} admin = {pass} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='input footer' style={{ position: 'fixed', bottom: '0' }} >
                                    <form onSubmit={handleSubmit}>
                                        <div className='input-todo'>

                                            <textarea required
                                                value={text}
                                                onChange={(e) => setNewText(e.target.value)}
                                                placeholder="Write your suggestions "
                                            />
                                            <button type="submit">Add</button>

                                        </div>

                                    </form>

                                </div>
                            </div>
    );
}

export default App;

