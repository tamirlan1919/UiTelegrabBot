import './App.css';
import Tuning from './components/tuning/Tuning';
import Voices from './components/voices/Voices';

const tg = window.Telegram.WebApp; // Инициализация tg до использования

function App() {
  const user_id = tg?.initDataUnsafe?.user?.username;

  return (
    <div className="App">
      {/* Передаем user_id и tg в компонент Voices */}
      <Voices user_id={user_id}  />
      <Tuning />
    </div>
  );
}

export default App;
