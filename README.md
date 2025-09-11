# Nibiago Mobile

A React Native mobile application built with Expo and TypeScript for the Forage Stores platform.

## 🎯 Features Implemented

### ✅ Splash Screen & Onboarding
- **Splash Screen**: Dark green branded screen with Nibiago logo
- **Onboarding Flow**: 4-screen walkthrough showcasing key features:
  - Fast & Reliable Delivery
  - Curated Food Boxes for Various family sizes  
  - "Ran Out of Food Money? No Problem" (Payment flexibility)
  - "Buy Food by You" (Customization options)
- **Navigation**: Seamless flow between screens with proper state management
- **Persistent State**: Onboarding completion is saved to prevent repeated shows

### 🎨 Design System
- **Colors**: Consistent brand colors (green theme matching Nibiago branding)
- **Typography**: Scalable text system with proper weights and sizes
- **Components**: Reusable Button component with multiple variants
- **Layout**: Responsive design adapting to different screen sizes
- **Spacing**: Consistent spacing system throughout the app

### 🏗️ Architecture
- **TypeScript**: Full type safety throughout the application
- **Navigation**: React Navigation 6 with Stack Navigator
- **State Management**: React hooks with AsyncStorage for persistence
- **File Structure**: Well-organized modular architecture
- **Constants**: Centralized design tokens and configuration

## 📱 Backend Integration Ready

This mobile app is designed to integrate with the Forage Stores backend API:
- **API Base URL**: `https://forage-stores-backend.onrender.com`
- **Authentication**: JWT-based auth system ready for implementation
- **Features**: Prepared for products, orders, wallet, and delivery features

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. **Important**: Add your onboarding images (see [IMAGE_SETUP.md](./IMAGE_SETUP.md) for details)

### Running the App

#### Development Server
```bash
npm start
```

This will start the Expo development server. You can then:
- Press `a` to open on Android emulator/device
- Press `i` to open on iOS simulator (macOS only)
- Press `w` to open in web browser
- Scan the QR code with Expo Go app on your mobile device

#### Platform-specific Commands
```bash
# Android
npm run android

# iOS (macOS only)
npm run ios

# Web
npm run web
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Button.tsx      # Custom button component
├── constants/          # Design tokens and configuration
│   ├── Colors.ts      # Color palette
│   ├── Layout.ts      # Spacing, typography, shadows
│   └── OnboardingData.ts # Onboarding content
├── navigation/         # Navigation configuration
│   └── AppNavigation.tsx
└── screens/           # App screens
    ├── SplashScreen.tsx
    └── OnboardingScreen.tsx
```

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android
- `npm run ios` - Start on iOS
- `npm run web` - Start on web

### Next Steps for Development

1. **Add Images**: Follow the [IMAGE_SETUP.md](./IMAGE_SETUP.md) guide
2. **Authentication**: Implement login/register screens
3. **API Integration**: Connect to Forage Stores backend
4. **Main App**: Build product catalog, cart, and checkout flows
5. **Wallet**: Implement digital wallet functionality
6. **Push Notifications**: Add real-time notifications

### TypeScript

This project is built with TypeScript. The TypeScript configuration is in `tsconfig.json`.

### Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Navigation Documentation](https://reactnavigation.org/)

### Backend API Documentation
- [Forage Stores Backend API](https://forage-stores-backend.onrender.com/api)
