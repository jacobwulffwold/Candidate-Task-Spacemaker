# Candidate Task: Software Engineer - State Management (Spacemaker)
Takes in multiple GeoJSON featuregroups of polygons, and allows simple boolean editing of the different sets. Displays geographic area coverage of active solution set.

## Install

node.js - https://nodejs.org/en/

Run 'npm install' in terminal and everything should be fine.

In case that doesn't work, here are the packages to install:

- npm i object-hash
- npm i react react-dom leaflet
- npm i react-leaflet
- npm i leaflet
- npm i @turf/turf
- npm install -D @types/leaflet

## Use application

Start application: npm start

Navigate between different solutions with bar on the left. Click on two polygons, then "intersect", to get the intersection, or "union" to get the union. Enjoy!
