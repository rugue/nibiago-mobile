# Nibiago Mobile - React Native Expo Authentication Flow

This is the React Native Expo mobile app for **Forage Stores** (Nibiago), featuring a complete authentication system with pixel-perfect UI design matching the provided mockups.

## 🎯 Features Implemented

### ✅ Complete Authentication Flow
- **Create Account Screen** - Registration form with validation, Google/Apple auth options
- **Account Type Selection** - Choose between Family Account and Business Account
- **Email Verification** - 4-digit code input with haptic feedback
- **Sign In Screen** - Login with email/password and "Remember me" functionality

### ✅ UI/UX Components
- **Custom TextInput** - With error handling, password visibility toggle, and focus states
- **Custom Dropdown** - Nigerian location selector with modal picker
- **Enhanced Button** - Support for primary, secondary, outline, and accent variants
- **Form Validation** - Real-time validation with Yup schemas and React Hook Form

### ✅ Technical Implementation
- **TypeScript** throughout the entire codebase
- **Expo SecureStore** for secure token and user data storage
- **Axios API Client** with interceptors for authentication
- **Context API** for global authentication state management
- **React Navigation 6** with proper screen transitions
- **Form Validation** with React Hook Form and Yup
- **Haptic Feedback** for enhanced user experience

## 🔧 Technologies Used

- **React Native** with Expo SDK 54+
- **TypeScript** for type safety
- **React Navigation 6** for navigation
- **Expo SecureStore** for secure data storage
- **Axios** for API communication
- **React Hook Form** + **Yup** for form validation
- **Expo Haptics** for tactile feedback
- **Expo Vector Icons** for iconography

## 📱 Screens Implemented

### 1. Create Account Screen
- Form fields: First name, Last name, Email, Phone, Location dropdown, Password, Confirm Password
- Social sign-up buttons (Google & Apple) - UI ready, implementation pending
- Real-time form validation with error messages
- Nigerian phone number formatting
- Password strength indicator (implemented in validation utils)

### 2. Account Type Selection Screen
- Two options: Family Account and Business Account
- Family Account selected by default with green accent color
- Clean design with radio buttons and descriptions
- Continue button with accent color styling

### 3. Email Verification Screen
- 4-digit code input with individual styled boxes
- Auto-focus progression between input fields
- Haptic feedback for key presses and completion
- Resend code functionality with cooldown timer
- Email address masking for privacy

### 4. Sign In Screen
- Email and password input fields
- "Remember me" checkbox functionality
- "Forgot Password?" link (UI ready)
- "Get Food" button matching the design
- "Create an Account" link for new users

## 🔐 Authentication Flow

1. **Onboarding** → User completes onboarding slides
2. **Create Account** → User registers with personal details
3. **Account Type** → User selects Family or Business account
4. **Email Verification** → User enters 4-digit verification code
5. **Dashboard** → User is authenticated and can access the app

Alternative flow:
1. **Sign In** → Returning users can login directly
2. **Dashboard** → Authenticated users go straight to main app

## 🔌 API Integration

The app is configured to work with the Forage Stores backend API:
- **Base URL**: `https://forage-stores-backend.onrender.com`
- **Endpoints**: All authentication endpoints implemented as per API documentation
- **Error Handling**: Proper error messages and user feedback
- **Token Management**: Automatic token storage and refresh handling

### API Endpoints Used:
- `POST /auth/create-account` - User registration
- `POST /auth/select-account-type` - Account type selection
- `POST /auth/verify-email-code` - Email verification
- `POST /auth/login` - User login
- Token refresh and logout functionality

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Custom button with multiple variants
│   ├── TextInput.tsx   # Custom text input with validation
│   └── Dropdown.tsx    # Location dropdown selector
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   │   ├── CreateAccountScreen.tsx
│   │   ├── AccountTypeScreen.tsx
│   │   ├── EmailVerificationScreen.tsx
│   │   └── SignInScreen.tsx
│   ├── SplashScreen.tsx
│   └── OnboardingScreen.tsx
├── services/          # API services
│   └── api.ts         # Centralized API client with auth
├── context/           # Context providers
│   └── AuthContext.tsx # Authentication state management
├── types/             # TypeScript interfaces
│   └── auth.ts        # Auth-related types and constants
├── utils/             # Utility functions
│   └── validation.ts  # Form validation schemas
├── constants/         # App constants
│   ├── Colors.ts      # Brand colors and themes
│   └── Layout.ts      # Spacing, typography, etc.
└── navigation/        # Navigation configuration
    └── AppNavigation.tsx # Main navigation setup
```

## 🎨 Design System

### Colors
- **Primary**: `#2E7D32` (Dark green)
- **Accent**: `#CDDC39` (Lime green) 
- **Background**: White with subtle gray variants
- **Text**: Black primary, gray secondary
- **Status**: Success, warning, error colors

### Typography
- **Headers**: Bold, large font sizes
- **Body**: Regular weight, readable sizes
- **Labels**: Medium weight for form fields
- **Links**: Accent color with medium weight

### Spacing
- **xs**: 4px, **sm**: 8px, **md**: 16px, **lg**: 24px, **xl**: 32px, **xxl**: 48px

## 🔧 Setup Instructions

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run start
```

3. **Run on Device**
```bash
npm run android  # For Android
npm run ios      # For iOS
```

## 🔒 Security Features

- **Expo SecureStore** for sensitive data storage (tokens, user info)
- **Input validation** on both client and server side
- **Password strength validation** with requirements
- **Email format validation** and sanitization
- **Phone number formatting** for Nigerian numbers
- **Error handling** without exposing sensitive information

## 🌟 User Experience Features

- **Haptic Feedback** on interactions and form completion
- **Auto-focus** progression in forms
- **Loading States** with proper indicators
- **Error Messages** with clear, actionable feedback
- **Responsive Design** that works across device sizes
- **Smooth Animations** between screens
- **Keyboard Handling** with proper avoidance

## 🔮 Future Enhancements

- **Google/Apple Sign-In** integration
- **Biometric Authentication** (fingerprint/face ID)
- **Push Notifications** for verification codes
- **Deep Linking** for email verification
- **Offline Support** with data synchronization
- **Multi-language Support**
- **Accessibility Improvements**

## 🐛 Known Issues

- Social sign-in buttons are UI-only (integration pending)
- Password recovery flow needs implementation
- Some error messages may need backend alignment
- Splash screen timing could be optimized

## 🤝 Contributing

This app follows React Native and Expo best practices:
- TypeScript for all new code
- Proper error handling and user feedback
- Consistent styling and component patterns
- API integration following REST conventions
- Secure data handling practices

---

**App Name**: Forage Stores (Nibiago)  
**Platform**: React Native with Expo  
**Status**: Authentication flow complete ✅  
**Next Phase**: Main app features and dashboard implementation
