// Authentication Types and Interfaces

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  accountType: 'family' | 'business';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  password: string;
  confirmPassword: string;
}

export interface CreateAccountResponse {
  user: User;
  tempToken: string;
  message: string;
}

export interface SelectAccountTypeRequest {
  accountType: 'family' | 'business';
}

export interface SelectAccountTypeResponse {
  user: User;
  message: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface VerifyEmailResponse {
  user: User;
  accessToken: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  message: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  tempToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  createAccount: (data: CreateAccountRequest) => Promise<void>;
  selectAccountType: (accountType: 'family' | 'business') => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  clearTempToken: () => void;
}

// Form validation schemas types
export interface CreateAccountFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  password: string;
  confirmPassword: string;
}

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface EmailVerificationFormData {
  code: string;
}

// API Error Response
export interface ApiError {
  message: string;
  statusCode: number;
  error: string;
}

// Location data for dropdown
export interface LocationOption {
  label: string;
  value: string;
}

// Nigerian states and major cities
export const NIGERIAN_LOCATIONS: LocationOption[] = [
  { label: 'Lagos State', value: 'lagos' },
  { label: 'Abuja (FCT)', value: 'abuja' },
  { label: 'Kano State', value: 'kano' },
  { label: 'Rivers State', value: 'rivers' },
  { label: 'Oyo State', value: 'oyo' },
  { label: 'Kaduna State', value: 'kaduna' },
  { label: 'Ogun State', value: 'ogun' },
  { label: 'Imo State', value: 'imo' },
  { label: 'Delta State', value: 'delta' },
  { label: 'Edo State', value: 'edo' },
  { label: 'Anambra State', value: 'anambra' },
  { label: 'Plateau State', value: 'plateau' },
  { label: 'Cross River State', value: 'cross-river' },
  { label: 'Akwa Ibom State', value: 'akwa-ibom' },
  { label: 'Enugu State', value: 'enugu' },
  { label: 'Ondo State', value: 'ondo' },
  { label: 'Kwara State', value: 'kwara' },
  { label: 'Osun State', value: 'osun' },
  { label: 'Abia State', value: 'abia' },
  { label: 'Borno State', value: 'borno' },
  { label: 'Bayelsa State', value: 'bayelsa' },
  { label: 'Taraba State', value: 'taraba' },
  { label: 'Adamawa State', value: 'adamawa' },
  { label: 'Niger State', value: 'niger' },
  { label: 'Kogi State', value: 'kogi' },
  { label: 'Sokoto State', value: 'sokoto' },
  { label: 'Kebbi State', value: 'kebbi' },
  { label: 'Bauchi State', value: 'bauchi' },
  { label: 'Jigawa State', value: 'jigawa' },
  { label: 'Benue State', value: 'benue' },
  { label: 'Zamfara State', value: 'zamfara' },
  { label: 'Gombe State', value: 'gombe' },
  { label: 'Ekiti State', value: 'ekiti' },
  { label: 'Nasarawa State', value: 'nasarawa' },
  { label: 'Ebonyi State', value: 'ebonyi' },
  { label: 'Yobe State', value: 'yobe' }
];
