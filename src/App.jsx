import './index.css';
import Chats from './components/chats/chats';
import List from './components/list/list';
import Details from './components/details/details';
import Login from './components/login/login'
import Notification from './components/notification/notification';

const App = () => {

  const user = true;


  return (
    <div className='container'>
      {
      user ? (
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
