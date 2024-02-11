import React, { useState } from 'react';
import { Slider } from 'antd';
import style from './tuning.module.css';
import { Button } from 'antd';

const Tuning = ({ onSaveSettings }) => {
    const [height, setHeight] = useState(0);
    const [speed, setSpeed] = useState(1.0);
    const [format, setFormat] = useState('mp3'); // Добавлено состояние для формата голоса

    const handleSave = () => {
        onSaveSettings(speed, format);
    };

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
                        <button
                            onClick={() => setFormat('mp3')}
                            className={`w-[70px] text-[20px] p-2 ${format === 'mp3' ? 'bg-[#1677FF] text-white' : 'bg-white text-black'} rounded-[7px]`}
                        >
                            MP3
                        </button>
                        <button
                            onClick={() => setFormat('wav')}
                            className={`w-[70px] text-[20px] p-2 ${format === 'wav' ? 'bg-[#1677FF] text-white' : 'bg-white text-black'} rounded-[7px]`}
                        >
                            WAV
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tuning;
