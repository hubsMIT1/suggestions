import React,{useState} from 'react'

export default function User({provider,profile,login}) {
    var lg = "login";
    // const [login, setlogin] = useState();
  return (

    <div>
        <ul>
            <li>{provider }</li>
            <li>{profile}</li>
            <li>{ login ? "Logout": "Login"}</li>
        </ul>
    </div>
  )
}
