
## Base
---------

### Set up
[x] Installing
[x] Connecting to Heroku database

### QR code
[x] Reader 
[x] Feature download QR code
    [x] Create Download QR code component
    

### Boxes 
[x] Create table for boxes and items
[x] Box list component
    [x] Navigate to add box form link when click on add new box button. 
    [x] Box Item component
        [x] Send the action FETCH_BOX to get box's id, box's name and box's qr_code from Postico database -> Saga (send GET request to server to get data from server) -> Reducer -> mapping through and append to DOM
    [x] Box's detail component
        [x] Send the action FETCH_DETAIL to get boxes's data from Postico database -> Saga (send GET request to server to get data from server) -> Reducer -> mapping through and append to DOM
[x] Create add new boxes form component
    [x] Send action ADD_BOX from client-side to send the input data to Saga(send POST request to server) -> Router (send POST request to database) -> Database
[x] Create Delete box feature
    [x] Send action DELETE_BOX from client-side to send the box's id to Saga -> Router (send the DELETE request) -> Database
[x] Create another POST route to add first box
    [x]  Send action ADD_FIRST_BOX from client-side to send the action -> Saga (send POST request to server) -> Router (send POST request to database) -> Database

### Items inside boxes
[x] Create input field to add new items 
[x] Create add new items component
    [x] Send action ADD_ITEM from client-side to send the input data to Saga -> Router send the POST request -> Database
    [x] Send the GET request to database to get items's data from Postico database -> Saga -> Reducer -> mapping through and append to DOM
[x] Feature delete items inside the box
    [x] Send action DELETE_ITEM from client-side to send the item's id to Saga -> Router (send the DELETE request) -> Database
[x] Feature update item
    [x] Create input field
    [x] Send action UPDATE_ITEM from client-side to send the item's data after updated to Saga -> Router (send the PUT request) -> Database

### Rooms
[x] Create table rooms in database
[x] Create HomePage component 
    [x] Send action FETCH_ROOM to get list of rooms from Postico database -> Saga -> Reducer -> mapping through the array which get from database
    [x] Create a Room component 
        [x] Display list of rooms to the DOM

### Update Boxes
[x] Update the GET, POST request to get box's list and add boxes into box list inside the specific room by room id
[x] Updata the DELETE request to delete boxes inside the specific room by room id
[x] Room's name in box list
    [x] Send the GET request to database to get room's name from Postico database -> Saga -> Reducer -> mapping through and append to DOM

### Update Items
[x] Update the GET, POST request to get item's list and add items into list item inside the specific room by room id and box id
[x] Updata the DELETE request to delete item inside the specific box and room by room id and box id
[x] Updata the PUT request to update item inside the specific box and room by room id and box id

### House's name
[x] Create table house in database
[x] Create HouseName component, houseNameSaga and houseNameReducer
    [x] From CreateRoomList component, send action CREATE_HOUSE_NAME to Saga -> from Saga, send the POST request to database to create house's name from Postico database -> Saga 
    [x] From CreateRoomList component, send action  FETCH_HOUSE_NAME to Saga ->  From Saga, send the GET request to database to get house's name from Postico database -> Saga -> Reducer -> mapping through the array which get from database
    
### Boxes
[x] Create the feature add very first box
    [x] From BoxList component send action ADD_FIRST_BOX to Saga -> from Saga, send the POST request to database to add first box to boxes table in Postico database
    [x] From BoxList component send action FETCH_ALL_BOX to Saga -> from Saga, send the GET request to database to get all boxes from Postico database -> Saga -> Reducer -> mapping through the array which get from database.
[x] Fixing feature add first box in the room
    [x] From BoxList component send action ADD_FIRST_BOX_IN_ROOM to Saga -> from Saga, send the POST request to database to to add first box in a specific room to boxes table Postico database.
   

## Stretch
----------

### Search item
[x] Create SearchBar component
    [x] Set up input field, handle change for input field, etc...
[x] Create Search Router
[x] Create searchSaga and searchItemReducer
[x] Send action SEARCH_ITEM to get box's name, room's name of the matching item that user searching from Postico database -> Saga -> Reducer -> mapping through and append to DOM


## Styling
[] Login/ Register page
[] Header
[] Drop down nav table
[] Search bar
[] House's name
[] Back to room list button
[] Room's name in box list
[] Box quanity
[] Add new box button
[] Detail inside the box