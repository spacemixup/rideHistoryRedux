DROP DATABASE IF EXISTS histories;
CREATE DATABASE histories;

\c histories;

CREATE TABLE history (
	ride_id VARCHAR(40) UNIQUE,
	ride_type VARCHAR(20),
	requested_at DATE,
	ride_cost INT,
	ride_originalcost INT,
	origin_loc VARCHAR(100),
	origin_lat INT,
	origin_lng INT, 
	pickup_loc VARCHAR(100),
	pickup_time DATE,
	dropoff_loc VARCHAR(100),
	dropoff_lat INT,
	dropoff_lng INT,
	dropoff_time DATE,
	driver VARCHAR(20),
	driver_rating REAL, 
	driver_image VARCHAR(200), 
	vehicle_make VARCHAR(15),
	vehicle_model VARCHAR(20),
	vehicle_year INT, 
	vehicle_color VARCHAR(10),
	vehicle_license VARCHAR(15),
	vehicle_image VARCHAR(200)
); 