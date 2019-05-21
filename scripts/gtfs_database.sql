USE gtfs;

CREATE TABLE IF NOT EXISTS agency (
    agency_id VARCHAR(31) NOT NULL PRIMARY KEY,
    agency_name VARCHAR(63) NOT NULL,
    agency_url VARCHAR(255) NOT NULL,
    agency_timezone VARCHAR(127) NOT NULL,
    agency_lang VARCHAR(63)
);

CREATE TABLE IF NOT EXISTS calendar (
    service_id VARCHAR(255) NOT NULL PRIMARY KEY,
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
    service_id VARCHAR(255) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date VARCHAR(8) NOT NULL,
    exception_type TINYINT(2) NOT NULL,
    KEY service_id (service_id),
    KEY exception_type (exception_type)
);

CREATE TABLE IF NOT EXISTS routes (
    route_id VARCHAR(127) PRIMARY KEY,
    agency_id VARCHAR(15),
    route_short_name VARCHAR(15) NOT NULL,
    route_long_name VARCHAR(255) NOT NULL,
    route_type VARCHAR(2) NOT NULL,
    KEY agency_id (agency_id),
    KEY route_type (route_type)
);

CREATE TABLE IF NOT EXISTS shapes (
    shape_id VARCHAR(127) NOT NULL PRIMARY KEY,
    shape_pt_lat DECIMAL(18,16) NOT NULL,
    shape_pt_lon DECIMAL(18,16) NOT NULL,
    shape_pt_sequence SMALLINT(4) NOT NULL,
    shape_dist_traveled DECIMAL(18,16),
    KEY shape_id (shape_id)
);

CREATE TABLE IF NOT EXISTS stops (
    stop_id VARCHAR(63) NOT NULL PRIMARY KEY ,
    stop_name VARCHAR(255) NOT NULL,
    stop_lat DECIMAL(18,16) NOT NULL,
    stop_lon DECIMAL(18,16) NOT NULL,
    KEY stop_lat (stop_lat),
    KEY stop_lon (stop_lon)
);

CREATE TABLE IF NOT EXISTS stop_times (
    trip_id VARCHAR(100) NOT NULL PRIMARY KEY,
    arrival_time TIME NOT NULL,
    departure_time TIME NOT NULL,
    stop_id VARCHAR(100) NOT NULL,
    stop_sequence SMALLINT(4) NOT NULL,
    stop_headsign VARCHAR(127),
    pickup_type VARCHAR(2),
    drop_off_type VARCHAR(2),
    shape_dist_traveled DECIMAL(18, 16),
    KEY trip_id (trip_id),
    KEY arrival_time (arrival_time),
    KEY departure_time (departure_time),
    KEY stop_id (stop_id),
    KEY stop_sequence (stop_sequence),
    KEY pickup_type (pickup_type),
    KEY drop_off_type (drop_off_type)
);

CREATE TABLE IF NOT EXISTS transfers (
    from_stop_id VARCHAR(63) NOT NULL PRIMARY KEY ,
    to_stop_id VARCHAR(63) NOT NULL,
    transfer_type TINYINT(1) NOT NULL,
    min_transfer_time VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS trips (
    route_id VARCHAR(127) NOT NULL AUTO_INCREMENT,
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

LOAD DATA LOCAL INFILE 'agency.txt' INTO TABLE agency FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES;
LOAD DATA LOCAL INFILE 'calendar.txt' INTO TABLE calendar FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES;
LOAD DATA LOCAL INFILE 'calendar_dates.txt' INTO TABLE calendar_dates FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES;
LOAD DATA LOCAL INFILE 'routes.txt' INTO TABLE routes FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES;
LOAD DATA LOCAL INFILE 'shapes.txt' INTO TABLE shapes FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES;
LOAD DATA LOCAL INFILE 'stops.txt' INTO TABLE stops FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES;
LOAD DATA LOCAL INFILE 'stop_times.txt' INTO TABLE stop_times FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES;
LOAD DATA LOCAL INFILE 'trips.txt' INTO TABLE trips FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES;
