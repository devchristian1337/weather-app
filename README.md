# Weather App ⛅

![Preview](https://iili.io/2m6k5rl.png)

A modern, responsive weather application built with React, TypeScript, and Vite. Get real-time weather information and forecasts for any location worldwide.

## Features 🌟

- **Real-time Weather Data**: Get current weather conditions and forecasts
- **Geolocation Support**: Automatically fetches weather for user's location
- **Search Functionality**: Look up weather information for any location
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dynamic Backgrounds**: Background changes based on weather conditions
- **Forecast View**: View weather forecasts for upcoming days
- **Error Handling**: Graceful error handling and user feedback
- **Loading States**: Smooth loading transitions with loading indicators

## Tech Stack 🛠️

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **UI Components**: Custom components with Framer Motion animations
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Prerequisites 📋

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn

## Installation 🚀

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Weather API key:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Available Scripts 📝

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure 📁

```
src/
├── components/         # React components
├── store/              # Zustand store
├── lib/                # Utility functions
├── types/              # TypeScript types
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Environment Variables 🔑

The following environment variables are required:

- `VITE_WEATHER_API_KEY` - Your Weather API key

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## Author ✨

devchristian1337

## Acknowledgments 🙏

- Weather data provided by WeatherAPI.com
- Icons by Lucide React
