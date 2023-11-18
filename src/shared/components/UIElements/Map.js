// import React, { useRef, useEffect } from "react";
// import "ol/ol.css"; // Import OpenLayers CSS
// import { Map as OLMap, View} from "ol"; // Import required OpenLayers modules
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import { useGeographic } from "ol/proj";
// import Feature from "ol/Feature";
// import Point from "ol/geom/Point";
// import { Icon, Style } from "ol/style";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";

import "./Map.css";

const Map = (props) => {
//   useGeographic();

//   const mapRef = useRef();
//   const iconRef = useRef(); // Ref for the icon feature

//   const { center, zoom } = props;

//   useEffect(() => {
//     if (mapRef.current) {
//       const map = new OLMap({
//         target: mapRef.current,
//         layers: [
//           new TileLayer({
//             source: new OSM(),
//           }),
//         ],
//         view: new View({
//           center: [center.lng, center.lat],
//           zoom: zoom,
//         }),
//       });

//       // Remove previous icon feature if it exists
//       if (iconRef.current) {
//         map.removeLayer(iconRef.current);
//       }

//       // Create a new icon feature at the given center
//       const iconFeature = new Feature({
//         geometry: new Point([center.lng, center.lat]),
//       });

//       // Define the icon style
//       const iconStyle = new Style({
//         image: new Icon({
//           src: require("./location.png"), // Replace with the path to your icon image
//           anchor: [0.5, 1], // Center of the icon should be at the location point
//         }),
//       });

//       iconFeature.setStyle(iconStyle);

//       // Create a vector layer with the icon feature
//       const iconLayer = new VectorLayer({
//         source: new VectorSource({
//           features: [iconFeature],
//         }),
//       });

//       map.addLayer(iconLayer);

//       // Store the icon layer in the ref for future removal
//       iconRef.current = iconLayer;
//     }
//   }, [center, zoom]);

  return (
    <div
    //   ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ><iframe className="google-map" title="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5811.212249924712!2d78.08245412179298!3d11.713615069990425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babfa3400000001%3A0x786937287cc3f1eb!2sGovernment%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1696432431271!5m2!1sen!2sin" width="600" height="450" style={{border:'0',height:"15rem"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  );
};

export default Map;
