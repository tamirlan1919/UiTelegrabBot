import './App.css';
import ParentComponent from './components/parent/ParentComponent';
import Tuning from './components/tuning/Tuning';
import Voices from './components/voices/Voices';

const tg = window.Telegram.WebApp; // Инициализация tg до использования

function App() {
  const user_id = tg?.initDataUnsafe?.user?.id;

  return (
    <div className="App">
      <ParentComponent user_id={user_id} tg={tg}/>
    </div>
  );
}

export default App;
