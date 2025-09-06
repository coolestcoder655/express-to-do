# Express + React To-Do App

This repository contains a simple To-Do application built using Express.js for the backend and React with TypeScript for the frontend. It demonstrates my learning journey with modern web development technologies, including React, TypeScript, TailwindCSS, and Express.

## Features

- **Backend**: Built with Express.js to manage API endpoints and server functionalities.
- **Frontend**: Developed with React and TypeScript for a dynamic and type-safe UI.
- **Styling**: TailwindCSS for quick and responsive design.
- **State Management**: Uses React's Context API for managing application state.
- **Database**: TBD (Can be extended with MongoDB, PostgreSQL, or any preferred database).

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/coolestcoder655/express-to-do.git
   ```

2. Navigate to the project directory:
   ```bash
   cd express-to-do
   ```

3. Install dependencies for both backend and frontend:
   ```bash
   # Install backend dependencies
   npm install

   # Navigate to the client folder and install frontend dependencies
   cd client
   npm install
   ```

4. Run the development servers:
   ```bash
   # Run the backend server
   npm run dev

   # In a separate terminal, navigate to the client folder and run the frontend server
   cd client
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:3000` (or the specified port).

## Project Structure

```
express-to-do/
├── client/          # Frontend code using React + TypeScript
├── server/          # Backend code using Express.js
├── public/          # Static assets
├── package.json     # Project metadata and scripts
└── README.md        # Project documentation
```

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - TailwindCSS
  - Vite

- **Backend**:
  - Express.js
  - Node.js

## Contributing

Contributions are welcome! Feel free to fork this repository, make your changes, and submit a pull request. Please ensure your code follows the existing coding style and includes relevant tests.

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy coding! 😊