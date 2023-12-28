
import '../.././App.css';
import React, { useState, useEffect } from 'react';
import { faYoutune } from 'react-icons';
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import {FaArrowAltCircleUp,FaArrowAltCircleDown} from 'react-icons/fa';
import CommentSection from '.././Comment/Comment-section';
import Login from '.././login/login';
import Popup from '../Alert/Popup';
// FaArrowAltCircleUp
import { BrowserRouter as Router, Switch, Route, Link, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios,{ AxiosError } from 'axios';

function Comment({ isComment,id }) {
  return (
    <div>
      {isComment &&
        (<CommentSection id = {id} />)}
    </div>
  )
}
function getDataFromLocalStorage(userdata) {
  return JSON.parse(localStorage.getItem(userdata));
}

// task
function saveDataToLocalStorage(userData, id) {
  localStorage.setItem(id, JSON.stringify(userData));
}
function Task({ name, admin }) {

  const url = 'https://presi.collegesuvidha.in/manifest/task.php';

  const handleDeleteTodo = (id) => {
    // setTodoList(todoList.filter((todo) => todo.id !== id));
    // deleteTodo(id);
    // axios.delete('http://locahlost/manifest/task.php/delete.php',{data: {id: id}})

    axios.delete(`https://presi.collegesuvidha.in/manifest/task.php?id=${id}`)
      .then(response => {
        
      })
      .catch(err => {
      
      });
  };
  const [userData, setuserData] = useState([
  ]);

  var id = 0;
  const navigate = useNavigate()
  const [votes, setVotes] = useState(name.vote);
  const [check, setCheck] = useState(parseInt(name.verify));
  const [login_check, setLogin] = useState(false)
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(check);
  const [voted, setvoted] = useState(false);
  // const [pass, setPass] = useState(0)
  const [got, setGot] = useState(true);

   
// },[])
  const handleUpvote = (vote, _id) => {
    const userLoginData = getDataFromLocalStorage("userdata" + _id)
   
    if (!userLoginData) {
      saveDataToLocalStorage(_id, "userdata" + _id)
      var v = parseInt(vote) + 1
      setVotes(v);
      
      axios.put(`https://presi.collegesuvidha.in/manifest/task.php?id=${_id}&vote=${v}`)
        .then(response => {
        //  console.log(response);
        })
        .catch(err => {
        
        });

      setvoted(true);
    }
    else {
      setLogin(true);

    }
  };

  const handleDownvote = (vote, _id) => {
    const userLoginData = getDataFromLocalStorage("userdata" + _id)

    if (!userLoginData) {
      saveDataToLocalStorage(_id, "userdata" + _id)
      var v = parseInt(vote) - 1
      setVotes(v);
      axios.put(`https://presi.collegesuvidha.in/manifest/task.php?id=${_id}&vote=${v}`)
        .then(response => {
        })
        .catch(err => {
        
        });
      setvoted(true);
    }
    else {
      setLogin(true);
    }
  };
  const handleCommentClick = () => {

    const userLoginData = getDataFromLocalStorage("userLoginData");
    if(!userLoginData){

    }
    setIsCommentOpen(!isCommentOpen);
    // this.state.isCommentOpen = !this.state.isCommentOpen
  };
  const handleCheckboxChange = (id, checked) => {
    var check = !checked
    setIsChecked(check)
    axios.put(`https://presi.collegesuvidha.in/manifest/task.php?id=${id}&check=${check}`)
    .then(response => {
      setIsChecked(check)
    })
    .catch(err => {
   
    });

  }

 
  return (
    // { (<div> heklhldf</div> : null)}
     
    isChecked  || (admin!==NaN && admin===1)  ?

      (
        <>
           {login_check ? (<Popup> "Already, votted!!" </Popup>) : null}
          {voted ? (<Popup> "Successfully, You have voted!!"</Popup>) : null}
          <div className='list'>
            <div  className='li' >
              <div className='fest-title'>
                {name.Task}
              </div>
              <div>

                <div className='task-Vote'>
                  <div className='upvote'>

                    <FaArrowAltCircleUp className='BiUpvote' onClick={() => handleUpvote(votes, name.id)} size={30}
                      color='#008b00' />
                  </div>
                  <div className='vote-num'> {votes}</div>
                  <div className='downvote'>

                    <FaArrowAltCircleDown className='BiDownvote' onClick={() => handleDownvote(votes, name.id)} size={30} color='red' />
                  </div>
                  <div className='comment-open'>
                    <BiComment onClick={handleCommentClick} size={30} />
                    <span> Comments</span>
                  </div>
                  {
                   admin!==NaN && admin===1 ?(
                      <div>
                        <input
                          type="checkbox"

                          checked={isChecked}
                          value={isChecked}
                          onChange={() => handleCheckboxChange(name.id, isChecked)}
                        />
                        <button onClick={() => handleDeleteTodo(name.id)}>
                          Delete
                        </button>
                      </div>) 
                      :null
                  }
                </div>
              </div>

            </div>
            <div className='comment-container'>

              <Comment isComment={isCommentOpen} id={name.id} />
            </div>
          </div>
        </>
      ): null

  );

}

export default Task;