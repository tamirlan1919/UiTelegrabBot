import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './voices.module.css';
import { GrCaretNext } from 'react-icons/gr';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';

const Voices = () => {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  const voiceDescriptions = {
    alena: 'Алёна 💅',
    filipp: 'Филипп 👤',
    ermil: 'Ермил 👤',
    jane: 'Джейн 💅',
    madirus: 'Мадирас 👤',
    omazh: 'Омаж 👤',
    zahar: 'Захар 👤',
  };

  const voiceDescriptionsSecond = {
    dasha: 'Даша 💅',
    julia: 'Юлия 💅',
    lera: 'Лера 💅',
    masha: 'Маша 💅',
    marina: 'Марина 💅',
    alexander: 'Александр 👤',
    kirill: 'Кирилл 👤',
    anton: 'Антон 👤',
  };

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
    // Здесь вы можете вызвать функцию для отправки выбранного голоса в ваш Python Telegram Bot
    // Например, можно использовать fetch или axios для отправки запроса на сервер.
  };

  return (
    <div className={style.top}>
      <Slider {...settings}>
        {Object.keys(voiceDescriptions).map((voice) => (
          <div
            key={voice}
            
            className={`${style.voice} text-2xl  ${selectedVoice === voice ? 'selected' : ''}`}
            onClick={() => handleVoiceSelect(voice)}
          >
            <p className={style.text}>{voiceDescriptions[voice]}</p>
            <div className={style.btns}>
              <button>
                <GrCaretNext />
              </button>
              <button>
                <IoCheckmarkDoneSharp />
              </button>
            </div>
          </div>
        ))}
      </Slider>
      <Slider {...settings}>
        {Object.keys(voiceDescriptionsSecond).map((voice) => (
          <div
            key={voice}
            className={`${style.voice} ${selectedVoice === voice ? 'selected' : ''}`}
            onClick={() => handleVoiceSelect(voice)}
          >
            <p className={style.text}>{voiceDescriptionsSecond[voice]}</p>
            <div className={style.btns}>
              <button>
                <GrCaretNext />
              </button>
              <button>
                <IoCheckmarkDoneSharp />
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Voices;
