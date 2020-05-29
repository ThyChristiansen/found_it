
##Base
### Set up
[x] Installing
[x] Connecting to Heroku database

### QR code
[x] Reader 
[x] Download QR code

### Boxes 
[x] Create table for boxes and items
[x] Box list component
    [x] Navigate to add box form link when click on add new box button. 
    [x] Box Item component
        [x] Send the GET request to database to get box's id, box's name and box's qr_code from Postico database -> Saga (send GET request to server to get data from server) -> Reducer -> mapping through and append to DOM
    [x] Box's detail component
        [x] Send the GET request to database to get boxes's data from Postico database -> Saga (send GET request to server to get data from server) -> Reducer -> mapping through and append to DOM
[x] Create add new boxes form component
    [x] Dispatching from client-side to send the input data to Saga(send POST request to server) -> Router (send POST request to database) -> Database
[x] Create Delete box feature
    [x] Dispatching from client-side to send the box's id to Saga -> Router (send the DELETE request) -> Database
[x] Create another POST route to add first box
    [x]  Dispatching from client-side to send the action -> Saga (send POST request to server) -> Router (send POST request to database) -> Database

### Items inside boxes
[x] Create input field to add new items 
[x] Create add new items component
    [x] Dispatching from client-side to send the input data to Saga -> Router send the POST request -> Database
    [x] Send the GET request to database to get items's data from Postico database -> Saga -> Reducer -> mapping through and append to DOM
[x] Feature delete items inside the box
    [x] Dispatching from client-side to send the item's id to Saga -> Router (send the DELETE request) -> Database
[x] Feature update item
    [x] Create input field
    [x] Dispatching from client-side to send the item's data after updated to Saga -> Router (send the PUT request) -> Database

### Rooms
[x] Create table rooms in database
[] Create room list component 
    [] Send the GET request to database to get list of rooms from Postico database -> Saga -> Reducer -> mapping through and append to DOM
    [] Create room component 
