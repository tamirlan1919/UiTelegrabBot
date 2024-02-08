// Tuning.jsx
import React, { useState } from 'react'
import { Slider, Switch } from 'antd';
import style from './tuning.module.css'
import { Button, Flex } from 'antd';

const Tuning = ({ onSaveSettings }) => { // Принимаем onSaveSettings как пропс из Voices.jsx
    const [height, setHeight] = useState(0); // Добавлено состояние для высоты голоса
    const [speed, setSpeed] = useState(1.0); // Добавлено состояние для скорости голоса
    const [format, setFormat] = useState('mp3'); // Добавлено состояние для формата голоса

    const handleSave = () => {
        onSaveSettings(speed, format); // Вызываем функцию onSaveSettings из Voices.jsx и передаем текущие значения скорости и формата
    }

    return (
        <div className={style.block}>
            <div className="wrapper bg-[#F8F8F8] rounded-[25px] p-4">
                <div className=' float-right'>
                    <button onClick={handleSave} className='bg-[#1677FF] text-white p-2 uppercase font-[12px] rounded-lg'>Сохранить</button>
                </div>
                <div className='mt-[50px]'>
                    <p>Текущая высота голоса</p>
                    <Slider
                        value={height}
                        onChange={setHeight}
                        max={2.9}
                        min={0.1}
                        step={0.1}
                    />
                    <p> Текущая скорость {speed} </p>
                    <Slider
                        value={speed}
                        onChange={setSpeed}
                        max={2.9}
                        min={0.1}
                        step={0.1}
                    />

                    <div className={style.choice}>
                        <button onClick={() => setFormat('mp3')} className='bg-[#1677FF] w-[70px] text-[white] max-h-[70px] rounded-[7px] text-[20px] p-2'>MP3</button>
                        <button onClick={() => setFormat('wav')} className='bg-white w-[70px] text-[black] max-h-[70px] rounded-[7px] text-[20px] p-2'>WAV</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tuning
