#### - Continues from Level 2
### Sudoku frontend with backend V2 (Level 3)

#### Techniques used : React, Express

* Modify the API in app.js on the project root folder. 
    * To get selected cells information from the frontend, put some codes into `app.post('/sudoku/select', `
    * Modify parts of `app.get('/sudoku/board'` to avoid changing the Sudoku number you selected.
 
* Modify client/App.js
    * Class Board 
        * Add a method handleClick(i) : Send a selected cell information to the server.
        
    * Class Square
        * Add the style property to change the bg-color according to the clicking.         

* Build and test 
   * `npm run build` on the project root directory.
   
* Run
   * `npm start`
   * You are able to go to http://localhost:8080 on the web browser while running the reverse proxy with Nginx.
   * You can access the app through http://localhost:8081 on the web browser if you don't run the reverse proxy with Nginx.
   * Refer to the [Level 2 document](https://github.com/hotdeveloper/sudoku-frontend-with-backend/blob/master/README.md) for Nginx setup.
