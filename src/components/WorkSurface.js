import '../index.css';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polygon, MapConsumer, useMap  } from 'react-leaflet';
import L from 'leaflet';

var hash = require('object-hash');

function ControlPad (props){

  return(
  <div className='controlPad'>
    <button id='AND' onClick={() => props.onClick('intersection')} className="controlPadButton">
      intersect
    </button>
    <button id='OR' onClick={() => props.onClick('union')} className="controlPadButton">
      union
    </button>
  </div>
  );
}


export default function WorkSurface(props) {
  return(
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="mapContainer">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    )
};


// <MapContainer center={[48.85770582708133, 2.2919046878814697]} zoom={14} scrollWheelZoom={false} className="mapContainer">
//       <TileLayer
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {props.solutionDict[props.currentIndex].features.map((eachPolygon, index) =>( 
//       <GeoJSON data={eachPolygon} key={hash(eachPolygon)} eventHandlers={{click: () => {props.selectPolygon(index)}}}/>))}
//       <div className='leaflet-bottom leaflet-left'>
//         <div className='leaflet-control leaflet-bar'>
//           <ControlPad onClick={(method) => props.booleanOperation(method)}/>
//         </div>
//       </div>
//     </MapContainer>