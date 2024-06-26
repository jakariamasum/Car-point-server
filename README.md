# Car Point Server

Car Point Server is a backend application built using Node.js and Express.js, with MongoDB as the database. The application allows users to create and manage car listings, place bids, save favorite ads, and provide feedback. It also supports user authentication and role-based access control (RBAC) using JSON Web Tokens (JWT).

## Features

- User authentication and authorization with JWT
- Role-based access control (Admin and User)
- Create, read, update, and delete car listings
- Place bids on car listings
- Save favorite ads
- Provide feedback
- Admin functionalities to manage users and listings

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (either a local instance or MongoDB Atlas)
- npm (Node Package Manager)

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/jakariamasum/Car-point-server
   cd Car-point-server
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```sh
   PORT=5000
   URI=your-mongodb-connection-string
   ACCESS_WEB_TOKEN=your-jwt-secret
   ```

4. Start the server:

   ```sh
   node index.js
   ```

## API Endpoints

### Authentication

- **POST /jwt**
  - Generates a JWT for a user.
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "userType": "user"
    }
    ```
  - Response:
    ```json
    {
      "token": "your-jwt-token"
    }
    ```

### Users

- **POST /newUserApi**

  - Registers a new user.
  - Request body: User details.
  - Response: Result of the insert operation.

- **GET /user/admin/:email**

  - Verifies if a user is an admin.
  - Requires JWT.

- **PUT /updateUserDetails/:id**
  - Updates user details.
  - Requires JWT.

### Listings

- **POST /newCarSellByUser**

  - Creates a new car listing.
  - Requires JWT.

- **GET /allListings**

  - Retrieves all car listings.

- **GET /filteredListings**

  - Retrieves filtered and paginated car listings.

- **GET /singleListing/:id**

  - Retrieves a single car listing by ID.

- **PUT /updateListing/:id**

  - Updates a car listing.
  - Requires JWT.

- **PUT /updateSellStatus/:id**

  - Updates the sell status of a car listing.

- **DELETE /api/deleteSingleListing/:id**
  - Deletes a car listing by ID.
  - Requires JWT.

### Bids

- **POST /newBid**

  - Places a new bid on a car listing.
  - Requires JWT.

- **GET /allBidsForProduct/:id**
  - Retrieves all bids for a specific car listing.

### Saved Ads

- **POST /newSavedAd**
  - Saves a new ad.
- **GET /getSingleSavedAd/:id**

  - Retrieves a saved ad by ID.

- **GET /savedAdsList/:email**

  - Retrieves saved ads for a user.

- **DELETE /removedSavedAd/:id**
  - Deletes a saved ad.

### Feedback

- **POST /userFeedback**

  - Submits user feedback.

- **GET /singleFeedback/:id**

  - Retrieves a single feedback by user ID.

- **GET /allFeedbacks**
  - Retrieves the latest feedbacks.

## Middleware

- **verifyToken**
  - Middleware to verify JWT.
- **verifyAdmin**
  - Middleware to check if the user is an admin.

## Running the Server

The server runs on the port specified in the `.env` file. By default, it runs on port 5000.

```sh
node index.js
```

You should see the following message in the console:

```
Car point Server is running on port: 5000
Pinged your deployment. You successfully connected to MongoDB!
```

Feel free to contribute to this project by opening issues and submitting pull requests.
