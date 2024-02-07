import React, { useState } from 'react'
import { Slider, Switch } from 'antd';
import style from './tuning.module.css'
import { Button, Flex } from 'antd';

const Tuning = () => {
    const [text, setText ] = useState('')
    const handleChange = (event) => {
        setText(event.target.value);
      }
  return (
    <div className = {style.block}>
      <div className="wrapper bg-[#F8F8F8] rounded-[25px] p-4">
        <div className=' float-right'>
          <button className='bg-[#1677FF] text-white p-2 uppercase font-[12px] rounded-lg'>Сохранить</button>
        </div>
        <div className='mt-[50px]'>
          <p>Текущая высота голоса</p>
          <Slider defaultValue={0}  max={2.9} min={0.1} step={0.1} />
          <p> Текущая скорость {text} </p>
          <Slider defaultValue={1.0}  max={2.9} min={0.1} step={0.1} />

          <div className= {style.choice}>
              <Button type="primary">MP3</Button>
              <Button>WAV</Button>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Tuning
