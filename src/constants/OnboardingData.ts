export interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  image: any; // Will be require() path to image
  backgroundColor?: string;
}

export const onboardingData: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Buy Foodstuffs & Pay Your Way!',
    subtitle: 'Pay Instantly, Pay Small-small, Pay Later, Price Lock for Foodstuffs and Bundles',
    image: require('../../assets/onboarding-1.jpg'), // Placeholder - replace with actual image
  },
  {
    id: '2',
    title: 'Ran Out of Food Money? No Worries!',
    subtitle: 'Buy now and Pay-later at Market Price, Zero Interest, No Collateral & No hidden fees',
    image: require('../../assets/onboarding-2.jpg'), // Placeholder - replace with actual image
  },
  {
    id: '3',
    title: 'Curated Food Boxes for Various family sizes',
    subtitle: 'Budget fitted bundles already designed for you to take away the hassles of picking items plus you can create your bundle',
    image: require('../../assets/onboarding-3.jpg'), // Placeholder - replace with actual image
  },
  {
    id: '4',
    title: 'Fast & Reliable Delivery',
    subtitle: 'Skip the store and get your food delivered to door on time every time',
    image: require('../../assets/onboarding-4.jpg'), // Placeholder - replace with actual image
  },
];

export default onboardingData;
