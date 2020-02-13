# MaterialDataTableNgrx

This project is a demo of the angular material data table featuring ngrx state management with node + mongo server side filtering, sorting and pagination. The traditional approach to solving this problem involves creating an custom CDK Data Source. A guide to that approach can be found here `https://blog.angular-university.io/angular-material-data-table/`. This repo demonstrates an alternative 'store' based approach.

### Installing

# Mongo
- Install mongo db
- Enable acess control `https://docs.mongodb.com/manual/tutorial/enable-authentication/`

# Node 
- Create nodemon.json and .env files in the api project folder and add the following variables to each file (in json format for nodemon)
    - PORT=3000
    - MONGO_USER_NAME=test_user
    - MONGO_PWORD=ngrxdatatabletest
    - MONGO_DB=localhost:27017/test
- run `npm serve` or `npm run start:server` for hot reloading

# Angular
- Run `ng serve` for a dev server. 
- Navigate to `http://localhost:4200/`

### Testing
- For node run `npm test` to execute Mocha with Chai tests and Sinon stubs
- For angular run `ng test` to run Jasmine with Karma tests

## Built With

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

npm version 6.13.14

node v10.18.1

angular 9.0.1

see package.json.

