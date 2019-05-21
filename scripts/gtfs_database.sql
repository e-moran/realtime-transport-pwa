USE gtfs;

CREATE TABLE IF NOT EXISTS agency (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    agency_id VARCHAR(31) NOT NULL,
    agency_name VARCHAR(63) NOT NULL,
    agency_url VARCHAR(255) NOT NULL,
    agency_timezone VARCHAR(127) NOT NULL,
    agency_lang VARCHAR(63),
    KEY agency_id (agency_id)
);

CREATE TABLE IF NOT EXISTS calendar (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    service_id VARCHAR(255) NOT NULL,
    monday TINYINT(1) NOT NULL,
    tuesday TINYINT(1) NOT NULL,
    wednesday TINYINT(1) NOT NULL,
    thursday TINYINT(1) NOT NULL,
    friday TINYINT(1) NOT NULL,
    saturday TINYINT(1) NOT NULL,
    sunday TINYINT(1) NOT NULL,
    start_date VARCHAR(8) NOT NULL,
    end_date VARCHAR(8) NOT NULL,
    KEY service_id (service_id)
);

CREATE TABLE IF NOT EXISTS calendar_dates (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    service_id VARCHAR(255) NOT NULL,
    date VARCHAR(8) NOT NULL,
    exception_type TINYINT(2) NOT NULL,
    KEY exception_type (exception_type),
    KEY service_id (service_id)
);

CREATE TABLE IF NOT EXISTS routes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    route_id VARCHAR(127),
    agency_id VARCHAR(15),
    route_short_name VARCHAR(15) NOT NULL,
    route_long_name VARCHAR(255) NOT NULL,
    route_type VARCHAR(2) NOT NULL,
    KEY route_id (route_id),
    KEY agency_id (agency_id),
    KEY route_type (route_type)
);

CREATE TABLE IF NOT EXISTS shapes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    shape_id VARCHAR(127) NOT NULL,
    shape_pt_lat DECIMAL(18,16) NOT NULL,
    shape_pt_lon DECIMAL(18,16) NOT NULL,
    shape_pt_sequence SMALLINT(4) NOT NULL,
    shape_dist_traveled DECIMAL(24,16),
    KEY shape_id (shape_id)
);

CREATE TABLE IF NOT EXISTS stops (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    stop_id VARCHAR(63) NOT NULL,
    stop_name VARCHAR(255) NOT NULL,
    stop_lat DECIMAL(18,16) NOT NULL,
    stop_lon DECIMAL(18,16) NOT NULL,
    KEY stop_id (stop_id),
    KEY stop_lat (stop_lat),
    KEY stop_lon (stop_lon)
);

CREATE TABLE IF NOT EXISTS stop_times (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    trip_id VARCHAR(100) NOT NULL,
    arrival_time TIME NOT NULL,
    departure_time TIME NOT NULL,
    stop_id VARCHAR(100) NOT NULL,
    stop_sequence SMALLINT(4) NOT NULL,
    stop_headsign VARCHAR(127),
    pickup_type VARCHAR(2),
    drop_off_type VARCHAR(2),
    shape_dist_traveled DECIMAL(24, 16),
    KEY trip_id (trip_id),
    KEY arrival_time (arrival_time),
    KEY departure_time (departure_time),
    KEY stop_id (stop_id),
    KEY stop_sequence (stop_sequence),
    KEY pickup_type (pickup_type),
    KEY drop_off_type (drop_off_type)
);

CREATE TABLE IF NOT EXISTS transfers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    from_stop_id VARCHAR(63) NOT NULL,
    to_stop_id VARCHAR(63) NOT NULL,
    transfer_type TINYINT(1) NOT NULL,
    min_transfer_time VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS trips (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    route_id VARCHAR(127) NOT NULL,
    service_id VARCHAR(127) NOT NULL,
    trip_id VARCHAR(255),
    shape_id VARCHAR(127),
    trip_headsign VARCHAR(255),
    direction_id TINYINT(1),
    KEY route_id (route_id),
    KEY service_id (service_id),
    KEY shape_id (shape_id),
    KEY direction_id (direction_id)
);
