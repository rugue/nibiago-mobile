# 🚀 Image Assets Setup Instructions

## Onboarding Screen Images

To complete the setup of your Nibiago mobile app, you need to replace the placeholder images in the `/assets` folder with the actual images from your design.

### Required Images:

1. **onboarding-1.jpg** - Food boxes image (for "Fast & Reliable Delivery" screen)
2. **onboarding-2.jpg** - Curated boxes image (for "Curated Food Boxes" screen)  
3. **onboarding-3.jpg** - Food spread image (for "Ran Out of Food Money" screen)
4. **onboarding-4.jpg** - Colorful drinks image (for "Buy Food by You" screen)

### Steps to Add Images:

1. Save your images in the `assets` folder with the exact names above
2. Supported formats: .jpg, .png, .webp
3. Recommended size: 375x600 pixels (or maintain aspect ratio)
4. Update the imports in `/src/constants/OnboardingData.ts`:

```typescript
export const onboardingData: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Fast & Reliable Delivery',
    subtitle: 'Skip the store and get your food delivered to your door on time every time',
    image: require('../../assets/onboarding-1.jpg'), // Your food boxes image
  },
  {
    id: '2',
    title: 'Curated Food Boxes for Various family sizes',
    subtitle: 'Budget fitted bundles already designed to take away the hassles of packing items and offer what you can create your bundle.',
    image: require('../../assets/onboarding-2.jpg'), // Your curated boxes image
  },
  {
    id: '3',
    title: 'Ran Out of Food Money? No Problem',
    subtitle: 'Buy now and pay later at 0% Interest, No Collateral & No hidden fees',
    image: require('../../assets/onboarding-3.jpg'), // Your food spread image
  },
  {
    id: '4',
    title: 'Buy Food by You',
    subtitle: 'Customise by Small, meal, Day Later, Price Lock for Foodstuffs and Bundles',
    image: require('../../assets/onboarding-4.jpg'), // Your colorful drinks image
  },
];
```

### Logo/Brand Assets:

For the splash screen logo, you may want to create or add:
- `nibiago-logo.png` - Your brand logo for the splash screen

Then update the splash screen component at `/src/screens/SplashScreen.tsx` to use your actual logo instead of the text-based placeholder.

### Testing:

After adding the images, restart the Expo development server:
```bash
npm start
```

The onboarding screens will now display your custom images!
