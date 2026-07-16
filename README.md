# Runner

A full-stack mobile application built with React Native, Expo, Node.js, Express, and MongoDB.

## Project Structure

*   **`runner-app`**: The Expo frontend application.
*   **`runner-backend`**: The Node.js and Express backend API.

## Prerequisites

*   Node.js installed locally.
*   A MongoDB Atlas cluster.
*   The Expo Go application installed on your physical mobile device.

## How to Run

### 1. Start the Backend

*   Open a terminal window and start the API server.

```bash
cd runner-backend
npm install
npm run dev
```

#### Note: Ensure your .env file is properly configured with your MONGO_URI and JWT_SECRET before starting the server.

### 2. Start the Frontend
*   Open a separate terminal window to build and serve the mobile application.

```bash
cd runner-app
npm install
npx expo start -c --tunnel
```

### 3. View on Device
*   Open the Expo Go app on your mobile device.

*   Log in to your Expo account to select the active development server, or scan the QR code generated in the frontend terminal to launch the app.