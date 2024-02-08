import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './voices.module.css';
import { GrCaretNext } from 'react-icons/gr';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import img1 from './Vector.svg'
import img2 from './SVG.svg'
const Voices = () => {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  const voiceDescriptionsSecond = {
    filipp: 'Филипп 👤',
    ermil: 'Ермил 👤',
    madirus: 'Мадирас 👤',
    omazh: 'Омаж 👤',
    zahar: 'Захар 👤',
    alexander: 'Александр 👤',
    kirill: 'Кирилл 👤',
    anton: 'Антон 👤',
    alena: 'Алёна 💅',
    dasha: 'Даша 💅',
    julia: 'Юлия 💅',
    lera: 'Лера 💅',
    masha: 'Маша 💅',
    marina: 'Марина 💅',
    jane: 'Джейн 💅',

  };

 
  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
    // Здесь вы можете вызвать функцию для отправки выбранного голоса в ваш Python Telegram Bot
    // Например, можно использовать fetch или axios для отправки запроса на сервер.
  };

  return (
    <div className={style.top}>
      <h1 className=' text-[32px] mb-[25px] text-left text-white ml-10 bold-[700]'>Выберите голос</h1>
      <Slider {...settings}>
        {Object.keys(voiceDescriptionsSecond).map((voice) => (
          <div
            key={voice}
            
            className={`${style.voice} text-2xl flex ${selectedVoice === voice ? 'selected' : ''}`}
            onClick={() => handleVoiceSelect(voice)}
          >
            <div className='flex'>
              <p className={style.text}>{voiceDescriptionsSecond[voice]}</p>
            
            <div className={`${style.btns} `}>
              <button className='mr-1 bg-[#1677FF] text-white'>
                <img src={img1} alt="" />
              </button>
              <button>
                <img src= {img2} alt="" />
              </button>
            </div>
          </div>
          </div>
        ))}
      </Slider>

    </div>
  );
};

export default Voices;
