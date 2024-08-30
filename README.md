# Self-Updating App Prototype

This repository is a prototype for a self-updating application. It includes a backend API for managing software versions and a simple client script that checks for updates based on the operating system.

## Table of Contents
- [Project Proposal](#project-proposal)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Running the Backend](#running-the-backend)
- [Running the Client](#running-the-client)
- [API Endpoints](#api-endpoints)
- [Testing the Application](#testing-the-application)
- [Troubleshooting](#troubleshooting)

## Project Proposal

For a detailed engineering proposal outlining the implementation, assumptions, and next steps, please refer to the [Project Proposal](./proposal.md).


## Project Structure

```
/self-updating-program
  /self-modifying-app
    /src               # NestJS source code for the backend API
    /scripts           # SQL scripts for database initialization
    docker-compose.yml # Docker configuration for the backend
    package.json       # Backend dependencies
    ...
  /client
    index.js           # Simple Node.js client script to check for updates
    .env               # Environment variables for the client
    package.json       # Client dependencies

```


## Prerequisites

Before running this project, ensure you have the following installed:

- **Docker** and **Docker Compose**
- **Node.js** (v14.x or later) and **npm**

## Setup and Installation

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/LelandWarren/self-updating-program.git
cd self-updating-program
```

### 2. Navigate to the Project Directory

Ensure you are in the root directory of the project:

```bash
cd self-updating-program
```

### 3. Set Up the Backend

Navigate to the `self-modifying-app` directory and install the backend dependencies:

```bash
cd self-modifying-app
npm install
```

### 4. Set Up the Client

Navigate to the `client` directory and install the client dependencies:

```bash
cd ../client
npm install
```

### 5. Configure the `.env` File (Optional)

In the `client` directory, create and configure the `.env` file if you want to override the defaults:

```
# Example .env file
BASE_URL=http://localhost:3000/version
OS=windows
```

## Running the Backend

### 1. Start the Backend

Use Docker Compose to start the PostgreSQL database and the NestJS backend API:

```bash
cd ../self-modifying-app
docker-compose up --build
```

This command will:
- Start a PostgreSQL database.
- Run the NestJS backend, exposing it on `http://localhost:3000`.

### 2. Check Database Initialization

When the backend starts, it automatically initializes the database with default data. If you need to wipe the database and start fresh, follow the troubleshooting steps below.

## Running the Client

### 1. Run the Client Script

The client script checks for the latest software version based on the specified operating system.

Navigate to the `client` directory and run the script:

```bash
cd ../client
node index.js
```

### 2. Customize with Command-Line Arguments

You can override the `BASE_URL` by passing it as an argument:

```bash
node index.js http://localhost:3000/version
```

The client will prompt you to download the latest version based on the OS specified in the `.env` file or the command-line argument.

## API Endpoints

The backend provides the following API endpoint:

- **GET /version/latest?os={os}**: Fetches the latest version available for the specified operating system.

Example:

```bash
curl "http://localhost:3000/version/latest?os=windows"
```

## Testing the Application

You can test the application by running the client script and checking the backend logs to ensure everything is functioning as expected. The backend should return the appropriate version and files based on the OS you specify.

## Troubleshooting

### 1. Wiping the Database

If you need to completely wipe the database and start fresh, follow these steps:

1. **Stop the Docker Containers**:

   ```bash
   docker-compose down
   ```

2. **Remove the Database Volume**:

   ```bash
   docker volume rm self-updating-program_pgdata
   ```

3. **Restart the Containers**:

   ```bash
   docker-compose up --build
   ```

This will reinitialize the database with the default data.

### 2. Common Issues

- **Port Conflicts**: Ensure that port `3000` is not being used by another application.
- **Missing Dependencies**: Run `npm install` in both the `self-modifying-app` and `client` directories if you encounter missing module errors.

## License

This project is licensed under the Unlicense license. See the `LICENSE` file for details.
