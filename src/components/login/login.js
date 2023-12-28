import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle,IResolveParams } from "reactjs-social-login";
import React,{useReact,useCallback,useState,useEffect,} from "react";
import Admin from '../../AdminPanel';
import User from './User';
import axios from "axios";
import {  useNavigate } from "react-router-dom";
function App({id}){
const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState();
  const[userData,setuserData] = useState();

  const onLoginStart = useCallback(() => {
    // alert('login start');

  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    // alert('logout success');
    
  }, []);

  const onLogout = useCallback(() => {}, []);
//   const REDIRECT_URI =
//   'https://plenty-planets-beam-42-118-51-2.loca.lt/account/login';
const REDIRECT_URI = 'https://presi.collegesuvidha.in'; 



// const navigate = useNavigate();
const onSuccess = ()=>{
  const url = `https://presi.collegesuvidha.in/manifest/users.php?email=${profile.email}`;
  axios.get(url).then(response => response.data)
  .then((data)=> {
      setuserData(data)

  })
  return (
    <div>
      <h4 color="black" className="title1"> Successfully, You have voted!!!</h4>
    </div>
  )

   
  
}
function saveDataToLocalStorage(userData) {
  localStorage.setItem("userLoginData", JSON.stringify(userData));
}

const CheckVoted = () =>{
  var find = 0;
 
  if( userData !==null && userData !== profile.email){
  let formData = new FormData();
formData.append('name',profile.name);
formData.append('email',profile.email);
formData.append('vote',parseInt(profile.vote)+1);
formData.append('google_id',profile.access_token);
formData.append('password',"Non");
axios({
  method:'post',
  url: 'https://presi.collegesuvidha.in/manifest/users.php',
  data:formData,
  config: {headers: {'Content-Type' : 'multipart/form-data' }}
})
  .then(function (response){
   

  })
  .catch(function (response){
     
  })

  onSuccess();
}else {
  onSuccess();
}
}

  return (
    <>
      {provider && profile ? (
      
        <div>
        {
         CheckVoted(profile)
        }
        {/* <User provider={provider} profile={profile} onLogout={onLogout} /> */}
        
       {/* <button onClick={onLogoutSuccess}> Logout </button> */}
       <h4 color="black" className="title1"> Successfully, Registred!!!</h4>
      
        </div>
      ):(
      <div className={`App ${provider && profile ? 'hide' : ''}`}>
        <h4 color="black" className="title1">Just One Step</h4>
        <LoginSocialGoogle
          client_id= '255212946739-i3mt9it7nf082n66kvanbk44iru3tt9o.apps.googleusercontent.com'
          onLoginStart={onLoginStart}
          redirect_uri={REDIRECT_URI}
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }) => {
           
            setProvider(provider);
            setProfile(data);
            saveDataToLocalStorage(data);
      
          }
          
          }
          onReject={err => {
         
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>
     </div>
      )
      }
     </>
  );
}
export default App;