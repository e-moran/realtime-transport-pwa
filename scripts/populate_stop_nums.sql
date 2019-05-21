# Download StopPoints.csv from the Transport for Ireland website to run this script
USE gtfs;

CREATE TABLE stop_id_nums (
    stop_id VARCHAR(63),
    stop_num INT
);

LOAD DATA LOCAL INFILE 'StopPoints.csv' INTO TABLE stop_id_nums FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 LINES
    (@dummy,@dummy,@dummy,@dummy,@dummy,stop_id,stop_num,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy);

UPDATE stops
SET stop_num =
    (SELECT stop_num FROM stop_id_nums WHERE stop_id = stops.stop_id)
WHERE EXISTS
    (SELECT stop_num FROM stop_id_nums WHERE stop_id = stops.stop_id);

DROP TABLE stop_id_nums;