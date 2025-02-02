# ILLUSTREMOR
## Description
Our mission with ILLUSTREMOR is provide and share relevant earthquake information to all U.S citizens in order to reduce or prevent injuries, deaths, and damages to property from earthquakes. This web app will hopefully make users understand earthquakes and increase their awareness of the potential effects. Users will also be able to see through the map which regions are the most active and most likely to face an earthquake with respect to their location. Lastly, ILLUSTREMOR serves as a monitoring application as users can report an earthquake into our ever-growing database.

## Link to Website
https://stormy-hamlet-33923.herokuapp.com/

## Target Browsers 
* iPhone 6/7/8 Plus
* Pixel 2/2XL
* Macbook Pro 13/15

## Links
* [Developer Manual](https://github.com/cjaguila14/Group1-Final-INST377SP2022/edit/main/README.md#developer-manual)



# Developer Manual
## How to install application and dependencies
1. Clone this repository through Github Desktop or use this link directly https://github.com/cjaguila14/Group1-Final-INST377SP2022.git
2. Open repository in VSCode Terminal or Terminal application.
3. Type "npm install" in the terminal to install all dependencies.
4. The application should now be set to use.

## How to run application locally
1. Open repository
2. Open terminal and type npm start
3. In browser, go to http://localhost:3000/ 
4. Start development!

## APIs
* `/api/earth_info/:id`
    * GET - returns basic information about all earthquakes recorded in the database. If the id is present, it will return a single earthquake record. 
    * POST - takes in a state from req body. Returns information about all earthquakes based on the given state
    * PUT - updates an earthquakes magnitude value
    * DELETE - deletes an earthquake from the database based on id
* `/api/weather/:weather_id`
    * GET - returns weather stats about all earthquakes recorded in the database. If the id is present, it will return a single earthquake record. 
* `/api/damage/:id`
    * GET - returns damage stats about all earthquakes recorded in the database. If the id is present, it will return a single earthquake record. 
* `api/building/:building_id`
    * GET - returns buildings impacted stats about all earthquakes recorded in the database. If the id is present, it will return a single earthquake record. 
    * POST - takes in a number of people displaced from req body. Returns information about all earthquakes based on the given number of people displaced. 
    * PUT - updates an earthquakes number of people displaced value
    * DELETE - deletes an earthquake record based on an earthquake id.
    
