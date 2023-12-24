import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Auth from './components/auth/Auth';
import Tasks from './components/tasks/Tasks';

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div>
      {currentUser ? 
          <Tasks/>
        :
          <Auth/>
      }
    </div>
  )
}

export default App
