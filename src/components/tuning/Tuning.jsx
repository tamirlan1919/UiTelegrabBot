import React, { useState, useEffect } from 'react';
import { Slider, Select } from 'antd';
import style from './tuning.module.css';

const { Option } = Select;

const Tuning = ({ onSaveSettings, selectedVoice, selectedCountry, voiceDescriptionsSecond, selectedRole, roleLabels, setSelectedVoice, setActiveButton, setSelectedRole, isSaved }) => {
    const [speed, setSpeed] = useState(1.0);
    const [format, setFormat] = useState('mp3');
    const [height, setHeight] = useState(0);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        
        if (selectedVoice && voiceDescriptionsSecond[selectedCountry][selectedVoice]) {
            const rolesData = voiceDescriptionsSecond[selectedCountry][selectedVoice].role || [];
            setRoles(rolesData);
            if (rolesData.length === 0 && !selectedRole[selectedVoice]) {
                handleRoleSelect(selectedVoice, undefined);
            }
        } else {
            setRoles([]);
        }
    }, [selectedVoice, selectedCountry, voiceDescriptionsSecond, selectedRole]);

    useEffect(() => {
        
        if (roles.length > 0 && !selectedRole[selectedVoice]) {
            handleRoleSelect(selectedVoice, roles[0]);
        }
    }, [roles, selectedVoice, selectedRole]);

    const handleSave = () => {
        const roleToSave = selectedRole[selectedVoice] === undefined ? undefined : selectedRole[selectedVoice];
        onSaveSettings(speed, format, roleToSave);
    };

    const handleSpeedChange = value => {
        setSpeed(value);
    };

    const handleHeightChange = value => {
        setHeight(value);
    };

    const handleFormatChange = selectedFormat => {
        setFormat(selectedFormat);
    };

    const handleRoleSelect = (voice, role) => {
       console.log(role)
        setSelectedVoice(voice);
        const selectedRoleValue = role === undefined ? "undefined" : role;
        setSelectedRole(prevState => ({
            ...prevState,
            [voice]: selectedRoleValue
        }));
    };
    return (
        <div className={style.block}>
            <div className="wrapper bg-[#F8F8F8] rounded-[25px] p-4">
                <div className=' float-right'>
                    <button onClick={handleSave} className={` text-black p-2 uppercase font-[12px] rounded-lg ${isSaved ? 'bg-[#1677FF] text-white' : 'bg-white  text-black'}`}>Сохранить</button>
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
                    <div style={{marginBottom : "20px"}}>
                    <p style={{ marginBottom: '10px'}}>Роли</p>
                    {roles.length > 0 ? (
                        <Select
                            value={selectedRole[selectedVoice]}
                            className={style.sel}
                            style={{width:"150px"}}
                            onChange={(value) => handleRoleSelect(selectedVoice, value)}
                        >
                            {roles.map((role, index) => (
                                <Option key={index} value={role}>{roleLabels[role]}</Option>
                            ))}
                        </Select>
                    ) : (
                        <Select className={style.sel} value="Нейтральный">
                            <Option value = {undefined}>Нейтральный</Option>
                        </Select> 
                    )}
                    </div>
                    <p>Формат</p>
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
