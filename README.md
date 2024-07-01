# QuickSend

![home-page](https://github.com/Ratangulati/QuickSend/assets/116749593/62907220-7bac-4c45-8ab7-3374ceef0b80)

![dashboard](https://github.com/Ratangulati/QuickSend/assets/116749593/6ab3ab32-b55a-4cd2-b764-9bbe00f1e639)

## QuickSend is an Easy, Fast, Reliable, and Secure money transfer Web application which makes sending money to friends and family with just a few clicks.


## Table of Contents
* [Technologies Used](https://github.com/Ratangulati/QuickSend?tab=readme-ov-file#technologies-used)
* [Features](https://github.com/Ratangulati/QuickSend?tab=readme-ov-file#features)
* [Getting Started](https://github.com/Ratangulati/QuickSend?tab=readme-ov-file#getting-started)
    * [Pre-requisites](https://github.com/Ratangulati/QuickSend?tab=readme-ov-file#prerequisites)
    * [Installation](https://github.com/Ratangulati/QuickSend?tab=readme-ov-file#installation)
* [How to Contribute?](https://github.com/Ratangulati/QuickSend?tab=readme-ov-file#how-to-contribute)


## Technologies Used

- **Frontend:**
    - React
    - Javascript
    - Tailwind CSS

- **Backend:** 
    - Node.js
    - Express.js


## Features
- **User Registration and Profiles:** Users can create and update their accounts assigned unique ID to everyone.

- **Secure Authentication and Authorization:** Implemented JWT and zod for authentication and authorization.

- **Transaction Sessions:** Implement session management to handle transaction flows smoothly.

- **Send Money Functionality:** Allow users to send money to friends and family.

- **Fast and Reliable Transactions:** Use robust APIs or payment gateways to facilitate transfers.

- **Transaction History:** Maintain a history of transactions for users to track their transfers.


## Getting Started
### Prerequisites

- Node.js and npm installed on your machine.

### Installation

#### With Docker Compose
1. Clone the repository:
    ```bash
    git clone https://github.com/Ratangulati/QuickSend
    ``` 

2. Navigate to the project directory:
    ```bash
    cd QuickSend
    ```
   
3. Run Docker Compose:
    ```bash
    docker-compose up
    ```
    The app should now be running at [http://localhost:5173](http://localhost:5173).

#### With Docker

##### Frontend
1. Clone the repository:
    ```bash
    git clone https://github.com/Ratangulati/QuickSend
    ``` 

2. Navigate to the project frontend directory:
    ```bash
    cd QuickSend/frontend/ 
    ```
   
3. Build docker image:
    ```bash
    docker build -t <your-image-name> .     
    ```

4. Run docker image:
    ```bash
    docker run -p 5173:5173 <your-image-name>
    ```
    The app should now be running at [http://localhost:5173](http://localhost:5173).

##### Backend
1. Clone the repository:
    ```bash
    git clone https://github.com/Ratangulati/QuickSend
    ``` 

2. Navigate to the project frontend directory:
    ```bash
    cd QuickSend/backend/ 
    ```
   
3. Build docker image:
    ```bash
    docker build -t <your-image-name> .     
    ```

4. Run docker image:
    ```bash
    docker run -p 3000:3000 <your-image-name>
    ```
    The app should now be running at [http://localhost:3000](http://localhost:3000).

#### Without Docker

##### Frontend
1. Clone the repository:
    ```bash
    git clone https://github.com/Ratangulati/QuickSend
    ``` 

2. Navigate to the project frontend directory:
    ```bash
    cd QuickSend/frontend
    ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
    ```bash
    npm run dev
    ```
    The app should now be running at [http://localhost:5173](http://localhost:5173).


##### Backend
1. Clone the repository:
    ```bash
    git clone https://github.com/Ratangulati/QuickSend
    ``` 

2. Navigate to the project backend directory:
    ```bash
    cd QuickSend/backend/
    ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
    ```bash
    npm start
    ```
    The app should now be running at [http://localhost:3000](http://localhost:3000).

5. Example config.js You can use in your backend
    ```
    module.exports = {
      JWT_SECRET: "your-secret",
      MONGO_URL: "your-mongo-url"
    }
    ```

## How to Contribute 

To know how to contribute to the project visit [CONTRIBUTING.md](CONTRIBUTING.md).
