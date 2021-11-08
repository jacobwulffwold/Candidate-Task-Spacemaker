import "leaflet/dist/leaflet.css";
import '../index.css';
import { MapContainer, TileLayer, GeoJSON  } from 'react-leaflet';


var hash = require('object-hash');

function ControlPad (props){

  return(
  <div className='controlPad'>
    <button onClick={() => props.onClick('intersection')} className="controlPadButton">
      intersect
    </button>
    <button onClick={() => props.onClick('union')} className="controlPadButton">
      union
    </button>
  </div>
  );
}


export default function WorkSurface(props) {
  return(
    <MapContainer center={[48.85770582708133, 2.2919046878814697]} zoom={15} scrollWheelZoom={false} className="mapContainer">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.solutionDict[props.currentIndex].features.map((eachPolygon, index) =>(  //assign an eventhandler to each polygon, key needed for updateability
      <GeoJSON data={eachPolygon} key={hash(eachPolygon)} eventHandlers={{click: () => {props.selectPolygon(index)}}}/>))}
      <div className='leaflet-bottom leaflet-left'>
        <div className='leaflet-control leaflet-bar'>
          <ControlPad onClick={(method) => props.booleanOperation(method)}/>
        </div>
      </div>
    </MapContainer>
    );
}



