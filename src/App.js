import { useEffect, useState } from 'react';
import './App.css';
import ParentComponent from './components/parent/ParentComponent';
import Tuning from './components/tuning/Tuning';
import Voices from './components/voices/Voices';

const tg = window.Telegram.WebApp;

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userIdParam = searchParams.get('user_id');
    if (userIdParam) {
      setUserId(userIdParam);
    }
  }, []);
  
  return (
    <div className="App">
      <ParentComponent user_id={userId} tg={tg}/>
    </div>
  );
}

export default App;
