import { useEffect, useState } from 'react';
import './App.css';
import ParentComponent from './components/parent/ParentComponent';

const tg = window.Telegram.WebApp;

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userIdParam = searchParams.get('user_id');
    if (userIdParam != null) {
      setUserId(userIdParam);
    }
    else{
      setUserId(tg?.initDataUnsafe?.user?.id)
    }
  }, []);
  
  return (
    <div className="App">
      <ParentComponent user_id={userId} tg={tg}/>
    </div>
  );
}

export default App;
