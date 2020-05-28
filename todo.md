
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
        [x] Send the GET request to database to get box's id and box's icon from Postico database -> Saga -> Reducer -> mapping through and append to DOM
    [x] Box's detail component
        [x] Send the GET request to database to get boxes's data from Postico database -> Saga -> Reducer -> mapping through and append to DOM
[x] Create add new boxes form component
    [x] Dispatching from client-side to send the input data to Saga -> Router -> Database
[x] Create Delete box feature
    [x] Dispatching from client-side to send the box's id to Saga to -> Router send the DELETE request -> Database
### Items inside boxes
[] Create input field to add new items 
[] Create add new items component
    [] Dispatching from client-side to send the input data to Saga -> Router send the POST request -> Database
     [] Send the GET request to database to get items's data from Postico database -> Saga -> Reducer -> mapping through and append to DOM




