## Car Gallary

Welcome to the Car Gallery app! This application allows you to browse and explore a wide range of cars. With advanced filtering and searching capabilities, you can easily find the car that suits your preferences.

### Features

#### Filtering:

Narrow down your search by applying various filters such as make, model, year, and more. This helps you quickly find cars that match your specific criteria.

#### Searching:

Looking for a specific car? Simply enter your desired keywords in the search bar, and the app will display relevant results based on your query.

#### Price Display:

Each car listing includes detailed information, including the price. This allows you to compare prices and make informed decisions.

Whether you're a car enthusiast, a potential buyer, or simply curious about different car models, the Car Gallery app is here to provide you with an immersive and user-friendly experience.

Start exploring now and find your dream car!

## Mistakes:

- There was an error due to forgetting of the starting quotation mark " in the script src=" properties.
- I got error that was saying "connect ECONNREFUSED" basically this was due to the there was no running mongodb server. I opened the services, found the mongodb and started it back.
- In order to add a divider comma , for the numbers use .toLocaleString('en-US'). 10000 -> 10,000
- When adding mutliple filters to mongooseSchema.find add them with using seperate if conditions:

  ```
  if (req.query.price !== "default") {
    const priceInterval = priceIntervals[Number(req.query.price)];
    query.price = { $gte: priceInterval[0], $lte: priceInterval[1] };
  }

  if (req.query.bodyStyle !== "default") {
    query.bodyStyle = req.query.bodyStyle;
  }
  ```

- Note that for searching in all cars i used regex this helps me to find items that will match any part of the string. In the case of exact match just use normal object without regex. $or keyword helps with searching through the two types.

  ```
  Without Regex:
  if (req.query.keywords && req.query?.keywords) {

  const keywords = req.query.keywords;
  query.$or = [
  { name: keywords },
  { make: keywords }
  ];
  }

  ```

  ```

  With Regex:
  let query = {};

  if (req.query?.keywords) {
  const keywords = req.query.keywords;
  query.$or = [
  { name: { $regex: keywords, $options: 'i' } },
  { make: { $regex: keywords, $options: 'i' } }
  ];
  }

  ```

  ```

  ```
