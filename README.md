==> Prerequisites  
Before running the application, ensure you have the following installed:  
==> Node.js - Download and install Node.js from nodejs.org.  
==> Mongodb Compass - With this we can make the local Database and we can also use MongoDB Atlas Database  
  
Installation  
Clone the repository:  

=>Install dependencies:  
    ->npm install  
      
Set up environment variables: .env (like give mongodb URL, PORT)  

Create a .env file in the root directory   
Running the Application  
==> To run the application->  
    ->follow these steps: npm start  
    ->Open your web browser and navigate to http://localhost:<port> (replace <port> with the specified port in your .env file).  

==> Application Structure  
  ** The application follows a basic structure with the following main components:  

  ->server.js: Entry point of the application, sets up the Express server.    
  ->routes/: Contains route definitions for different CRUD operations.  
  ->controllers/: Implements logic for handling requests and responses.  
  ->views/: EJS templates for rendering HTML pages.  
  ->models/: Defines the schema and interacts with the database (if applicable).  
  
==> Dependencies  
  **This application uses the following dependencies:  

  ->Express: Minimalist web framework for Node.js.  
  ->EJS: Embedded JavaScript templates for rendering HTML pages.  
  ->dotenv: Loads environment variables from a .env file.  
  ->Body-parser: Middleware for parsing incoming request bodies.  
  ->Mongoose (optional): MongoDB object modeling tool (if using MongoDB).  
  ->Other dependencies: Check package.json for additional dependencies.  

==> Routes  
GET /: Displays the home page with a list of items.  
GET /add: Displays a form for creating a new User.  
POST /items: Handles the creation of a new User.  
GET /items/:id: Displays details of a specific User.  
GET /items/:id/edit: Displays a form for editing a specific User Details.  
PUT /items/:id: Handles updating a specific User Details.  
DELETE /items/:id: Deletes a specific User.  

=====> Additional   
==> Used DataTables.net to Sort the Data of the User...  
==> Used JQuery to search and render to other page when data exceed more then one page  
