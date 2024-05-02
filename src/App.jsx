import './index.css';
import Chat from './components/details/details';
import List from './components/list/list';
import Chats from './components/chats/chats';


function App() {
  return (
    <div className='container'>
      <List/>
      <Chats/> 
      <Chat/>   
    </div>
  );
}

export default App;
