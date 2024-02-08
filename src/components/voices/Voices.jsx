// Voices.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './voices.module.css';
import Tuning from '../tuning/Tuning'; // Импортируем компонент Tuning.jsx
import img1 from './Vector.svg'
import img2 from './SVG.svg'
import voice1 from './filipp.mp3'
import voice2 from './ermil.mp3'
import voice3 from './madirus.mp3'
import voice4 from './Omazh.mp3'
import voice5 from './zahar.mp3'
import voice6 from './alex.mp3'


const Voices = ({ user_id }) => {
    const tg = window.Telegram.Webapp;
    
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentSpeed, setCurrentSpeed] = useState(1.0); // Добавлено состояние для скорости голоса
    const [currentFormat, setCurrentFormat] = useState('mp3'); // Добавлено состояние для формата голоса
    const voiceDescriptionsSecond = {
      filipp: { name: 'Филипп 👤', audio: voice1},
      ermil: { name: 'Ермил 👤', audio: voice2 },
      madirus: { name: 'Мадирас 👤', audio: voice3 },
      omazh: { name: 'Омаж 💅', audio: voice4 },
      zahar: { name: 'Захар 👤', audio: voice5 },
      alexander: { name: 'Александр 👤', audio: voice6 },
      kirill: { name: 'Кирилл 👤', audio: 'path/to/kirill.mp3' },
      anton: { name: 'Антон 👤', audio: 'path/to/anton.mp3' },
      alena: { name: 'Алёна 💅', audio: 'path/to/alena.mp3' },
      dasha: { name: 'Даша 💅', audio: 'path/to/dasha.mp3' },
      julia: { name: 'Юлия 💅', audio: 'path/to/julia.mp3' },
      lera: { name: 'Лера 💅', audio: 'path/to/lera.mp3' },
      masha: { name: 'Маша 💅', audio: 'path/to/masha.mp3' },
      marina: { name: 'Марина 💅', audio: 'path/to/marina.mp3' },
      jane: { name: 'Джейн 💅', audio: 'path/to/jane.mp3' },
    };
  
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
    };

    const playAudio = (audioSrc) => {
        if (currentAudio) {
            currentAudio.pause(); // Пауза текущего аудио, если оно есть
        }
        const audio = new Audio(audioSrc);
        audio.play();
        setCurrentAudio(audio);
    };

    const handleVoiceSelect = (voice) => {
        setSelectedVoice(voice);
        // Здесь вы можете вызвать функцию для отправки выбранных настроек на сервер FastAPI
        saveSettings(user_id,voice, currentSpeed, currentFormat); // Передаем скорость и формат в функцию сохранения настроек
    };

    const saveSettings = async (user_id,voice, speed, format) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id, voice, speed, format }),
        };
        
        
        try {
          
            const response = await fetch('http://0.0.0.0:8001/save_settings', requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const handleSaveSettings = (speed, format) => {
        setCurrentSpeed(speed); // Обновляем состояние скорости голоса
        setCurrentFormat(format); // Обновляем состояние формата голоса
    };

    return (
        <div className={style.top}>
            <span>{tg?.user?.username}</span>
            <h1 className=' text-[32px] mb-[25px] text-left text-white ml-10 bold-[700]'>Выберите голос</h1>
            <Slider {...settings}>
                {Object.keys(voiceDescriptionsSecond).map((voice) => (
                    <div
                        key={voice}
                        className={`${style.voice} text-2xl flex ${selectedVoice === voice ? 'selected' : ''}`}
                        onClick={() => handleVoiceSelect(voice)}
                    >
                        <div className='flex'>
                            <p className={style.text}>{voiceDescriptionsSecond[voice].name}</p>

                            <div className={`${style.btns} `}>
                                <button className='mr-1 bg-[#1677FF] text-white'>
                                    <img src={img1} alt="" />
                                </button>
                                <button onClick={() => playAudio(voiceDescriptionsSecond[voice].audio)}>
                                    <img src={img2} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>

                ))}
            </Slider>

            {/* Передаем функцию handleSaveSettings в компонент Tuning */}
            <Tuning onSaveSettings={handleSaveSettings} />
        </div>
    );
};

export default Voices;
