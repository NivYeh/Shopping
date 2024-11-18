How to Launch the Application:

-Ensure .NET and Node.js are Installed and Up-to-Date:  
If you don’t have them or they are out of date, please download the latest versions from their official websites.

-Execute the Provided SQL Query:  
Run the provided SQL query file on your desired SQL server.

-Update SQL Server Connection Settings:  
Edit and update your SQL server settings (replace your_server_name, your_database_name, your_username, your_password) in both:  
appsettings.json inside the ShopWebApplication/ folder  
index.js inside the Nodejs/ folder

-Set Up Node.js:  
Open a command prompt inside the Nodejs/ folder.  
Run the following commands:  
npm install  
node index.js  

-Set Up .NET Application:   
Open a command prompt inside the dotnet/ShopWebApplication/ folder.  
Run the following commands:  
dotnet restore  
dotnet build  
dotnet run  
Alternatively, you can start the web application using Visual Studio.

-Set Up React Frontend:  
Open a command prompt inside the react/ folder.  
Run the following commands:  
npm install  
npm start
