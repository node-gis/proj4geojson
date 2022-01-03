import { BBox, Feature, FeatureCollection, GeoJsonObject, Geometry } from 'geojson';
declare class TransformGeoJSON {
    srs: string;
    isForward: boolean;
    func?: (coord: number[]) => number[];
    constructor(srs: string, isForward: boolean);
    point: (coord: TemplateCoordinates) => TemplateCoordinates;
    line: (line: TemplateCoordinates[]) => TemplateCoordinates[];
    multiLine: (lnGroup: TemplateCoordinates[][]) => TemplateCoordinates[][];
    multiPoly: (multPoly: TemplateCoordinates[][][]) => TemplateCoordinates[][][];
    geometries: (geometries: Geometry[]) => Geometry[];
    bbox: (bbox: BBox) => BBox;
    geometry: (geometry: Geometry) => Geometry;
    feature: (feature: Feature) => Feature;
    featureCollection: (fc: FeatureCollection) => FeatureCollection<Geometry, import("geojson").GeoJsonProperties>;
}
declare const toWGS84: (geojson: GeoJsonObject, srs: string) => FeatureCollection<Geometry, import("geojson").GeoJsonProperties>;
declare const fromWGS84: (geojson: GeoJsonObject, srs: string) => FeatureCollection<Geometry, import("geojson").GeoJsonProperties>;
declare type TemplateCoordinates = number[];
export default TransformGeoJSON;
export { toWGS84, fromWGS84 };
//# sourceMappingURL=index.d.ts.map