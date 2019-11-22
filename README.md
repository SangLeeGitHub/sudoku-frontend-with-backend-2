#### - Continues from Level 2
### Sudoku frontend with backend V2 (Level 3)

#### Techniques used : React, Express

* Prepare folder and install npm modules
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
