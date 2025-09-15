import * as yup from 'yup';

// Family Registration validation schema
export const familyRegistrationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters'),
  
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .lowercase(),
  
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^(\+234|234|0)?[789]\d{9}$/,
      'Please enter a valid Nigerian phone number'
    ),
  
  location: yup
    .string()
    .required('Please select your location'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number and special character'
    ),
  
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

// Business Registration validation schema
export const businessRegistrationSchema = yup.object().shape({
  ownerFirstName: yup
    .string()
    .required('Owner first name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters'),
  
  ownerLastName: yup
    .string()
    .required('Owner last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters'),
  
  companyName: yup
    .string()
    .required('Company name is required')
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name cannot exceed 100 characters'),
  
  category: yup
    .string()
    .required('Please select a business category'),
  
  companyAddress: yup
    .string()
    .required('Company address is required')
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address cannot exceed 200 characters'),
  
  city: yup
    .string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City cannot exceed 50 characters'),
  
  roleInCompany: yup
    .string()
    .required('Role in company is required')
    .min(2, 'Role must be at least 2 characters')
    .max(100, 'Role cannot exceed 100 characters'),
  
  officePhoneNumber: yup
    .string()
    .required('Office phone number is required')
    .matches(
      /^(\+234|234|0)?[789]\d{9}$/,
      'Please enter a valid Nigerian phone number'
    ),
  
  officeEmailAddress: yup
    .string()
    .required('Office email is required')
    .email('Please enter a valid email address')
    .lowercase(),
  
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number and special character'
    ),
  
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

// Keep existing createAccountSchema for backward compatibility
export const createAccountSchema = familyRegistrationSchema;

// Sign In validation schema
export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .lowercase(),
  
  password: yup
    .string()
    .required('Password is required')
    .min(1, 'Password is required'),
  
  rememberMe: yup.boolean().default(false),
});

// Email verification schema
export const emailVerificationSchema = yup.object().shape({
  code: yup
    .string()
    .required('Verification code is required')
    .length(4, 'Verification code must be 4 digits')
    .matches(/^\d{4}$/, 'Verification code must contain only numbers'),
});

// Account type selection schema
export const accountTypeSchema = yup.object().shape({
  accountType: yup
    .string()
    .required('Please select an account type')
    .oneOf(['family', 'business'], 'Invalid account type selected'),
});

// Password strength checker
export const getPasswordStrength = (password: string) => {
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  strength = Object.values(checks).filter(Boolean).length;

  let label = 'Very Weak';
  let color = '#F44336';

  if (strength >= 4) {
    label = 'Strong';
    color = '#4CAF50';
  } else if (strength >= 3) {
    label = 'Good';
    color = '#FF9800';
  } else if (strength >= 2) {
    label = 'Fair';
    color = '#FFC107';
  } else if (strength >= 1) {
    label = 'Weak';
    color = '#FF5722';
  }

  return {
    strength,
    label,
    color,
    checks,
    percentage: (strength / 5) * 100,
  };
};

// Phone number formatter for Nigerian numbers
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits
  const digitsOnly = value.replace(/\D/g, '');
  
  // Handle different input formats
  if (digitsOnly.startsWith('234')) {
    // Remove country code for display
    return digitsOnly.substring(3);
  } else if (digitsOnly.startsWith('0')) {
    // Remove leading zero
    return digitsOnly.substring(1);
  }
  
  return digitsOnly;
};

// Phone number display formatter
export const displayPhoneNumber = (value: string): string => {
  const formatted = formatPhoneNumber(value);
  if (formatted.length >= 10) {
    return `${formatted.substring(0, 3)} ${formatted.substring(3, 6)} ${formatted.substring(6)}`;
  } else if (formatted.length >= 6) {
    return `${formatted.substring(0, 3)} ${formatted.substring(3, 6)} ${formatted.substring(6)}`;
  } else if (formatted.length >= 3) {
    return `${formatted.substring(0, 3)} ${formatted.substring(3)}`;
  }
  return formatted;
};

export default {
  createAccountSchema,
  signInSchema,
  emailVerificationSchema,
  accountTypeSchema,
  getPasswordStrength,
  formatPhoneNumber,
  displayPhoneNumber,
};
