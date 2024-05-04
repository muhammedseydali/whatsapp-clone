import './index.css';
import Chats from './components/chats/chats';
import List from './components/list/list';
import Details from './components/details/details';
import Login from './components/login/login'

const App = () => {

  const user = false;


  return (
    <div className='container'>
      {
      user ? (
        <>
        <List/>
        <Chats/> 
        <Details/>
      </>

      ) : (<Login/>)
      }

    </div>
  );
};

export default App;
