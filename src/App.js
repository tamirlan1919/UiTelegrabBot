// App.jsx
import './App.css';
import Tuning from './components/tuning/Tuning';
import Voices from './components/voices/Voices';


function App() {
  // Здесь вы можете получить user_id, например, из localStorage или другого источника
  const user_id = 7777777// Примерная функция для получения user_id

  return (
    <div className="App">
      {/* Передаем user_id в компонент Voices */}
      <Voices />
      <Tuning />
    </div>
  );
}

export default App;
