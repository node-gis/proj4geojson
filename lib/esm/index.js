'use strict';
import proj from 'proj4';
class TransformGeoJSON {
    constructor(srs, isForward) {
        this.srs = "";
        this.isForward = false;
        this.point = (coord) => {
            if (!this.func)
                throw new Error("not difined func.");
            return this.func(coord);
        };
        this.line = (line) => {
            return line.map(this.point, this);
        };
        this.multiLine = (lnGroup) => {
            return lnGroup.map(this.line, this);
        };
        this.multiPoly = (multPoly) => {
            return multPoly.map(this.multiLine, this);
        };
        this.geometries = (geometries) => {
            return geometries.map(this.geometry, this);
        };
        this.bbox = (bbox) => {
            return this.point(bbox.slice(0, 2)).concat(this.point(bbox.slice(2)));
        };
        this.geometry = (geometry) => {
            var out = Object.assign({}, geometry);
            if (geometry.bbox)
                out.bbox = this.bbox(geometry.bbox);
            switch (geometry.type) {
                case "Point":
                    out.coordinates = this.point(geometry.coordinates);
                    return out;
                case "LineString":
                    out.coordinates = this.line(geometry.coordinates);
                    return out;
                case "MultiPoint":
                    out.coordinates = this.line(geometry.coordinates);
                    return out;
                case "MultiLineString":
                    out.coordinates = this.multiLine(geometry.coordinates);
                    return out;
                case "Polygon":
                    out.coordinates = this.multiLine(geometry.coordinates);
                    return out;
                case "MultiPolygon":
                    out.coordinates = this.multiPoly(geometry.coordinates);
                    return out;
                case "GeometryCollection":
                    out.geometries = this.geometries(geometry.geometries);
                    return out;
                default:
                    return out;
            }
        };
        this.feature = (feature) => {
            var out = Object.assign({}, feature);
            out.geometry = this.geometry(feature.geometry);
            return out;
        };
        this.featureCollection = (fc) => {
            var out = Object.assign({}, fc);
            if (fc.bbox) {
                out.bbox = this.bbox(fc.bbox);
            }
            out.features = fc.features.map(this.feature, this);
            return out;
        };
        this.srs = srs;
        this.isForward = isForward;
        if (isForward) {
            this.func = (coord) => proj(srs).forward(coord);
        }
        else {
            this.func = (coord) => proj(srs).inverse(coord);
        }
    }
}
const toWGS84 = (geojson, srs) => {
    const tFunc = new TransformGeoJSON(srs, false);
    return tFunc.featureCollection(geojson);
};
const fromWGS84 = (geojson, srs) => {
    const tFunc = new TransformGeoJSON(srs, true);
    return tFunc.featureCollection(geojson);
};
export default TransformGeoJSON;
export { toWGS84, fromWGS84 };
//# sourceMappingURL=index.js.map