import { useState, useEffect } from 'react'
import './App.css';
import { Map } from './Map'
import { default as allegationsPerPrecinct } from './data/allegationsByPrecinct.json'

const url = 'https://opendata.arcgis.com/datasets/c35786feb0ac4d1b964f41f874f151c1_0.geojson'

function App() {

  const [data, setData] = useState()

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(res => setData(res))
  }, [])
  
  return (
    <div className="App">
      <Map geoJson={data} allegationsPerPrecinct={allegationsPerPrecinct}/>
    </div>
  );
}

export default App;
