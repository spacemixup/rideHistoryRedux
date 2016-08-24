DROP DATABASE IF EXISTS histories;
CREATE DATABASE histories;

\c histories;

CREATE TABLE history (
	ride_id VARCHAR(40) UNIQUE,
	ride_type VARCHAR(20),
	requested_at TIMESTAMP,
	day_of_week INT,
	ride_cost INT,
	ride_originalcost INT,
	origin_loc VARCHAR(100),
	origin_lat REAL,
	origin_lng REAL, 
	pickup_loc VARCHAR(100),
	pickup_time TIMESTAMP,
	dropoff_loc VARCHAR(100),
	dropoff_lat REAL,
	dropoff_lng REAL,
	dropoff_time TIMESTAMP,
	driver VARCHAR(20),
	driver_rating REAL, 
	driver_image VARCHAR(200), 
	vehicle_make VARCHAR(15),
	vehicle_model VARCHAR(20),
	vehicle_year INT, 
	vehicle_color VARCHAR(10),
	vehicle_license VARCHAR(25),
	vehicle_image VARCHAR(200)
); 