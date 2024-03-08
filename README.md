# Lost Pet Finder

## Introduction

Welcome to **Lost Pet Finder**, a compassionate community-driven platform dedicated to reuniting lost pets with their loving families. In the unsettling event of a pet going missing, time is of the essence and community support is invaluable. **Lost Pet Finder** leverages the power of collective effort, enabling pet owners to post detailed information about their lost pets along with rewards for assistance in finding them.

Our application simplifies the process of reporting and searching for lost pets, making it easier for users to collaborate and spread the word. By incentivizing the search with rewards, we aim to motivate a wider audience to keep an eye out for missing pets and to take active steps in reuniting them with their owners. Whether you've lost a pet or wish to contribute to the noble cause of helping lost pets find their way home, **Lost Pet Finder** is your go-to resource for making a difference in the lives of pets and their families.

Join us in creating a caring and vigilant community where every lost pet stands a better chance of being found. Together, we can bring joy and relief to pet owners and ensure the safe return of their beloved companions.


## Project Structure

- `client/`: Contains all the source code for the project's frontend.
  - See [client/README.md](client/README.md) for more details.
- `api/`: Contains all the source code for the project's backend.
  - See [api/README.md](api/README.md) for more details.


## Technology Stack

### Frontend (`client/` directory)
The Lost Pet Finder frontend is built using the following technologies:
- **UI Framework**: [React](https://reactjs.org/) for building a dynamic and interactive user interface.
- **State Management**: [Redux](https://redux.js.org/) for managing and centralizing the application's state, facilitating communication between components.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS, allowing for rapid UI development without leaving your HTML.
- **Routing**: [React Router](https://reactrouter.com/) for navigation within the application.

### Backend (`api/` directory)
The Lost Pet Finder backend leverages these technologies:
- **Programming Language**: [Node.js](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/), combining the runtime efficiency of Node.js with the type safety of TypeScript.
- **Web Framework**: [Express](https://expressjs.com/) for efficient handling of server requests and responses.
- **Database**: [PostgreSQL](https://www.postgresql.org/) for storing detailed information about lost pets, their owners, and any rewards offered.
- **ORM (Object-Relational Mapping)**: [Prisma](https://www.prisma.io/) for database access and management, offering a powerful and type-safe API for querying and manipulating data.
- **Email Service**: [Nodemailer](https://nodemailer.com/about/) for sending emails directly from our server, crucial for notifications and user verification processes.
- **Image Storage**: [Amazon S3](https://aws.amazon.com/s3/) for scalable and secure cloud storage solutions for our application's images and assets.


### Development and Deployment Tools
- **Version Control**: Git for tracking changes and facilitating code collaboration.
- **Containerization**: [Docker](https://www.docker.com/) for packaging the application and its dependencies into a container for easy deployment.
- **API Testing and Collaboration Tool**: [Postman](https://www.postman.com/) for designing, testing, documenting, and sharing APIs within the team.

## Additional Project Details

### Development Scripts
- `npm run dev`: Starts the development server with live reloading.
- `npm run build`: Compiles TypeScript to JavaScript for production.
- `npm run start`: Runs the built application.
- `npm run prisma:migrate:prod`: Deploys database migrations in production.
- `npm run seed`: Populates the database with initial seed data.

### Environment Variable Management
We use `dotenv` and `env-var` for managing environment variables, ensuring that our application configuration is secure and adaptable to different environments.

### Security Practices
- **Password Hashing**: `bcryptjs` for secure password hashing.
- **Authentication**: `jsonwebtoken` for managing JWTs, ensuring secure and efficient user authentication.

### Future Considerations
- **Testing**: We aim to incorporate testing to ensure reliability and stability. Contributions in this area are welcome.


