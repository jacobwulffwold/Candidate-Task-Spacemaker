import { useState } from 'react';
import '../index.css';
import Header from './Header';
import WorkSurface from './WorkSurface';
import SolutionDisplay from './SolutionDisplay'
import StatisticsDisplay from './StatisticsDisplay';

// library for boolean operations
const polygonClipping = require('polygon-clipping');

// input data
var sol1 = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [2.2919046878814697, 48.85770582708133],
            [2.293460369110107, 48.85676699291116],
            [2.29689359664917, 48.85901169495529],
            [2.2952628135681152, 48.860091657242556],
            [2.2919046878814697, 48.85770582708133]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [2.295616865158081, 48.854776323867306],
            [2.299962043762207, 48.85766347403937],
            [2.2930634021759033, 48.859195219601766],
            [2.295616865158081, 48.854776323867306]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [2.2956061363220215, 48.854783383117244],
            [2.2960352897644043, 48.854557486625396],
            [2.298835515975952, 48.85495280481723],
            [2.2995758056640625, 48.85545400732256],
            [2.3002195358276367, 48.857402296155435],
            [2.2999727725982666, 48.85766347403937],
            [2.2967326641082764, 48.85712699907286],
            [2.296217679977417, 48.85673875702427],
            [2.2956061363220215, 48.854783383117244]
          ]
        ]
      }
    }
  ]
}

var sol2 = {
"type": "FeatureCollection",
"features": [
  {
  "type": "Feature",
  "properties": {},
  "geometry": {
      "type": "Polygon",
      "coordinates": [
      [
          [2.3013031482696533, 48.85227022723685],
          [2.301689386367798, 48.85253849146323],
          [2.3020541667938232, 48.852347882818634],
          [2.303706407546997, 48.85345622663062],
          [2.3034167289733887, 48.853703306301384],
          [2.3037922382354736, 48.85392214727714],
          [2.2998225688934326, 48.85644933826542],
          [2.299565076828003, 48.85541871153572],
          [2.2990500926971436, 48.85506575229865],
          [2.29738712310791, 48.8547480868576],
          [2.3013031482696533, 48.85227022723685]
      ]
      ]
  }
  },
  {
  "type": "Feature",
  "properties": {},
  "geometry": {
      "type": "Polygon",
      "coordinates": [
      [
          [2.2954773902893066, 48.85463513865943],
          [2.297945022583008, 48.85306795611288],
          [2.3024833202362056, 48.85619521309753],
          [2.300165891647339, 48.85765641519554],
          [2.2954773902893066, 48.85463513865943]
      ]
      ]
  }
  },
  {
  "type": "Feature",
  "properties": {},
  "geometry": {
      "type": "Polygon",
      "coordinates": [
      [
          [2.2945010662078857, 48.85822111955489],
          [2.295970916748047, 48.85458572374262],
          [2.297601699829101, 48.85410569058372],
          [2.30088472366333, 48.85637168904543],
          [2.300090789794922, 48.85738111951053],
          [2.2945010662078857, 48.85822111955489]
      ]
      ]
  }
  }
]
}

var initial_solution_dict = {0: sol1, 1: sol2}


// main function
export default function App() {

  const [currentIndex, setCurrentIndex] = useState(0); //index of displayed solution
  const [solutionDict, setSolutionDict] = useState(initial_solution_dict); // state of solutions
  const [selectedPolygons, setSelectedPolygons] = useState([]); //array of index of selected polygons, should be changed to set

  function selectPolygon(i){
    setSelectedPolygons([...selectedPolygons, i]);
  }

  function booleanOperation(method){ // Perform boolean operation and update state
    
    if (selectedPolygons.length === 2)  { //for simplicity = 2, but this could be improved to be general

      var newPolygons = polygonClipping[method](solutionDict[currentIndex].features[selectedPolygons[0]].geometry.coordinates, 
        solutionDict[currentIndex].features[selectedPolygons[1]].geometry.coordinates)
      
      var newSolutionDict = solutionDict;

      newSolutionDict[currentIndex].features.splice(selectedPolygons[0], 1);
      newSolutionDict[currentIndex].features.splice(selectedPolygons[1], 1);
      newSolutionDict[currentIndex].features = [...newSolutionDict[currentIndex].features, ...newPolygons.map(eachCoordinates => 
        ({
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": eachCoordinates
          }
        }))];   

      setSelectedPolygons([]);
      setSolutionDict(newSolutionDict);
    }
  }

  return (
    <div className="page_container">
      <Header />
      <div className='app_container'>
        <div className='solutions'>
          <SolutionDisplay onClick = {(i) => setCurrentIndex(i)} numberOfSolutions={Object.keys(solutionDict).length}/>
        </div>
        <div className='workSurface'>
          <WorkSurface currentIndex={currentIndex} solutionDict={solutionDict}
          booleanOperation={(method) => booleanOperation(method)}
          selectPolygon = {(i) => selectPolygon(i)}/>
        </div>
        <div className='statistics'>
          <StatisticsDisplay currentIndex={currentIndex} solutionDict={solutionDict}/>
        </div>
      </div>
    </div>
  );
  }