import React, { useEffect } from 'react';
import styles from './index.less';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

export default () => {
  useEffect(() => {
    // Your access token can be found at: https://cesium.com/ion/tokens.
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZjg4ZjAyOS1kY2Q5LTRjZmEtOTc4ZC0xNDI5MjU4M2Y0OWMiLCJpZCI6NTY1ODIsImlhdCI6MTYyMTU3ODQ2MX0.Gpw3pmbADNcqnKElwOIFXUEG6fvDssG2876gfhmAtCQ';
    // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: Cesium.createWorldTerrain(),
    });
    // viewer.animation.container.style.display = 'none'; //隐藏动画控件
    viewer.timeline.container.style.display = 'none'; //隐藏时间线控件
    // viewer.geocoder.container.style.display = 'none'; //隐藏地名查找控件
    viewer.cesiumWidget.creditContainer.style.display = 'none'; //隐藏ceisum标识
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
      },
    });
  }, []);
  return <div id="cesiumContainer" className={styles.cesiumContainer}></div>;
};
