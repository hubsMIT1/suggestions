
import AdminPanel from './AdminPanel';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes, Navigate ,useLocation} from 'react-router-dom';
import Admin from './admin/Admin';

import Login from './components/login/login';

import Popup from './components/Alert/Popup';
export default function App() {
 
  return (
    <>
    {/* <Popup>
      <p> this is content of pop</p>
    </Popup> */}
    {/* */}
    <Router>
      <Routes>
        <Route path='/' exact element ={ <AdminPanel />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/adminpanel'  element ={ <AdminPanel />} />
        <Route path='/*' element = {<Navigate to='/'  /> }  > </Route>
        <Route path='/manifest/proxy.php?task=task' element = {<Navigate to='/'  /> }  > </Route>
        <Route path='/manifest/proxy.php?task=password' element = {<Navigate to='/'  /> }  > </Route>
        
      </Routes>
    </Router>
    {/* <div> hlllel</div> */}
    
    </>
    
  );
 
}



// export default App