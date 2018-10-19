# Peaksware Javascript Code Test

## Live Interactive Demo

https://christophercheng.github.io/training-map-app/

## Installation Directions

  1. Clone the git repo into a new directory
  2. 'cd' into that cloned directory
  3. 'npm install'
  4. 'npm start'

## Assumptions

  1. Redux & thunks were utilized to demonstrate understanding of flux architecture.  For a simple project like this, it might be overkill.

## Known Issues

  1.  The selected area of the chart does not clear when a user selects a selection preset e.g. Best 5 minutes.  The likely solution to this issue is more time and possibly to redraw a reset chart
  2.  The calculations for average power and best x minutes do not account for events where there is no power data or power = 0.  A different algorithm could remove those points from calculation and only calculate average power when the user is actually exerting power.
  
## Structure of code

All source code is in the /src directory

/src/App.js:  houses the outermost React JSX rendering logic.

/src/components:  houses the React components for the map, chart, and analysis/selector widget.

/src/actions/index.js:  houses all the action creators

/src/reducers/RootReducer.js: houses all the reducers

/src/utils.js: houses some helper functions

/src/store.js houses redux code that initializes the store

/src/constants/ActionTypes.js houses the constants used for the action creactor types

/api contains the workout data

## Test Directions

Please build a single page application to visualize the workout data provided in `workout-data.json`, including a map, a graph, and an algorithm to analyze average power output.

### Algorithm
- Write the most efficient method that finds the "best" 20 minute power effort.
- "Best" is defined as highest continuous average for the given time period.

### User Interface
- Display the gps path on a Map
- Display the power output over time on a graph, using time as the X axis
- When user selects a range of time on the graph, highlight the corresponding range on the map
- Display the 1, 5, 10, 15, and 20 minute "best" efforts

### Hints
The purpose of this test is to demonstrate your understanding of JavaScript web application patterns and best practices, efficient algorithms, and general clean coding habits. We realize this interview question can be a substantial task. To save time, do not focus too much on CSS styling, layouts, boundary use cases, etc. You are free to use whatever frameworks and libraries you like.

### Submission
Please submit your test as an emailed zip file (please do not include the node_modules folder) or link to a private repo or private file sharing system. You can also provide a hosted link or it can run locally.
