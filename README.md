# Parkitech

_A geogtagged ticket board for park management_

Deployed on Heroku at https://parkitech.herokuapp.com

## Background

Parkitech was created to fill a technology gap often found in small non-profits managing public parks and spaces. Maintenance and Park Ranger teams work both in the field and the office and need a good way to track and record tasks or issues from both places at once. Parkitech is a ticket board with a responsive interface for use on mobile, tablet, and desktop devices. Tickets are geotagged to record and plot their exact coordinates on a map, allowing for better tracking, organization, and analytics of park operations.

## Built With

Parkitech was originally built as a 4-day hackathon project for my Grace Hopper program. It was built using Node, Express, PostgreSQL, Sequelize, React, Redux, and Mapbox.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Set-Up

Parkitech runs in a Node environment and requires two PostgreSQL databases: one named "parkitech" and another for testing named "parkitech-testing."

Fork and clone this repository and follow the installation instructions below.

### Installation

Install dependencies with `npm install`, and then seed the database with `npm run seed`

Start the local development environment with `npm run start-dev`

## Author

[Amy De Genaro](https://github.com/amydegenaro)
