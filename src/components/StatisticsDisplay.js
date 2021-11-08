import '../index.css';
import * as turf from '@turf/turf';


export default function StatisticsDisplay(props) {

    function getArea(FCollection) {
       
        if (FCollection.length > 0) {
            var unionFeature = turf.polygon(FCollection.features[0].geometry.coordinates)

            // get union of all features to prevent counting intersections double
            for (let i = 1; i < FCollection.features.length; i++) {
                unionFeature = turf.union(unionFeature, turf.polygon(FCollection.features[i].geometry.coordinates));
            }
            return Math.round(turf.area(unionFeature));
        }
        else{
            return 0;
        }
    }

    return(
        <div className='statisticsDisplay'>
            Area covered: {getArea(props.solutionDict[props.currentIndex])} square metres
        </div>
    );


}