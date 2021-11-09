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
    <MapContainer center={props.mapCenter} zoom={16} scrollWheelZoom={false} className="mapContainer">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.solutionDict[props.currentIndex].features.map((eachPolygon, index) =>(  //assign an eventhandler to each polygon, key needed for updateability
      <GeoJSON data={eachPolygon} key={props.selectedPolygons.has(index).toString()+hash(eachPolygon)} style={props.selectedPolygons.has(index) ? {'color': '#CD5C5C'} : {'color': '#38f'} } eventHandlers={{click: (ePointer) => {props.selectPolygon(ePointer, index)}}}/>))}
      <div className='leaflet-bottom leaflet-left'>
        <div className='leaflet-control leaflet-bar'>
          <ControlPad onClick={(method) => props.booleanOperation(method)}/>
        </div>
      </div>
    </MapContainer>
    );
}



