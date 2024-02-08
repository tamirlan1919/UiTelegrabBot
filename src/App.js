import './App.css';
import Tuning from './components/tuning/Tuning';
import Voices from './components/voices/Voices';

const tg = window.Telegram.WebApp;
function App() {
  return (
    <div className="App">
      <Voices/>
     <Tuning/>
    </div>
  );
}

export default App;
