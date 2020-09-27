import React, { useEffect, useRef, useState } from 'react'
import getColors from 'get-image-colors'
import Horse from './horse.jpg'
import './App.css'
export default function App() {
  const [activeImage, setActiveImage] = useState(Horse)
  const [activeColor, setActiveColor] = useState(null)
  const upload = useRef(null)
  useEffect(() => {
    getColors(activeImage, {
      count: 10,

    }).then(color => {
      setActiveColor(color)
    })

  }, [activeImage])
  const rgbaToHex = (rgba) => `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setActiveImage(URL.createObjectURL(file))
    }
  }
  return (
    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', flexDirection: 'column' }}>
      <img onClick={() => { upload.current.click() }} src={activeImage} width={'25%'} style={{ alignSelf: 'center' }} />
      <input id="myInput"
        type="file"
        ref={upload}
        style={{ display: 'none' }}
        onChange={onChangeFile}
      />

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '5%', backgroundColor: '#fff' }}>
        {activeColor ? activeColor.map(item => <div className="item" style={{

          backgroundColor: item, padding: '2rem', color: '#ccc', borderRadius: 25, border: '2px solid #fafafa', transition: '0.5s'
        }}>{rgbaToHex(item['_rgb'])} </div>) : <div>Renk yok</div>}
      </div>

    </div>
  )
}