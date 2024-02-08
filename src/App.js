// App.jsx
import './App.css';
import Tuning from './components/tuning/Tuning';
import Voices from './components/voices/Voices';

const tg = window.Telegram.WebApp;

function App() {
  // Здесь вы можете получить user_id, например, из localStorage или другого источника
  const user_id = tg?.initDataUnsafe?.user?.username(); // Примерная функция для получения user_id

  return (
    <div className="App">
      {/* Передаем user_id в компонент Voices */}
      <Voices user_id={'12323123'} />
      <Tuning />
    </div>
  );
}

export default App;
