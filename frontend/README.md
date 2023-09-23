# Credit Card Validator FullStack

The Credit Card Verification system comprises a JavaScript React.js frontend and a Java Spring Boot backend. The frontend sends API requests to the backend to validate credit cards via its RESTful API.

Frontend Tech Stack:
- JavaScript
- React.js 18
- React Router Dom for dynamic page routing
- Axios for API integration

Backend Tech Stack:
- Java 11
- Spring Boot 2.7.15
- Follows Test Driven Development (TDD) principles
- Utilizes JUnit 5.10.0 and Mockito 5.5.0 for Unit Testing.

### Prerequisites
#### Frontend
   - **Node.js and npm**: You need Node.js (version 16 or later) and npm (Node Package Manager) installed on your system. If not, follow the steps below to install them.
   
#### Backend
   - **Java Development Kit (JDK)**: You need a Java Development Kit (JDK) installed. I recommend using JDK 11 or later.
   - Spring Boot 2.7.15
   - Maven

## Table of Contents

- [Getting Started](#getting-started)
  - [Node Installation](node_installation) 
   - [Clone the Repository](clone_the_repository)
   - [Frontend](#frontend)
     - [Install FE Dependencies](install_fe_dependencies)
     - [Run FE Application](run_fe_application)
     - [Form](form)
     - [Response](response)
   - [Backend](#backend)
     - [Install BE Dependencies](install_be_dependencies)
     - [Run BE Application](run_be_application)
     - [API Documentation](api_documentation)
     - [Testing TDD](testing_tdd)


## Getting Started
## Node Installation

### Windows

- Visit the [official Node.js website](https://nodejs.org/).

- Download the LTS (Long Term Support) version of Node.js (which includes npm).

- Run the installer and follow the installation instructions.

- After installation, open a command prompt and verify that Node.js and npm are installed by running:

   ```shell
     node -v 
     npm -v

### Macos

- Run `brew install node@16`
- After installation, open a command prompt and verify that Node.js and npm are installed by running:

   ```shell
   node -v
   npm -v

### Linux (Ubuntu/Debian)

- Run `sudo apt update`
- Run `sudo apt update`
- Run `sudo apt install nodejs npm`
- After installation, open a command prompt and verify that Node.js and npm are installed by running:

   ```shell
   node -v
   npm -v

### Clone the Repository
  - To get started clone this repository to your local machine by running the following command on you command prompt or terminal.
    ```shell
     git clone https://github.com/kindyluv/credit-card-validator.git

### Frontend
The Frontend application is a single page application with a user friendly interface with a card design at the left and a simple input form and a submit form that makes the API call to verify if the card is valid or invalid and get response from the API call.

### Install FE Dependencies
- After cloning this project navigate to the frontend folder.
   ```shell
        cd creditCardValidator/frontend
- Resolve dependencies by running the following command.
   ```shell
       yarn

### Run FE Application
- To start the application run the following command on yor terminal.
   ```shell
      yarn run start
The application will load on <a style="color: blue;">http://localhost:3000</a>

### Form
   The application requires the following fields in the input:
   #### Input Form
   - Card Name
   - Card Number (max: 19)/(min: 16)
   - Expiry Date (Month / Year)
   - CVV

   #### Success Response
   - When the card validation is successful a green checker modal pops up
   - and the card changes color to green

   #### Error Response
   - When the card validation is unsuccessful a red checker modal pops up with a try again message
     `NB: The submit button is disabled until all the fields are filled`

## Backend
The Backend application is a single RESTFul API POST call `http://localhost:8080/api/v1/card/validate` 

### Install BE Dependencies
To resolve the dependencies and start the application follow the steps below:
- Navigate to the the project folder: 
     ```shell
        cd creditCardValidator/backend/cardValidatingSystem
- To Resolve the dependencies:
  - Windows
     ```shell
        mvn clean install
   - Linux and MacOS
     ```shell
        ./mvnw clean install
### Run BE Application
- To start the application
    - Windows
        ```shell
           mvn spring-boot:run
   - Linux and MacOS
        ```shell
           ./mvnw spring-boot:run
- The Spring Boot application will start, and you can access it at `http://localhost:8080/api/v1/card/`.

### API Documentation
### Overview
This API provides access to credit card validation. It allows users to verify credit card type and check if it's a valid credit card.

### Base URL
The base URL for accessing the API is: [http://localhost:8080/api/v1/card/](http://localhost:8080/api/v1/card/)

### Endpoints
- Validate Card
- Endpoint: `validate`
- Method: POST
- Description: Make a post call to verify a credit card
- Example Request Body:
  ```shell
     {
        "cardNumber": "5298202628250195",
        "cardCVV": "781",
        "cardExpiryDate": "12/23"
      }
- Example Response:
   - Error: 
     ```shell
        {
          "validationStatus": "failed",
          "validationErrors": [
              "Expiry date must be within allowed card lifetime",
              "Card number must be numbers only"
          ]
         }

   - Success:
     ```shell
        {
          "validationStatus": "success",
          "validationErrors": []
         }

## Contact Information
- [Email](onyeukwuamara@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/precious-amarachi-onyeukwu/) 
  

   

