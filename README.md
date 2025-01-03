
# LWM Management System

[![Node Version][nodejs-image]][nodejs-url]
[![Express Version][express-image]][express-url]
[![Sequelize Version][sequelize-image]][sequelize-url]
[![PostgreSQL Version][postgres-image]][postgres-url]

<p align="center">
    <img src="header.png" height="360"/>
</p>

The LWM Management System is a robust and scalable solution for managing archival data. It combines a powerful database with a REST API to streamline data management, retrieval, and access control.

## Key features

- **Database Management:** Organize and store archival data efficiently, enabling advanced search and filtering capabilities to quickly find the information you need.
- **Role-Based Access Control (RBAC):** Ensure secure and controlled access to data, allowing you to manage permissions at various levels.
- **Image Handling:** Upload archival images effortlessly. The system automatically generates thumbnails for quick previews while preserving the original images for future use or sharing.
- **REST API:** Integrate the management system with other tools and services using the API, ensuring seamless interoperability.

## Installation

### Step 1: Clone the Repository

Clone this repository to your local machine and cd to the directory:

```bash
git clone https://github.com/muntahaaa/LWMMS
cd LWM-Management-System
```

### Step 2: Install Dependencies

Please make sure you have nodejs and npm installed on your machine. You can also use other package managers like `yarn` or `pnpm`. Use the following command to install dependencies:

```bash
npm install
```
For pnpm, use the following command:

```bash
pnpm install
```

For yarn, use the following command:

```bash
yarn install
```

### Step 3: Set Up Environment Variables

Copy the .env.example file to create your .env file:

```bash
cp .env.example .env
```

Then, open the .env file and update the following variables to configure your database and other environment-specific settings:

```data
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_HOST=your_database_host
DB_PORT=your_database_port
```

Also make sure to update the `JWT_SECRET` to a random string of characters.

```data
JWT_SECRET=your_secret_key
```

> [!WARNING]
> Updating the JWT secret is important to prevent unauthorized access to your application.

### Step 6: Run Migrations and Seed Database

Create the necessary database tables by running the migrations:

```bash
npx sequelize-cli db:migrate
```

After migrations are created, run the seed command:

```bash
npx sequelize-cli db:seed:all
```

### Step 7: Start the Development Server

Finally, start the development server by using:

```bash
npm run start:dev
```

## API Documentation

_to be added_

## Contributing

1. Fork the [repository][repository-url]
2. Create your own feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Added some fooBar'`)
4. Push to your branch (`git push origin feature/fooBar`)
5. Create a new PR (Pull Request)

<!-- Markdown link & img dfn's -->
[express-image]: https://img.shields.io/badge/v4.2.x-000000?style=flat-square&logo=nodeexpressdotjs&logoColor=ffffff&label=express
[express-url]: https://expressjs.com/en/4x/api.html
[nodejs-image]: https://img.shields.io/badge/v22.12.0-5FA04E?style=flat-square&logo=nodedotjs&logoColor=ffffff&label=nodejs
[nodejs-url]: https://nodejs.org/en
[sequelize-image]: https://img.shields.io/badge/v6.37.5-52B0E7?style=flat-square&logo=sequelize&logoColor=ffffff&label=sequelize
[sequelize-url]: https://sequelize.org/
[postgres-image]: https://img.shields.io/badge/v15.10-4169E1?style=flat-square&logo=postgresql&logoColor=ffffff&label=postgresql
[postgres-url]: https://www.postgresql.org/
[wiki]: https://github.com/adnan-bin-wahid/LWM-Management-System/wiki
[repository-url]: https://github.com/adnan-bin-wahid/LWM-Management-System
=======
# LWMMS
run command: npm start
