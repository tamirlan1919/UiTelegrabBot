import React, { useState, useEffect } from 'react';
import { Slider } from 'antd';
import style from './tuning.module.css';

const Tuning = ({ onSaveSettings }) => {
    const [speed, setSpeed] = useState(1.0);
    const [format, setFormat] = useState('mp3');
    const [height, setHeight] = useState(0);
    const [settingsChanged, setSettingsChanged] = useState(false);
    const [buttonColor, setButtonColor] = useState('#FFFFFF');
    const [color,setColor] = useState('black')
    const [settingsSaved, setSettingsSaved] = useState(false);

    useEffect(() => {
        // Проверка изменения настроек
        if (settingsSaved) {
            setSettingsChanged(false);
            setSettingsSaved(false);
            setButtonColor('#FFFFFF');
            setColor('black')
        }
    }, [settingsSaved]);

    const handleSave = () => {
        onSaveSettings(speed, format);
        setButtonColor('#1677FF');
        setColor('white')

        alert('Настройки сохранены. Теперь выберите голос.');
    };

    const handleSpeedChange = value => {
        setSpeed(value);
        setSettingsChanged(true);
        setButtonColor('#FFFFFF');
        setColor('black')

    };

    const handleHeightChange = value => {
        setHeight(value);
        setSettingsChanged(true);
        setButtonColor('#FFFFFF');
        setColor('black')

    };

    const handleFormatChange = selectedFormat => {
        setFormat(selectedFormat);
        setSettingsChanged(true);
        setButtonColor('#FFFFFF');
        setColor('black')

    };

    return (
        <div className={style.block}>
            <div className="wrapper bg-[#F8F8F8] rounded-[25px] p-4">
                <div className=' float-right'>
                    <button onClick={handleSave} className={`bg-[${buttonColor}] text-${color} p-2 uppercase font-[12px] rounded-lg`}>Сохранить</button>
                </div>
                <div className='mt-[50px]'>
                    <p>Текущая высота голоса</p>
                    <Slider
                        value={height}
                        onChange={handleHeightChange}
                        max={2.9}
                        min={0.1}
                        step={0.1}
                    />
                    <p> Текущая скорость {speed} </p>
                    <Slider
                        value={speed}
                        onChange={handleSpeedChange}
                        max={2.9}
                        min={0.1}
                        step={0.1}
                    />

                    <div className={style.choice}>
                        <button
                            onClick={() => handleFormatChange('mp3')}
                            className={`w-[70px] text-[20px] p-2 ${format === 'mp3' ? 'bg-[#1677FF] text-white' : 'bg-white text-black'} rounded-[7px]`}
                        >
                            MP3
                        </button>
                        <button
                            onClick={() => handleFormatChange('wav')}
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
