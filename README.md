# Nibiago Mobile

A React Native mobile application built with Expo and TypeScript.

## Getting Started

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

### Project Structure

```
.
├── App.tsx                 # Main app component
├── app.json               # Expo configuration
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── .github/               # GitHub specific files
└── README.md              # Project documentation
```

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android
- `npm run ios` - Start on iOS
- `npm run web` - Start on web

### TypeScript

This project is built with TypeScript. The TypeScript configuration is in `tsconfig.json`.

### Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
