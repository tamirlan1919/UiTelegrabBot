import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './voices.module.css';
import Tuning from '../tuning/Tuning';
import img1 from './Vector.svg';
import img2 from './SVG.svg';
import img3 from './Vector (1).svg';
import Flag from 'react-world-flags';
import { Select } from 'antd';

const { Option } = Select;
const roleLabels = {
    neutral: 'Нейтральный',
    good: 'Радостный',
    strict: 'Строгий',
    evil: 'Злой',
    friendly: 'Дружелюбный',
    whisper: 'Шепот'
};

const Voices = ({ user_id, tg, speed, format }) => {
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentSpeed, setCurrentSpeed] = useState(speed);
    const [currentFormat, setCurrentFormat] = useState(format);
    const [activeButton, setActiveButton] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('Russia');
    const [selectedRole, setSelectedRole] = useState({});

    const voiceDescriptionsSecond = {
        Russia: {
            filipp: { name: 'Филипп 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913202/jtvwwc1a4njfks9n2ta8.mp3'},
            ermil: { name: 'Ермил 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913250/jhzkwslm5emodsxiym4j.mp3' , role: [
                'neutral',
                'good'
            ]},
            madirus: { name: 'Мадирас 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913289/mzsirpz7c3vtivn7shwp.mp3' },
            omazh: { name: 'Омаж 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913326/e8qgjxtmqm5iy0xj7cmx.mp3' ,
            role: [
                'neutral',
                'evil'
            ]},
            zahar: { name: 'Захар 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913363/istjneayrx1zwsi3yfub.mp3' ,
            role: [
                'neutral',
                'good'
            ]},
            alexander: { name: 'Александр 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913401/pjgrjamxi7vuutaf55rv.mp3',
            role: [
                'neutral',
                'good'
            ] },
            kirill: { name: 'Кирилл 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913439/l8lcnewliaaiwugb2gfl.mp3',
            role: [
                'neutral',
                'strict',
                'good'
            ] },
            anton: { name: 'Антон 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913481/iffujulpzmkjgtusbvlo.mp3',
            role: [
                'neutral',
                'good'
            ] },
            dasha: { name: 'Даша 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913514/hbvthxyktjyflvwnoyue.mp3' ,
            role: [
                'neutral',
                'good',
                'friendly'
            ]},
            julia: { name: 'Юлия 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913566/rct1retobsl36jorcu5e.mp3',
            role: [
                'neutral',
                'strict'
            ] },
            lera: { name: 'Лера 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913618/uqscx2wxyzqismh0vaca.mp3',
            role: [
                'neutral',
                'friendly'
            ]},
            masha: { name: 'Маша 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913648/dbfjjdh5aessyprovsvn.mp3',
            role: [
                'good',
                'stcrict',
                'friendly'
            ]},
            marina: { name: 'Марина 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913732/ltjews0xskk0wlzad4qp.mp3' ,
            role: [
                'neutral',
                'whisper',
                'friendly'
            ]},
            jane: { name: 'Джейн 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1707913769/qistbheln4riqu3uonlq.mp3',
            role: [
                'neutral',
                'good',
                'evil'
            ] },
        
        },
        Kazakhstan: {
            madi: { name: 'Madï👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1714239760/tigwel2uzwdvlonkhw4n.mp3' },
            amira: { name: 'Amïra 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1714239975/lhokzonisyd9xdnnsnwr.mp3' }
        },
        Uzbekistan: {
            nighora: { name: 'Nigora 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1714240048/dyoshshkg93nboklmc03.mp3' }
        },
        America: {
            john: { name: 'John 👤', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1714240103/kdmlwkdqi87r3omkovrd.mp3' }
        },
        Germany: {
            lea: { name: 'Lea 💅', audio: 'https://res.cloudinary.com/dx8u8a5wj/video/upload/v1714240148/rcn9dw0pkix3w51tybnv.mp3' }
        }
    };

    const handleVoiceChange = (index) => {
        const voiceKey = Object.keys(voiceDescriptionsSecond[selectedCountry])[index];
        setSelectedVoice(voiceKey);

    };

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: selectedCountry && Object.keys(voiceDescriptionsSecond[selectedCountry]).length > 1 ? 1 : 0,
        slidesToScroll: 1,
        centerMode: true,
        afterChange: handleVoiceChange // Add afterChange event handler
    };

 
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
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

    const handleVoiceSelect = (voiceKey) => {
        setActiveButton(voiceKey); 
        const selectedRoleValue = selectedRole[voiceKey] !== undefined ? selectedRole[voiceKey] : 'undefined'; 
        setSelectedRole(prevState => ({
            ...prevState,
            [voiceKey]: selectedRoleValue
        }));
        saveSettings(user_id, voiceKey, currentSpeed, currentFormat, selectedRoleValue)
            .then(() => {
                alert(`Вы выбрали голос ${voiceDescriptionsSecond[selectedCountry][voiceKey].name} с ролью ${selectedRoleValue}\nМожете написать в чат`);
            })
            .catch(error => {
                console.error('Error saving settings:', error);
            });
    };

    const saveSettings = async (user_id, selectedVoice, selectedSpeed, format, role) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: String(user_id), selected_voice: selectedVoice, selected_speed: selectedSpeed, format: format , role: role}),
        };
        console.log(requestOptions)
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
            <div className={style.countryButtons}>
                <button className={style.flagButton} onClick={() => handleCountrySelect('Russia')} style={{ backgroundImage: "url('ru.svg')" }}></button>
                <button className={style.flagButton} onClick={() => handleCountrySelect('Kazakhstan')} style={{ backgroundImage: "url('kaz.svg')" }}></button>
                <button className={style.flagButton} onClick={() => handleCountrySelect('Uzbekistan')} style={{ backgroundImage: "url('uz.svg')" }}></button>
                <button className={style.flagButton} onClick={() => handleCountrySelect('America')} style={{ backgroundImage: "url('usa.svg')" }}></button>
                <button className={style.flagButton} onClick={() => handleCountrySelect('Germany')} style={{ backgroundImage: "url('ge.svg')" }}></button>
            </div>
            <Slider {...settings} className='' >
     {selectedCountry && Object.entries(voiceDescriptionsSecond[selectedCountry]).map(([voiceKey, voice]) => (
    <div key={voiceKey} className={`${style.voice} text-2xl flex ${selectedVoice === voiceKey ? 'selected' : ''}` }>
        <div className='flex'>
            <p className={style.text}>{voice.name}</p>
            <div className={`${style.btns}`}>
                <button className={`mr-1 text-white ${activeButton === voiceKey ? 'bg-[#1677FF]' : 'bg-white'}`} onClick={() => handleVoiceSelect(voiceKey)} >
                    {activeButton === voiceKey ? <img src={img1} alt='' /> : <img src={img3} alt='' />}
                </button>
                <button onClick={() => playAudio(voice.audio)}>
                    <img src={img2} alt='' />
                    <audio src={voice.audio} style={{ display: 'none' }} />
                </button>
            </div>
        </div>
    </div>
))}
            </Slider>
            <Tuning 
                onSaveSettings={handleSaveSettings}
                selectedVoice={selectedVoice}
                selectedCountry={selectedCountry}
                voiceDescriptionsSecond={voiceDescriptionsSecond}
                selectedRole={selectedRole}
                roleLabels={roleLabels}
                setSelectedVoice={setSelectedVoice}
                setActiveButton={setActiveButton}
                setSelectedRole={setSelectedRole}
            />
        </div>
    );
};

export default Voices;
