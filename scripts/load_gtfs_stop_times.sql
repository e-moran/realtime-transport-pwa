LOAD DATA INFILE <FILE>
INTO TABLE Stop_Times
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
    (@trip_id,@discard,departure_time,@stop_id,stop_sequence,destination,@discard,@discard,@discard) SET
        trip_id = @trip_id,
        stop_num = (SELECT REGEXP_SUBSTR(@stop_id, '0(?:[0-9]+)$|(?<=gen:[0-9]{5}:)(?:[0-9]{1,4})(?=:0:.)') AS stop_num),
        stop_id = @stop_id,
        trip_id = @trip_id,
        day_id = (SELECT REGEXP_SUBSTR(@trip_id, '(y[0-9]{3}.)') AS day_id),
        route_num = (SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(@trip_id, '-', 2), '-', -1) AS route_num),
        direction = (SELECT RIGHT(@trip_id,1) as direction)
;
