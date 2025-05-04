# Stock App

![React Native](https://img.shields.io/badge/React%20Native-0.79.2-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.7.0-purple)
![React Navigation](https://img.shields.io/badge/React%20Navigation-7.1.7-orange)

A modern, responsive mobile application for tracking stock prices with real-time data visualization and theme switching capabilities.

## 📱 Application Overview

Stock App provides users with an elegant interface to view stock market data, featuring:

- Home screen with a list of popular stocks
- Detailed stock view with price charts
- Real-time stock data via API
- Beautiful UI with support for both dark and light themes
- Visual stock price history displayed through custom charts
- Comprehensive market data summary

## 🏗️ Project Structure

StockApp/
├── components/         # Reusable UI components
├── navigation/         # Navigation configuration
├── redux/              # State management with Redux Toolkit
├── screens/            # Application screens
├── theme/              # Theme configuration
├── App.tsx             # Application entry point
└── index.js            # React Native entry point


## 📋 Core Components Explained

### React Native Basic Components

- **View**: A container component (similar to div in web) for other components
  - Example: `<View style={styles.container}></View>`
  
- **SafeAreaView**: Ensures content is rendered within the safe area boundaries of a device
  - Example: `<SafeAreaView style={styles.container}></SafeAreaView>`
  
- **Text**: Displays text content with styling support
  - Example: `<Text style={styles.title}>Stocks</Text>`
  
- **ScrollView**: Provides a scrollable container for content
  - Example: `<ScrollView showsVerticalScrollIndicator={false}></ScrollView>`
  
- **TouchableOpacity**: Creates a touchable element with opacity feedback
  - Example: `<TouchableOpacity onPress={() => navigation.goBack()}></TouchableOpacity>`
  
- **FlatList**: Efficiently renders scrollable lists
  - Example: `<FlatList data={stocks} renderItem={({item}) => <StockCard item={item} />} />`
  
- **Switch**: Provides a toggle switch component for boolean inputs
  - Example: `<Switch value={darkMode} onValueChange={() => dispatch(toggleTheme())} />`

### Navigation

The app uses React Navigation for screen management:

```javascript
// AppNavigator.jsx
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StockDetail" component={StockDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

Navigation between screens:
```javascript
// Navigate to stock details
navigation.navigate('StockDetail', {stock: item});

// Go back to previous screen
navigation.goBack();
```

### State Management with Redux Toolkit

The app uses Redux Toolkit for global state management, primarily for theme handling:

```javascript
// themeSlice.js
const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: true,
  },
  reducers: {
    toggleTheme: state => {
      state.darkMode = !state.darkMode;
    },
  },
});
```

Accessing state in components:
```javascript
const darkMode = useSelector(state => state.theme.darkMode);
const theme = darkMode ? darkTheme : lightTheme;
```

Dispatching actions:
```javascript
const dispatch = useDispatch();
// Toggle theme
dispatch(toggleTheme());
```

### Theming System

The app has a robust theming system with light and dark themes:

```javascript
// themes.js
export const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  card: '#F5F5F5',
  accent: '#007bff',
};

export const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  card: '#1E1E1E',
  accent: '#1E90FF',
};
```

Applying themes to components:
```javascript
<View style={[styles.container, {backgroundColor: theme.background}]}>
  <Text style={[styles.title, {color: theme.text}]}>Stocks</Text>
</View>
```

### API Integration

The app fetches stock data from an external API using Axios:

```javascript
axios
  .get('https://reactnativestockapp.onrender.com/api/stocks')
  .then(res => setStocks(Object.values(res.data)))
  .catch(err => console.log(err));
```

### Stock Chart Visualization

The app implements custom chart visualization for stock price history:

```javascript
// Vertical line chart implementation
<View style={styles.chartPlotArea}>
  {chartData.map((value, index) => {
    const currentHeight = chartRange === 0 ? 0.5 : (value - minValue) / chartRange;
    const leftPosition = `${(index / (chartData.length - 1)) * 100}%`;
    
    return (
      <View key={index} style={styles.plotPointContainer}>
        {/* Vertical line */}
        <View 
          style={[styles.verticalLine, 
            {
              backgroundColor: performanceColor,
              bottom: 0,
              left: leftPosition,
              height: `${currentHeight * 100}%`,
            },
          ]} 
        />
        
        {/* Data point */}
        <View 
          style={[styles.chartDot, 
            {
              backgroundColor: performanceColor,
              bottom: `${currentHeight * 100}%`,
              left: leftPosition,
            },
          ]} 
        />
      </View>
    );
  })}
</View>
```

## 🚀 Getting Started

### Prerequisites

- Node.js (>=18)
- npm or yarn
- React Native environment setup (React Native CLI)
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Clone the repository

```sh
git clone https://github.com/yourusername/StockApp.git
cd StockApp
```

2. Install dependencies

```sh
npm install
# or
yarn install
```

3. For iOS, install pod dependencies

```sh
cd ios && pod install && cd ..
```

### Running the Application

#### Start Metro

```sh
npm start
# or
yarn start
```

#### Run on Android

```sh
npm run android
# or
yarn android
```

#### Run on iOS

```sh
npm run ios
# or
yarn ios
```

## ✨ Features

### Home Screen

- List of stocks with current prices and percentage changes
- Theme toggle in the header
- Navigation to detailed stock view

### Stock Detail Screen

- Detailed stock information
- Price chart visualization
- Theme toggle in the header
- Market summary with key metrics

### Theme Switching

The app supports dynamic theme switching with smooth transitions between light and dark modes, controlled via the theme toggle in the header.

## 🧩 Custom Components

### StockCard

A reusable card component that displays stock information in the Home screen:

```javascript
const StockCard = ({item, theme}) => {
  const isPositive = item.change >= 0;
  
  return (
    <View style={[styles.card, {backgroundColor: theme.card}]}>
      <View style={styles.cardContent}>
        <View style={styles.leftContent}>
          <Text style={[styles.symbol, {color: theme.text}]}>{item.symbol}</Text>
          <Text style={[styles.name, {color: theme.text + '99'}]}>{item.name}</Text>
        </View>
        
        <View style={styles.rightContent}>
          <Text style={[styles.price, {color: theme.text}]}>
            ${parseFloat(item.price).toFixed(2)}
          </Text>
          <Text style={[styles.change, {color: isPositive ? '#00FF99' : '#FF6B6B'}]}>
            {isPositive ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
          </Text>
        </View>
      </View>
    </View>
  );
};
```

## 📝 Development Notes

- The app uses functional components with React Hooks throughout
- Style objects use React Native's StyleSheet.create for optimal performance
- The project is set up to support both iOS and Android platforms
- Theme changes are persisted with Redux

## 🔧 Troubleshooting

### Common Issues

1. **Build errors**: Make sure all dependencies are properly installed
   ```sh
   npm install
   cd ios && pod install
   ```

2. **Metro bundler issues**: Clear cache and restart
   ```sh
   npm start -- --reset-cache
   ```

3. **API connection issues**: Check if the API endpoint is accessible and your device has internet connection

## 📚 Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Navigation](https://reactnavigation.org/)

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using React Native and modern JavaScript technologies.


