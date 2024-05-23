import './index.css';
import Chats from './components/chats/chats';
import List from './components/list/list';
import Details from './components/details/details';
import Login from './components/login/login'
import Notification from './components/notification/notification';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { userStore } from './lib/userStore';

const App = () => {

  const {currentuser, isLoading, fetchuserInfo} = userStore()
  const user = false;

  useEffect(() =>{
    const unSub = onAuthStateChanged(auth, (user) =>{
      fetchuserInfo(user?.uid);
    });

    return () =>{
      unSub();
    };
  }, [fetchuserInfo]);


  if (isLoading) return<div className='loading'>Loading...</div>
  return (
    <div className='container'>
      {
      currentuser ? (
        <>
        <List/>
        <Chats/> 
        <Details/>
      </>

      ) : (<Login/>
    )
      }
      <Notification/>

    </div>
  );
};

export default App;
