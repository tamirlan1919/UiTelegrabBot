import React, { useState } from 'react'
import { Slider, Switch } from 'antd';
import style from './tuning.module.css'
const Tuning = () => {
    const [text, setText ] = useState('')
    const handleChange = (event) => {
        setText(event.target.value);
      }
  return (
    <div className = {style.block}>
        <p> Текущая скорость {text} </p>
        <Slider defaultValue={1.0}  max={2.9} min={0.1} step={0.1} />

        <div className= {style.choice}>
            <button>MP3</button>
            <button>WAV</button>
        </div>
    </div>
  )
}

export default Tuning
