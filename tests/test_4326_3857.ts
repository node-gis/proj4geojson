
import assert from "assert";
import * as fs from 'fs';
import { FeatureCollection, LineString, Point } from "geojson";
import path from "path";
import { fromWGS84, toWGS84 } from "../src";
const __dirname = path.resolve();

describe('Test Suite, EPSG:4326 => EPSG:3857', function () {
    it('Test 1. Point Layer', function () {

        const geojsonPoint4326 = path.resolve(__dirname, "tests", 'data/test_point_4326.geojson');
        const testGeojson: FeatureCollection = JSON.parse(fs.readFileSync(geojsonPoint4326).toString());
        const geojson3857 = fromWGS84(testGeojson, "EPSG:3857");

        assert.equal((geojson3857.features.find(f => f.id === 1)?.geometry as Point).coordinates[0], -10018754.171394622)
        assert.equal((geojson3857.features.find(f => f.id === 4)?.geometry as Point).coordinates[0], -10018754.171394622)

        assert.equal((geojson3857.features.find(f => f.id === 2)?.geometry as Point).coordinates[0], 0)
        assert.equal((geojson3857.features.find(f => f.id === 5)?.geometry as Point).coordinates[0], 0)

        assert.equal((geojson3857.features.find(f => f.id === 3)?.geometry as Point).coordinates[0], 10018754.171394622)
        assert.equal((geojson3857.features.find(f => f.id === 6)?.geometry as Point).coordinates[0], 10018754.171394622)

        assert.ok(Math.abs((geojson3857.features.find(f => f.id === 1)?.geometry as Point).coordinates[1]) < 1E7)
        assert.ok(Math.abs((geojson3857.features.find(f => f.id === 2)?.geometry as Point).coordinates[1]) < 1E7)
        assert.ok(Math.abs((geojson3857.features.find(f => f.id === 3)?.geometry as Point).coordinates[1]) < 1E7)

        assert.equal((geojson3857.features.find(f => f.id === 4)?.geometry as Point).coordinates[1], 5621521.486192066)
        assert.equal((geojson3857.features.find(f => f.id === 5)?.geometry as Point).coordinates[1], 5621521.486192066)
        assert.equal((geojson3857.features.find(f => f.id === 6)?.geometry as Point).coordinates[1], 5621521.486192066)
    })

    it('Test 2, Polyline Layer', function () {

        const geojsonPolyline4326 = path.resolve(__dirname, "tests", 'data/test_polyline_4326.geojson');
        const testGeojson: FeatureCollection = JSON.parse(fs.readFileSync(geojsonPolyline4326).toString());
        const geojson3857 = fromWGS84(testGeojson, "EPSG:3857");
        const geojson4326 = toWGS84(geojson3857, "EPSG:3857");

        testGeojson.features.forEach((orgFeature, idx) => {
            const org_coordinates: number[][] = (orgFeature.geometry as LineString).coordinates;
            const conv_coordinates: number[][] = (geojson4326.features[idx].geometry as LineString).coordinates;

            org_coordinates.forEach((org_point, idx_j) => {
                assert.ok(conv_coordinates[idx_j][0] - org_point[0] < 1E7)
                assert.ok(conv_coordinates[idx_j][1] - org_point[1] < 1E7)
            })
        })
    })

});

