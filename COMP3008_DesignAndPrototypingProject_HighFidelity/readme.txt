Team Members:
 - Garrison Su     | 101232418
 - Tooba Sheikh    | 101028915
 - Merraj Masstan  | 101186611

The web system is designed using HTML. The application reads and writes to JSON files to access information. JavaScript is used  to handle any interactive buttons, to set up the server and to assign actions on mouse hovers. CSS is the primary method of design and styling the web application. The JavaScript, CSS and image assets are stored in sub-folders, while the JSON and server files are stored in the main folder with the html files. The program is best run in Visual Studio, and thus the tutorial will be given assuming the use of VS. In order to run the application, your system must have Node.js downloaded. Follow the instructions on https://nodejs.org/en to install Node.js.

To start up the program, first ensure that you are in the same directory as the project. Then we need to install express and fs using Node.js. Start by accessing the terminal and type in the following commands:

- npm install express
- npm install fs

After that, run the server locally by typing in the command:

- node ./server.js

This will give you a link similar to: https://localhost:3000. The port number may vary. Ctrl + click will take you to the search page, which is our landing page.

The menu bar is functional. Clicking on each item will take you to the respective pages. To view what the icons represent, you can expand the menu bar by clicking the three bars icon at the top. 

To access the other pages without the use of the menu bar or buttons, you can type the html page in url as follows: 

- https://localhost:3000/login

This works for most html pages in the current prototype version. You do not need this to access any pages, all pages are accessible through menubar and button on each page. To proceed anyway, you can replace “login” in the url with the following words to access the other pages: 

- profile
- register
- search
- create
- addSelection
- addmc
- addla
- addsa
- takeQuiz
- solutions
- history