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

### Custom Coordinates Reference System.
you can easily to use custom CRS with params from epsg.io same like proj4

```javascript
const epsg_5179 = '+ proj=tmerc +lat_0=38 + lon_0=127.5 + k=0.9996 + x_0=1000000 + y_0=2000000 + ellps=GRS80 + towgs84=0, 0, 0, 0, 0, 0, 0 + units=m + no_defs'
const geojson4326 = toWGS84(testGeojson, epsg_5179);
```


## LICENSE

Licensed [MIT](https://github.com/Jeongyong-park/csv-geojson-convmocha/blob/master/LICENSE)