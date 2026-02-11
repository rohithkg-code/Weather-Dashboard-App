# Weather Dashboard

A modern, responsive weather dashboard built with React and Vite. Search for any city to view current weather conditions and a 5-day forecast.

🌐 **Live Demo**: [https://hilarious-puffpuff-3a85d3.netlify.app/](https://hilarious-puffpuff-3a85d3.netlify.app/)

## Features

- 🔍 **City Search** - Search weather by city name
- 🌡️ **Current Weather** - Temperature, condition, humidity, wind speed, "feels like"
- 📅 **5-Day Forecast** - Daily highs/lows with weather icons
- 🌍 **Location Display** - City name, country, current date/time
- ❌ **Error Handling** - User-friendly error messages for invalid cities
- ⏳ **Loading States** - Smooth loading animations
- 📱 **Fully Responsive** - Mobile-first design
- ✨ **Modern UI** - Clean blue/white theme with smooth animations
- 🧪 **Automated Testing** - Cucumber + Playwright with visual mode

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **OpenWeatherMap API** - Weather data
- **Lucide React** - Icons
- **Vanilla CSS** - Styling
- **Cucumber + Playwright** - Automated testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run automated tests (visual mode)

## Automated Testing

The project includes automated browser testing with Cucumber and Playwright.

### Run Tests
```bash
npm test
```

Tests run in **visual mode** by default - you'll see the browser window open and watch automated testing happen!

For more details, see [TESTING.md](TESTING.md)

## Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Project Structure

```
src/
├── components/          # React components
│   ├── SearchBar.jsx
│   ├── CurrentWeather.jsx
│   └── Forecast.jsx
├── services/           # API services
│   └── weatherService.js
├── App.jsx            # Main app component
├── App.css            # App styles
└── index.css          # Global styles

tests/
├── features/          # Cucumber test scenarios
└── steps/             # Test step definitions
```

## License

MIT

## Acknowledgments

- Weather data from [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Lucide](https://lucide.dev/)
