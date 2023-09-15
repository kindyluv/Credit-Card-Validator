# Credit Card Validator

# React.js and Spring Boot Application

This repository contains a React.js front-end application and a Spring Boot Java back-end application. Follow the steps below to install the necessary dependencies and start both applications.

## Prerequisites

Before you can run the applications, make sure you have the following prerequisites installed:

1. **Node.js and npm**: You need Node.js (version 16 or later) and npm (Node Package Manager) installed on your system. If not, follow the steps below to install them.

2. **Java Development Kit (JDK)**: You need a Java Development Kit (JDK) installed. I recommend using JDK 11 or later.

## Installing Node.js and npm (Node Package Manager)

### Windows

1. Visit the [official Node.js website](https://nodejs.org/).

2. Download the LTS (Long Term Support) version of Node.js (which includes npm).

3. Run the installer and follow the installation instructions.

4. After installation, open a command prompt and verify that Node.js and npm are installed by running:

   ```shell
     node -v 
     npm -v

### Macos

1. Run `brew install node@16`
2. After installation, open a command prompt and verify that Node.js and npm are installed by running:

   ```shell
   node -v
   npm -v

### Linux (Ubuntu/Debian)

1. Run `sudo apt update`
2. Run `sudo apt update`
3. Run `sudo apt install nodejs npm`
4. After installation, open a command prompt and verify that Node.js and npm are installed by running:

   ```shell
   node -v
   npm -v


## Running the Spring Boot Java Application

1. Clone this repository to your local machine
   ```shell
   git clone https://github.com/kindyluv/credit-card-validator.git
3. Run `cd creditCardValidator/backend`
4. Run `./mvnw clean install`
5. Run `./mvnw spring-boot:run`
6. The Spring Boot application will start, and you can access it at `http://localhost:8080/api/v1/card/`.

   
## Running the React.js Application

1. Navigate to the frontend directory.
2. Run `cd creditCardValidator/frontend`.
3. Run `yarn` to resolve your dependencies.
4. Run `yarn run start` to start the frontend application.
5. Once the development server starts, open a web browser and go to `http://localhost:3000` to access the React.js application.





