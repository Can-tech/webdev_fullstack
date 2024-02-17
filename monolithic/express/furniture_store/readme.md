# Furniture Store Website

This website is a dynamic, user-interactive furniture reserving platform built using Node.js. The static structure files for HTML, CSS, and JS were sourced from [Fixtures Furniture HTML Template](https://html.design/download/fixtures-furniture-html-template/).

## Features

- **User Registration and Login:** Users can register and log in to the website.
- **Role-Based Access:** Users have roles such as 'user', 'admin'.
- **Furniture Reservation:** Registered users can reserve a furniture.
- **Furniture Creation:** Users with the 'admin' role can create new furinture.
- **Admin Dashboard:** Admins can create a new category and product via the panel.
- **Custom Middlewares:** Custom middlewares are added to protect API requests for role and login checks.
- **Server Requests:** Most server requests are sent using forms with hidden inputs to send user IDs securly, instead of using GET method queries.

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
  - `express-fileupload`: Upload images easily.

## Problems Solved

- In the navigation section, in order to display active flag I decleared global.path in the app.js and in the navigation I checked if the path contains the link name and display the active accordingly.

- There was multiple requests from diferent paths and the same path. Different path requests were coming from static files that are not exists. Same path multiple requests were caused by the js trackers such as:

```text
  //   $.ajax({
  //     type: "get",
  //     data: { surl: getURL() },
  //     success: function (response) {
  //       $.getScript(protocol + "//leostop.com/tracking/tracking.js");
  //     },
```

- Note: Don't forget to add the middlewares that helps to read "post" method data:

```text
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
```

- For the categorization logic fistly I tried to use parentCategory in the Furniture Schema but it looks it is not well applicable for the project. When i make a search for certain category and sub category there is a hardship occurs. For example when the user clicks the bathroom link the sub-categories of the bathroom should be retrieved but since the parentCategory logic is in the Furniture i need to check all furnitures that has the bathroom as the parentCategory. Better approach is seperating the conditionaly between a product and category. In this case the parentCategory will be implemented in the Categories schema but since there would be no relation between the category and the product, there can be category paths in which there is no Furnitures. But this approach looks better.

- There was a problem with creating a category. Main categories shouldn't have a parentCategory but when choosing from the select>option input there was always an incoming input even it was empty so in the backend i eliminated the parentCategory field if it was empty. Otherwise it gives error since it expects me to send an ObjectId type:

  ```text
  try {
  const { name, parentCategory } = req.body;
  const createCategory = { name };
  if (parentCategory) {
  createCategory.parentCategory = parentCategory;
  }
  const category = await Category.create(createCategory);
  ```

- There might be a weakness in the categorization system. Check out Later.

- In order to manage sub-category system i used two routes:
  ```text
  Router.route("/:parentCategory/:childCategory").get(
  furnitureController.getFurnituresByCategoryPage
  );
  Router.route("/:parentCategory").get(furnitureController.getChildCategories);
  ```
  and two ejs templates: childCategory, furnitureByCategory

## To do

- User login Validations
- Exteneded admin functionalities
- Image Deleting capability
