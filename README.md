# A Simple Application Programming Interface (API) Product Database Management
## PROJECT OVERVIEW
- This project is a simple API Product databse Management built using Node.js, Express, and MongoDB,
- It allows you to perform CRUD (Create, Read, Update, Delete) operations on a products database,
- The API provides endpoints to add new products, retrieve all products, retrieve a single product by name, update a product's details, and delete a product.

## PREREQUISITES 
- `Node.js`: Ensure you have Node.js installed on your machine.
- `MongoDB`: A MongoDB instance to store product data.
- `Postman`: For testing the API endpoints.
- `MongoDB Atlas`: cloud service for managing the database.

## Features Carried out
- `Add Product`: to add new product with details "(name, price, category, description, stock)"
- `Retrieve All Products`: to get list of all products in the database.
- `Retrieve Single Product`: to get the details of a single product by name.
- `Update Product`: to update the details of an existing product.
- `Delete Product`: Delete a product by name.

## STEPS
-  I make a directory and cd into it for the project named `Shopify_Project`,
-  I install dependencies needed for the task to be excuted by running `npm install` command,
-  I create and sign in to the `MongoDB Atlas` account , create a project name `Shopify`,
-  I create a cluster for the project and get my password and the connection string needed to communicate with the cloud service,
-  I create a database and a collection named `store_db` and `product`,
-  I procced setting up my `.env` file for my enviroment variables,

```
PORT= "my_port"
DB_URL= "my_mongodb_connection_string"
DB_NAME= "my_database_name"
DB_TABLE= "my_collection_name"
```
-  I procced writing my `Json` file named `index.js` passing in neccessary codes for the task to be carried out with good reliable results,
-  I Start the Node.js server by running the command `npm start` which is running on port define in `.env`,
-  I use the postman to test the API endpoints,
-  Testing the API to:
```
1. Add Product:  `POST` request to `http://localhost:<port>/addproduct` with the required fields.
2. Retrieve All Products: `GET` request to `http://localhost:<port>/products`
3. Retrieve Single Product: ` GET` request to `http://localhost:<port>/product/:name`
4. Update Product: `POST` request to `http://localhost:<port>/updateproduct` with the fields to update.
5. Delete Product: `POST` request to `http://localhost:<port>/deleteproduct` with the product name.

## The API returns appropriate HTTP status codes for success and error:
1. 200 OK for successful operations.
2. 400 Bad Request for missing required fields.
3. 404 Not Found for non-existent products.
4. 500 Internal Server Error for server-side errors.
```

## Troubleshooting
- I ensure MongoDB is running and accessible at the URL define in my `.env` file.
- I ensure that the server is running on the defined port.
- I Verify sending the correct request type `GET, POST` and including the necessary body parameters when testing the endpoint.

## License
This project is open-source and available under the MIT License.

