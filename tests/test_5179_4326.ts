
import assert from "assert";
import * as fs from 'fs';
import { FeatureCollection, LineString, Point } from "geojson";
import path from "path";
import { fromWGS84, toWGS84 } from "../src";
const __dirname = path.resolve();

describe('Test Suite, EPSG:5179 => EPSG:4326', function () {
    it('Test 1, Polygon Layer file', function () {
        this.timeout(60000)

        const epsg_5179 = '+ proj=tmerc +lat_0=38 + lon_0=127.5 + k=0.9996 + x_0=1000000 + y_0=2000000 + ellps=GRS80 + towgs84=0, 0, 0, 0, 0, 0, 0 + units=m + no_defs'

        const geojsonBigPolygon5179 = path.resolve(__dirname, "tests", 'data/Korea-SiDo-5179.geojson');
        const testGeojson: FeatureCollection = JSON.parse(fs.readFileSync(geojsonBigPolygon5179).toString());
        const geojson4326 = toWGS84(testGeojson, epsg_5179);

        const strGeojson4326 = JSON.stringify(geojson4326);
        fs.writeFile(path.join(__dirname, "tests", "data/result_5179to4326.geojson"), strGeojson4326, () => {
            console.log("done");
        })

        // testGeojson.features.forEach((orgFeature, idx) => {
        //     const org_coordinates: number[][] = (orgFeature.geometry as LineString).coordinates;
        //     const conv_coordinates: number[][] = (geojson4326.features[idx].geometry as LineString).coordinates;

        //     org_coordinates.forEach((org_point, idx_j) => {
        //         assert.ok(conv_coordinates[idx_j][0] - org_point[0] < 1E7)
        //         assert.ok(conv_coordinates[idx_j][1] - org_point[1] < 1E7)
        //     })
        // })
    })

});

