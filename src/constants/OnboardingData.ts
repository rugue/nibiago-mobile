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
    title: 'Fast & Reliable Delivery',
    subtitle: 'Skip the store and get your food delivered to your door on time every time',
    image: require('../../assets/icon.png'), // Placeholder - replace with actual image
  },
  {
    id: '2',
    title: 'Curated Food Boxes for Various family sizes',
    subtitle: 'Budget fitted bundles already designed to take away the hassles of packing items and offer what you can create your bundle.',
    image: require('../../assets/icon.png'), // Placeholder - replace with actual image
  },
  {
    id: '3',
    title: 'Ran Out of Food Money? No Problem',
    subtitle: 'Buy now and pay later at 0% Interest, No Collateral & No hidden fees',
    image: require('../../assets/icon.png'), // Placeholder - replace with actual image
  },
  {
    id: '4',
    title: 'Buy Food by You',
    subtitle: 'Customise by Small, meal, Day Later, Price Lock for Foodstuffs and Bundles',
    image: require('../../assets/icon.png'), // Placeholder - replace with actual image
  },
];

export default onboardingData;
