import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './voices.module.css';
import Tuning from '../tuning/Tuning';
import img1 from './Vector.svg';
import img2 from './SVG.svg';
import img3 from './Vector (1).svg'

const Voices = ({ user_id, tg, speed, format }) => {
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentSpeed, setCurrentSpeed] = useState(speed);
    const [currentFormat, setCurrentFormat] = useState(format);
    const [activeButton, setActiveButton] = useState(null); // Добавляем состояние для активной кнопки


    const voiceDescriptionsSecond = {
      filipp: { name: 'Филипп 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913202/jtvwwc1a4njfks9n2ta8.mp3' },
      ermil: { name: 'Ермил 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913250/jhzkwslm5emodsxiym4j.mp3' },
      madirus: { name: 'Мадирас 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913289/mzsirpz7c3vtivn7shwp.mp3' },
      omazh: { name: 'Омаж 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913326/e8qgjxtmqm5iy0xj7cmx.mp3' },
      zahar: { name: 'Захар 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913363/istjneayrx1zwsi3yfub.mp3' },
      alexander: { name: 'Александр 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913401/pjgrjamxi7vuutaf55rv.mp3' },
      kirill: { name: 'Кирилл 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913439/l8lcnewliaaiwugb2gfl.mp3' },
      anton: { name: 'Антон 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913481/iffujulpzmkjgtusbvlo.mp3' },
      dasha: { name: 'Даша 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913514/hbvthxyktjyflvwnoyue.mp3' },
      julia: { name: 'Юлия 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913566/rct1retobsl36jorcu5e.mp3' },
      lera: { name: 'Лера 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913618/uqscx2wxyzqismh0vaca.mp3' },
      masha: { name: 'Маша 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913648/dbfjjdh5aessyprovsvn.mp3' },
      marina: { name: 'Марина 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913732/ltjews0xskk0wlzad4qp.mp3' },
      jane: { name: 'Джейн 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913769/qistbheln4riqu3uonlq.mp3' },
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
        setActiveButton(voice); // Обновляем активную кнопку

        saveSettings(user_id, voice, currentSpeed, currentFormat)
            .then(() => {
              
              alert(`Вы выбрали голос ${voiceDescriptionsSecond[voice].name}\nМожете написать в чат`);
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

        try {
            const response = await fetch('http://62.113.110.178:8000/save_settings', requestOptions);
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
            <Slider {...settings} className=''>
                {Object.keys(voiceDescriptionsSecond).map((voice) => (
                    <div key={voice} className={`${style.voice} text-2xl flex ${selectedVoice === voice ? 'selected' : ''}`}>
                        <div className='flex'>
                            <p className={style.text}>{voiceDescriptionsSecond[voice].name}</p>
                            <div className={`${style.btns}`}>
                            <button className={`mr-1  text-white ${activeButton === voice ? 'bg-[#1677FF]' : 'bg-white '}`} onClick={() => handleVoiceSelect(voice)}>
                                    {activeButton === voice ?<img src={img1} alt='' /> : <img src={img3} alt='' />
                                    }
                                    
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