'use strict'
import { BBox, Feature, FeatureCollection, GeoJsonObject, Geometry, GeometryCollection, LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon } from 'geojson';
import proj from 'proj4';

class TransformGeoJSON {
    srs: string = ""
    isForward: boolean = false;
    func?: (coord: number[]) => number[];

    constructor(srs: string, isForward: boolean) {
        this.srs = srs;
        this.isForward = isForward;
        if (isForward) {
            this.func = (coord) => proj(srs).forward<number[]>(coord)
        } else {
            this.func = (coord) => proj(srs).inverse<number[]>(coord)
        }
    }

    point = (coord: TemplateCoordinates): TemplateCoordinates => {
        if (!this.func)
            throw new Error("not difined func.");
        return this.func(coord);
    };
    line = (line: TemplateCoordinates[]): TemplateCoordinates[] => {
        return line.map(this.point, this);
    };
    multiLine = (lnGroup: TemplateCoordinates[][]): TemplateCoordinates[][] => {
        return lnGroup.map(this.line, this);
    };
    multiPoly = (multPoly: TemplateCoordinates[][][]): TemplateCoordinates[][][] => {
        return multPoly.map(this.multiLine, this);
    };
    geometries = (geometries: Geometry[]): Geometry[] => {
        return geometries.map(this.geometry, this);
    };
    bbox = (bbox: BBox): BBox => {
        return this.point(bbox.slice(0, 2)).concat(this.point(bbox.slice(2))) as BBox;
    };

    geometry = (geometry: Geometry): Geometry => {
        var out: Geometry = { ...geometry };
        if (geometry.bbox)
            out.bbox = this.bbox(geometry.bbox);

        switch (geometry.type) {
            case "Point":
                (out as Point).coordinates = this.point(geometry.coordinates);
                return out;

            case "LineString":
                (out as LineString).coordinates = this.line(geometry.coordinates);
                return out;

            case "MultiPoint":
                (out as MultiPoint).coordinates = this.line(geometry.coordinates);
                return out;

            case "MultiLineString":
                (out as MultiLineString).coordinates = this.multiLine(geometry.coordinates);
                return out;

            case "Polygon":
                (out as Polygon).coordinates = this.multiLine(geometry.coordinates);
                return out;

            case "MultiPolygon":
                (out as MultiPolygon).coordinates = this.multiPoly(geometry.coordinates);
                return out;

            case "GeometryCollection":
                (out as GeometryCollection).geometries = this.geometries(geometry.geometries);
                return out;

            default:
                return out;
        }
    };

    feature = (feature: Feature): Feature => {
        var out: Feature = { ...feature };

        out.geometry = this.geometry(feature.geometry);
        return out;
    }

    featureCollection = (fc: FeatureCollection) => {

        var out: FeatureCollection = { ...fc };

        if (fc.bbox) {
            out.bbox = this.bbox(fc.bbox);
        }
        out.features = fc.features.map(this.feature, this);
        return out;
    }
}


const toWGS84 = (geojson: GeoJsonObject, srs: string) => {
    const tFunc = new TransformGeoJSON(srs, false);
    return tFunc.featureCollection(geojson as FeatureCollection);
}

const fromWGS84 = (geojson: GeoJsonObject, srs: string) => {
    const tFunc = new TransformGeoJSON(srs, true);
    return tFunc.featureCollection(geojson as FeatureCollection);
}

type TemplateCoordinates = number[];

export default TransformGeoJSON;
export { toWGS84, fromWGS84 };
