import './index.css';
import Chats from './components/chats/chats';
import List from './components/list/list';
import Details from './components/details/details';


function App() {
  return (
    <div className='container'>
      <List/>
      <Chats/> 
      <Details/>
    </div>
  );
}

export default App;
