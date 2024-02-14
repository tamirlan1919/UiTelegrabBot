import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './voices.module.css';
import Tuning from '../tuning/Tuning';
import img1 from './Vector.svg';
import img2 from './SVG.svg';


const Voices = ({ user_id, tg, speed, format }) => {
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentSpeed, setCurrentSpeed] = useState(speed);
    const [currentFormat, setCurrentFormat] = useState(format);


    const voiceDescriptionsSecond = {
      filipp: { name: 'Филипп 👤', audio: './filipp.mp3' },
      ermil: { name: 'Ермил 👤', audio: './ermil.mp3' },
      madirus: { name: 'Мадирас 👤', audio: './madiras.mp3' },
      omazh: { name: 'Омаж 💅', audio: './omazh.mp3' },
      zahar: { name: 'Захар 👤', audio: './zahar.mp3' },
      alexander: { name: 'Александр 👤', audio: './alex.mp3' },
      kirill: { name: 'Кирилл 👤', audio: './kirill.mp3' },
      anton: { name: 'Антон 👤', audio: './anton.mp3' },
      dasha: { name: 'Даша 💅', audio: './dasha.mp3' },
      julia: { name: 'Юлия 💅', audio: './julia.mp3' },
      lera: { name: 'Лера 💅', audio: './12.mp3' },
      masha: { name: 'Маша 💅', audio: './13.mp3' },
      marina: { name: 'Марина 💅', audio: './14.mp3' },
      jane: { name: 'Джейн 💅', audio: './15.mp3' },
  };
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
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

    const playAudio = (audioSrc) => {
        if (currentAudio) {
            currentAudio.pause();
        }
        const audio = new Audio(audioSrc);
        setCurrentAudio(audio);
        audio.play();
    };

    const saveSettings = async (user_id, selectedVoice, selectedSpeed, format) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: String(user_id), selected_voice: selectedVoice, selected_speed: selectedSpeed, format: format }),
        };
        alert(requestOptions.body)
        try {
            const response = await fetch('https://nmntzh.ru/save_settings', requestOptions);
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

    return (
        <div className={style.top}>
            <h1 className='text-[32px] mb-[25px] text-left text-white ml-10 bold-[700]'>Выберите голос</h1>
            <Slider {...settings}>
                {Object.keys(voiceDescriptionsSecond).map((voice) => (
                    <div key={voice} className={`${style.voice} text-2xl flex ${selectedVoice === voice ? 'selected' : ''}`}>
                        <div className='flex'>
                            <p className={style.text}>{voiceDescriptionsSecond[voice].name}</p>
                            <div className={`${style.btns}`}>
                                <button className='mr-1 bg-[#1677FF] text-white' onClick={() => handleVoiceSelect(voice)}>
                                    <img src={img1} alt='' />
                                </button>
                                <button onClick={() => playAudio(voiceDescriptionsSecond[voice].audio)}>
                                    <img src={img2} alt='' />
                                    <audio src={voiceDescriptionsSecond[voice].audio} style={{ display: 'none' }} />
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