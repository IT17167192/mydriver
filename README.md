# mydriver
Google Drive Uploader Client
=============================================================================================================================================
First of all download both the client and server projects. You can find server project by visiting https://github.com/IT17167192/mydriverapi.
=============================================================================================================================================
Let's Configure the Client. Please follow below steps.

#Note:- Before you run the client you must run the server.

Two approaches.
1) Download and configure project
2) Or visit https://mygoogledriver.herokuapp.com
Note : You have to do a small change in the server project.

1) Download and configure project
  1. Download the "mydriver" project.
  2. Extract the project zip file.
  3. Open a command prompt and navigate to exact folder location. Ex :- cd /d D:\SSD\mydriver
  4. Type "npm install" command to install all the dependencies
  5. Then type "npm start" command to start the server
  6. Now the client is up and running
  7. Open the browser and type url *"localhost:3000"
  8. Visit https://github.com/IT17167192/mydriverapi to view server project configuration instruction

=============================================================================================================
2) Or visit https://mygoogledriver.herokuapp.com
  1. In the server api project change redirect_uris[0] to redirect_uris[1]
     *You can find the code in controllers->OAuth.js->Line No 20.
     *Change it to -> (OAuth2Data.web.redirect_uris[1]).
==============================================================================================================

