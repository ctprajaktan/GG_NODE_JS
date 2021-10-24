# Trade Test

## Installations
1) To run project locally
    * Install NodeJs
    * Install MongoDb
    * Install dependancies: npm install
    * Run program: npm start
2) To run project using docker
    * Install docker, docker-compose
    * Run command: docker-compose up

## Workers
1) Worker_1 (raceDataWorker.js):</br>
    This worker fetch authentication token and fetch race data and push data to Worker_2.
2) Worker_2 (dbWorker.js):</br>
    This worker stores the data received from the Worker_1 into mongodb.
