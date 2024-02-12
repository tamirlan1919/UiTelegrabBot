// Voices.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './voices.module.css';
import Tuning from '../tuning/Tuning';
import img1 from './Vector.svg';
import img2 from './SVG.svg';
import voice1 from './filipp.mp3';
import voice2 from './ermil.mp3';
import voice3 from './madirus.mp3';
import voice4 from './Omazh.mp3';
import voice5 from './zahar.mp3';
import voice6 from './alex.mp3';
import voice7 from './kirill.mp3'
import voice8 from './anton.mp3'

import voice10 from './dasha.mp3'
import voice11 from './julia.mp3'
import voice12 from './12.mp3'
import voice13 from './13.mp3'
import voice14 from './14.mp3'
import voice15 from './15.mp3'
const Voices = ({ user_id, tg, speed, format }) => {
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentSpeed, setCurrentSpeed] = useState(speed); // Добавляем текущую скорость
    const [currentFormat, setCurrentFormat] = useState(format); // Добавляем текущий формат

    const voiceDescriptionsSecond = {
        filipp: { name: 'Филипп 👤', audio: voice1 },
        ermil: { name: 'Ермил 👤', audio: voice2 },
        madirus: { name: 'Мадирас 👤', audio: voice3 },
        omazh: { name: 'Омаж 💅', audio: voice4 },
        zahar: { name: 'Захар 👤', audio: voice5 },
        alexander: { name: 'Александр 👤', audio: voice6 },
        kirill: { name: 'Кирилл 👤', audio: voice7 },
        anton: { name: 'Антон 👤', audio: voice8 },
        dasha: { name: 'Даша 💅', audio: voice10 },
        julia: { name: 'Юлия 💅', audio: voice11 },
        lera: { name: 'Лера 💅', audio: voice12 },
        masha: { name: 'Маша 💅', audio: voice13 },
        marina: { name: 'Марина 💅', audio: voice14 },
        jane: { name: 'Джейн 💅', audio: voice15 },
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
            currentAudio.pause();
        }
        const audio = new Audio(audioSrc);
    
        // Добавляем обработчик события click для воспроизведения аудио
        const playHandler = () => {
            audio.play();
            setCurrentAudio(audio);
            // Удаляем обработчик после первого вызова, чтобы не было повторного воспроизведения при последующих кликах
            document.removeEventListener('click', playHandler);
        };
    
        // Добавляем обработчик события click для воспроизведения аудио
        document.addEventListener('click', playHandler);
    };

    const saveSettings = async (user_id, selectedVoice, selectedSpeed, format) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: String(user_id), selected_voice: selectedVoice, selected_speed: selectedSpeed, format: format }),
        };
    
        
    
        try {
            const response = await fetch('http://localhost:8000/save_settings', requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    };

    const handleVoiceSelect = (voice) => {
        setSelectedVoice(voice);
        saveSettings(user_id, voice, currentSpeed, currentFormat)
            .then(() => {
                tg.close();
                alert(`Вы выбрали голос ${voiceDescriptionsSecond[voice].name}`);
            })
            .catch(error => {
                console.error('Error saving settings:', error);
            });
    };

    const handleSaveSettings = (speed, format) => {
        setCurrentSpeed(speed);
        setCurrentFormat(format);
    };

    return (
        <div className={style.top}>
            <h1 className=' text-[32px] mb-[25px] text-left text-white ml-10 bold-[700]'>Выберите голос</h1>
            <Slider {...settings}>
                {Object.keys(voiceDescriptionsSecond).map((voice) => (
                    <div
                        key={voice}
                        className={`${style.voice} text-2xl flex ${selectedVoice === voice ? 'selected' : ''}`}
                        
                    >
                        <div className='flex'>
                            <p className={style.text}>{voiceDescriptionsSecond[voice].name}</p>
                            <div className={`${style.btns} `}>
                                <button className='mr-1 bg-[#1677FF] text-white' onClick={() => handleVoiceSelect(voice)}>
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
            <Tuning onSaveSettings={handleSaveSettings} />
        </div>
    );
};

export default Voices;
