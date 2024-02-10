# Dynamic Portfolio Website

This project is a dynamic Freelancer Portfolio website built using Node.js. Admin can upload or delete his/her projects and display them to other users.

Basic authentication technique is used for the admin login. There is a single admin secret input to authenticate. The express-session package is used to create a session for admin. This session is kept in the server memory(MemoryStore) only and not in a database. Thus it is not volatile state but it is enough for the website. The .env and dotenv is used to keep the admin_secret in the serverside for the best practice.

Admin can add a new portfolio item or delete an item.

## Built with

**Architecture:** Monolithic, MVC
**Framework:** Express
**Packages:**

- express: web server framework for node.js
- express-fileupload: simple file upload handler with a middleware
- express-session: user session operations
- mongoose: object document mapper(simpler operations on mongoDB)
- nodemon: server auto restarter
- ejs: view(template) engine
