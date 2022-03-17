# Team training: Collaboration and APIs
 
## Rules
 * Only one task per person. You decide who's picking which
 * Collaboration only to determine who's working on which task, the parameters and the endpoint names mentioned in each task


## TASK 1 - HTML, CSS, Javascript
 1. A webpage with start/stop button and a place to display data
 2. Clicking "Start" will initiate the procedure by calling localhost:3030 with some parameter
 3. Clicking "Stop" will stop the procedure by calling localhost:3030 with some parameter
 4. "Stop" button can NOT be clicked within 6mins of clicking "Start" /start no response
 
 5 "Start" button can NOT be clicked again if a "Stop" hasn't been clicked
 6 When "stop" is clicked a call should be made to by calling localhost:3031 with some parameter in order to read the data.txt file and display it on the webpage
 * If "Stop" returns null, empty file or no file then a "Start" should automatically be initiated and a message on the page should inform the user about it



## TASK 2 - Javascript/Node/Express or however one preferes
  * A Node API that can be accessed on localhost:3030
  * When called from the "Start" button from a page, it should start creating a random named file in a folder
  * The folder will be named with today's date in format dd-mm-yyyy
  * If the folder do not exist it should be created
  * if it does exist it should be the one that is used
  * The files that this procedure will create will be randomly named and will be created each 30seconds
  * Each 5mins all files within parent directory older than 2mins should be deleted: fs.
  * Each time a file is created or deleted then a call to another API should be made with the name of the file, the timestamp of the call and the action it was taken on it: created/deleted
  * If a folder is empty and is of previous day, then the folder should be deleted nad call to the API should be dispatched with the folder's name, timestamp and the action "deleted"
  * If a call with "stop" is made to this API then the procedure should sieze to operate
  * Promises or on response and task 1 uses promises/native xmlhttp request to wait for the data after clcking on Stop

Server Folder structure example:
index.js
    -- import fs
    -- express
    -- functions
    -- define your routes - call the functions
folder1
  -- file1
  -- file2
  -- file3
  -- file4
folder2

## TASK 3 - Javascript/Node/Express or however one preferes
   * A Node API that can be accessed on localhost:3031
   * When called it should either write into a data.txt file all parameters it is receiving in the following format and order:
   * timestamp | action | filename\foldername
   * or return the contents of the data.txt file
   * If the file doesn't exist and the call is to write to it, it should be created
   * If it exist and the call is to write to it, it should be used and all data apended to it
   * If the API is called to read the data and the file is empty or doesn't exist then it should notify the client so that a "Start" is initiated automatically in order to generate some data
  * Respond to example GET/POST: localhost:8001/log (agree path with task2), read the payload and write it to a file - "data.txt/json"
  * Respond to GET/POST localhost:8001/divemethelogs(agree path with task2), read your local data.txt file get it's contents and send it back to the initiator as a response fs.readFileSync

Server Folder structure example:
  index.js
    -- import fs
    -- express
    -- functions
    -- define your routes - call the functions
  data.txt/data.json example
    231412341234,create,file1
    231412341235,create,file3
    3425324534,delete,file1|folder1