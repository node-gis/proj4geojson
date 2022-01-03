## @node-gis/proj4geojson
Easily convert coordinate system for GIS vector data in GeoJSON format by Proj.4 JS

## Install
``` sh
//npm
npm install @node-gis/proj4geojson

//yarn
yarn add @node-gis/proj4geojson
```

## Quick Start.

[![Edit hungry-elion-hpios](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/hungry-elion-hpios?fontsize=14&hidenavigation=1&theme=dark)

```javascript
    // WGS84 to EPSG:3857
    const conv_geojson = fromWGS84(objGeoJson, "EPSG:3857");

    // EPSG:3857 to  WGS84
    const conv_geojson = toWGS84(objGeoJson, "EPSG:3857");
```


## LICENSE

Licensed [MIT](https://github.com/Jeongyong-park/csv-geojson-convmocha/blob/master/LICENSE)