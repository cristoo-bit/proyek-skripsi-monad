// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title GeoDataStorage
 * @dev Smart contract to store geospatial points (latitude, longitude, elevation) on Monad blockchain.
 *      Coordinates are scaled by 1e9 to avoid floating-point on-chain.
 */
contract GeoDataStorage {
    struct GeoPoint {
        uint256 id;
        string code;
        int256 latitude;   // latitude in decimal * 1e9
        int256 longitude;  // longitude in decimal * 1e9
        uint256 elevation; // elevation in meters
        uint256 timestamp; // block timestamp when added
    }

    // Mapping from point ID to stored data
    mapping(uint256 => GeoPoint) public geoPoints;
    uint256 public pointCount;

    event PointAdded(
        uint256 indexed id,
        string code,
        int256 latitude,
        int256 longitude,
        uint256 elevation,
        uint256 timestamp
    );

    /**
     * @dev Add a new geospatial point.
     * @param _code A label or code for the point (e.g., "Ats Sungai").
     * @param _lat Latitude decimal degrees multiplied by 1e9.
     * @param _lon Longitude decimal degrees multiplied by 1e9.
     * @param _elev Elevation in meters.
     */
    function addPoint(
        string calldata _code,
        int256 _lat,
        int256 _lon,
        uint256 _elev
    ) external {
        pointCount++;
        geoPoints[pointCount] = GeoPoint(
            pointCount,
            _code,
            _lat,
            _lon,
            _elev,
            block.timestamp
        );
        emit PointAdded(pointCount, _code, _lat, _lon, _elev, block.timestamp);
    }

    /**
     * @dev Retrieve a stored point by its ID.
     * @param _id The ID of the point to retrieve.
     * @return id, code, latitude, longitude, elevation, timestamp
     */
    function getPoint(uint256 _id)
        external
        view
        returns (
            uint256,
            string memory,
            int256,
            int256,
            uint256,
            uint256
        )
    {
        GeoPoint memory p = geoPoints[_id];
        return (p.id, p.code, p.latitude, p.longitude, p.elevation, p.timestamp);
    }

    /**
     * @dev Get total number of stored points.
     */
    function totalPoints() external view returns (uint256) {
        return pointCount;
    }
}
