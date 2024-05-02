import './index.css';
import Chat from './components/chat/chat';
import Detail from './components/details/details';
import List from './components/list/list';


function App() {
  return (
    <div className='container'>
      <List/>
      <Detail/> 
      <Chat/>   
    </div>
  );
}

export default App;
