/// Google Flights Clone – Setup Guide
///
/// A modern flight search UI built with React 19, Vite, Tailwind CSS, and shadcn/ui.
/// This app uses mocked data by default, but can fetch live flight data
/// from the Sky-Scrapper API via an Express server.
///
/// ## Requirements
/// - Node.js (v18+ recommended)
/// - npm or yarn
///
/// ## Folder Structure
/// - `/client` – React front-end
/// - `/server` – Express backend (`server.js`)
///
/// ## Setup Instructions
///
/// ### 1. Clone the repository
/// ```bash
/// git clone https://github.com/ImadEddine99/google-flights-clone.git
/// cd google-flights-clone
/// ```
///
/// ### 2. Install Front-End Dependencies
/// ```bash
/// cd client
/// npm install
/// ```
///
/// In `.env`, add your RapidAPI key:
/// ```env
/// RAPIDAPI_KEY=your_actual_rapidapi_key
///
/// ### 4. Run the React Front-End (Development Mode)
/// ```bash
/// npm run dev
/// ```
///
/// This starts the Vite dev server at:
/// `http://localhost:5173`
///
/// ### 5. Set Up and Run the Backend Proxy Server
///
/// In a separate terminal:
/// ```bash
/// cd ../server
/// npm install
/// node server.js
/// ```
///
/// This launches an Express server at:
/// `http://localhost:5000`
///
/// It securely forwards requests to the Sky-Scrapper API.
///
/// ### . Configure API Integration (Optional)
///

///
