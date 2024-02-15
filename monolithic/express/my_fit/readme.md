# MyFit Sport Center Website

This website is a dynamic, user-interactive sport center platform built using Node.js. The static structure files for HTML, CSS, and JS were sourced from [Misfit Fitness HTML Template](https://html.design/download/misfit-fitness-html-template/).

## Features

- **User Registration and Login:** Users can register and log in to the website.
- **Role-Based Access:** Users can have roles such as 'user', 'instructor', or 'admin'.
- **Class Enrollment:** Registered users can enroll in or release a sport class.
- **Class Creation:** Users with the 'instructor' role can create new classes.
- **Account Suspension:** Admins can suspend accounts, preventing users from accessing the dashboard page. Instead, suspended users will see a message indicating their account status.
- **Pagination:** Pagination is implemented in the admin panels for user display.
- **Custom Middlewares:** Custom middlewares are added to protect API requests for role and login checks.
- **Server Requests:** Most server requests are sent using forms with hidden inputs to send user IDs, instead of using GET method queries.
- **Secrets Protection:** The email address and password are stored in a `.env` file and accessed via `process.env`.

## Technologies Used

- **Architecture:** Monolithic, MVC
- **Framework:** Express
- **Packages:**
  - `express`: A web server framework for Node.js.
  - `express-session`: Handles user session operations.
  - `mongoose`: An object document mapper for simpler operations on MongoDB.
  - `nodemon`: Automatically restarts the server.
  - `ejs`: A view (template) engine.
  - `bcrypt`: Used to hash passwords.
  - `connect-mongo`: Saves user sessions into the DB.
  - `nodemailer`: Simplifies sending emails.

## Solved Problems:

- An extra log output was appearing when logging `req.path: /css/swiper.min.css`. After searching for this file in the app, I realized that there was no such a file. Commenting out the reference to this file solved the issue.
- An extra log output was appearing when logging `req.path: "/"`. This was due to a tracker code in a JavaScript file that was attempting to connect to an external script.
- When using `bcrypt.compareSync()`, the page would load indefinitely. The correct usage is `bcrypt.compare(text, hash, (err, result))`check the reason.
- While sending an email, I used port 587, which required `secure: false`. Otherwise, it would throw an error.
- Small typos and mistakes were corrected.
- I used `map` instead of `forEach` to create a new array and then join them together. I used `prettier-ignore` to prevent it from skipping a line, which was causing a syntax error in the EJS template. In EJS templates, the `<%=` and `%>` tags are used to output JavaScript expressions as text. EJS evaluates the expression and inserts its value into the HTML. Here, we generate a new array, join them into a single string, and then print it to the screen using `<%=`.

  ```ejs
  <td>
    <!-- prettier-ignore  -->
    <%= e.enrolled_classes.length > 0 ? e.enrolled_classes.map(c => c.name).join(', ') : "No classes are enrolled" %>
  </td>
  ```

- On the other hand when we use the forEach we dont have the equal sign

  ```ejs
  <% array.forEach(e=>{render html code}) %>
  ```

  ```ejs
  <% users.forEach((e,i)=>{ %>
    <tr>
    <th scope="row"><%=i%></th>
    <td><%= e.email%></td>
  <%)}%>
  ```

- For a ternary operator, we use the equal sign to get the value first and then compare it later. Misuse of "=" won't work:

  ```ejs
  <%= e.isSuspended ? "Cancel Suspend" : "Suspend" %>.
  ```

- usage of dotenv for the mailing system nodemailer.

  ```js
  require("dotenv").config();
  process.env.EMAIL_PASSWORD;
  ```

  INFO: The config method reads the .env file in your project root and adds the variables in it to process.env. This is how we access our environment variables.

- I tried to search in the same page that there is already a query. I attempted to keep currentPage in the action path and add the email parameter to it but it didn't work. It redirects me to http://localhost:3000/admin/users?email=student3%40mail.com with deleting the page= query part when i search.

  ```html
  <form
    method="get"
    action="/admin/users?page=<%=currentPage%>&"
    class="d-flex w-50 justify-content-center"
  >
    <label class="text-white h6 ">Search for a user: </label>
    <input
      name="email"
      type="text"
      placeholder="email"
      class="input-group ml-2"
    />
    <button class="btn btn-info d-flex align-items-center ml-2">Search</button>
  </form>
  ```

  So I implemented a hidden input and give the page number via it. When the admin searches a user. The both queries will be added to the request. Also notice that I used "get" request to add parameters as a query insted of sending them via body like in the post request:

  ```html
  <form
    method="get"
    action="/admin/users?page=<%=currentPage%>"
    class="d-flex w-50 justify-content-center"
  >
    <label class="text-white h6 ">Search for a user: </label>
    <input
      name="email"
      type="text"
      placeholder="email"
      class="input-group ml-2"
    />
    <input name="page" type="hidden" value="<%=currentPage%>" />
    <button class="btn btn-info d-flex align-items-center ml-2">Search</button>
  </form>
  ```

  Note that, here I make a search via the email query but the browser automatically converts @ sign into %40% so that in the admin controller It was needed to decode it first as: const userSearchQuery = decodeURIComponent(req.query.email);

  INFO:In URLs, some characters have special meanings. For example, the # character is used to indicate a fragment identifier, and the ? character is used to start a query string. To include these characters as actual data in a URL, they need to be encoded.The encoding process works by replacing the special character with a % followed by two hexadecimal digits that represent the ASCII code of the character

- The pagination component consists of three sections. The middle section displays the current page, highlighted with an active class. To the left, buttons for previous pages are displayed, if available. To the right, buttons for the next pages are shown, if they exist.

- While using bcrypt with the .pre middleware there was a problem that whenever i modified the data it was chainging the password by re-hashing the already hashed password field. I added control flow to check if the password is changed.

```js
if (!this.isModified("password")) return next();
```

- In the instructors page of the admin dashboard. To print the classes that are given by the instructor I needed to use filter and when comparing the two mongo documents with \_id's, converting them into strings are necessary,

```ejs
<%= classes.filter((c) => c.instructor.toString() == e._id.toString()).map( c => c.name).join(", ") %>
```

Note that, c.instructor is a document ObjectId referencing to a user. So We can compare it without populating but converting it into a string!

## Images

![Alt text](webdev_fullstack\monolithic\express\my_fit\project_images\not_loged_in_user_screen.JPG)

## To do

- User login Validations
- Exteneded admin functionalities
- Update capability of classes by an instructor
- Image Uploading capability
