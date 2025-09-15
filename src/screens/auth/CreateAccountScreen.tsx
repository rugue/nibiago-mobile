import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import TextInput from '../../components/TextInput';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Spacing } from '../../constants/Layout';
import { CreateAccountFormData, NIGERIAN_LOCATIONS, LocationOption } from '../../types/auth';
import { createAccountSchema } from '../../utils/validation';
import { AuthAPI } from '../../services/api';

const CreateAccountScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  // Google G SVG with authentic colors
  const googleGSvg = `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_44_601" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="9" y="8" width="9" height="8">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5577 9.67981C17.5577 9.12001 17.5075 8.58168 17.4141 8.06494H9.97852V11.1189H14.2275C14.0444 12.1057 13.4882 12.9419 12.6521 13.5017V15.4827H15.2036C16.6965 14.1082 17.5577 12.0842 17.5577 9.67981Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_44_601)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.97852 15.4827H17.5577V8.06494H9.97852V15.4827Z" fill="#5070A8"/>
    </g>
    <mask id="mask1_44_601" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="11" width="14" height="7">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.97858 17.3959C12.1102 17.3959 13.8974 16.6889 15.2036 15.4832L12.6521 13.5022C11.9451 13.9759 11.0408 14.2558 9.97858 14.2558C7.92228 14.2558 6.18177 12.867 5.56099 11.0009H2.92334V13.0465C4.22243 15.6267 6.89232 17.3959 9.97858 17.3959Z" fill="white"/>
    </mask>
    <g mask="url(#mask1_44_601)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.92334 17.3959H15.2036V11.0009H2.92334V17.3959Z" fill="#2F9E4F"/>
    </g>
    <mask id="mask2_44_601" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="5" width="4" height="9">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.56089 11.0008C5.40295 10.5271 5.31323 10.0211 5.31323 9.50071C5.31323 8.98039 5.40295 8.47439 5.56089 8.00067V5.9552H2.92324C2.38854 7.021 2.0835 8.22677 2.0835 9.50071C2.0835 10.7747 2.38854 11.9805 2.92324 13.0463L5.56089 11.0008Z" fill="white"/>
    </mask>
    <g mask="url(#mask2_44_601)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.0835 13.0463H5.56089V5.9552H2.0835V13.0463Z" fill="#EFB529"/>
    </g>
    <mask id="mask3_44_601" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="1" width="14" height="8">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.97857 4.74583C11.1377 4.74583 12.1784 5.14419 12.9966 5.9265L15.2611 3.66207C13.8938 2.38813 12.1066 1.60577 9.97857 1.60577C6.89232 1.60577 4.22243 3.37498 2.92334 5.95524L5.56099 8.00071C6.18177 6.13464 7.92228 4.74583 9.97857 4.74583Z" fill="white"/>
    </mask>
    <g mask="url(#mask3_44_601)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.92334 8.00071H15.2611V1.60577H2.92334V8.00071Z" fill="#D53E36"/>
    </g>
  </svg>`;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<CreateAccountFormData>({
    resolver: yupResolver(createAccountSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: CreateAccountFormData) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await AuthAPI.createAccount(data);
      // Navigate to account type selection
      navigation.navigate('AccountType' as never);
    } catch (error: any) {
      Alert.alert(
        'Registration Failed',
        error.message || 'An error occurred during registration. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    Alert.alert('Coming Soon', 'Google Sign Up will be available soon!');
  };

  const handleAppleSignUp = () => {
    Alert.alert('Coming Soon', 'Apple Sign Up will be available soon!');
  };

  const handleSignInRedirect = () => {
    navigation.navigate('SignIn' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('SignIn' as never)}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Image 
          source={require('../../../assets/nibia.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
        enabled={true}
      >
        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          keyboardDismissMode="on-drag"
        >
          <View style={styles.formContainer}>
          <Text style={styles.title}>Create an Account</Text>
          <TouchableOpacity onPress={handleSignInRedirect}>
            <Text style={styles.subtitle}>
              Already registered? <Text style={styles.signInLink}>Sign In</Text>
            </Text>
          </TouchableOpacity>

          {/* Social Sign Up Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity 
              style={styles.socialButton} 
              onPress={handleGoogleSignUp}
            >
              <SvgXml xml={googleGSvg} width={20} height={19} />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.socialButton} 
              onPress={handleAppleSignUp}
            >
              <Ionicons name="logo-apple" size={20} color={Colors.black} />
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="First name"
                  placeholder="Enter your first name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.firstName?.message}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              )}
            />

            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Last name"
                  placeholder="Enter your last name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.lastName?.message}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email address"
                  placeholder="Enter your email address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Phone number"
                  placeholder="Enter active phone number"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.phone?.message}
                  keyboardType="phone-pad"
                />
              )}
            />

            <Controller
              control={control}
              name="location"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  label="Location"
                  placeholder="Select location"
                  value={value}
                  options={NIGERIAN_LOCATIONS}
                  onSelect={(option: LocationOption) => onChange(option.value)}
                  error={errors.location?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  isPassword={true}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Confirm Password"
                  placeholder="Enter password again to confirm"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  isPassword={true}
                />
              )}
            />
          </View>

          {/* Submit Button */}
          <Button
            title={isLoading ? 'Creating Account...' : 'Sign up'}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            style={styles.submitButton}
            variant="primary"
          />
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator 
                size="small" 
                color={Colors.primary} 
              />
            </View>
          )}
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.authHeader, // Match header color for consistency
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: Colors.white, // Back to white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingTop: Spacing.xl,
    backgroundColor: Colors.authHeader,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    width: 80,
    height: 30,
    resizeMode: 'contain',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  scrollContent: {
    paddingBottom: Spacing.md, // Minimal bottom padding
  },
  formContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg, // Reduced since scrollContent handles bottom padding
  },
  title: {
    fontSize: 24,
    fontWeight: '700', // Bold
    color: Colors.titleColor, // #0B3438
    textAlign: 'center',
    lineHeight: 24 * 1.2, // 120% line height
    letterSpacing: 0,
    marginBottom: Spacing.xs,
    fontFamily: 'Nunito Sans'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500', // Medium
    color: Colors.black, // #000000
    textAlign: 'center',
    lineHeight: 16 * 1.2, // 120% line height
    letterSpacing: 0,
    marginBottom: Spacing.lg,
    fontFamily: 'Nunito Sans'
  },
  signInLink: {
    color: Colors.signInLinkColor, // #B0C118
    fontWeight: '700', // Bold
    fontSize: 16,
    lineHeight: 16 * 1.2, // 120% line height
    letterSpacing: 0,
    fontFamily: 'Nunito Sans'
  },
  socialContainer: {
    marginBottom: Spacing.lg,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4', // Updated background color
    borderWidth: 0, // Remove border for cleaner look
    borderRadius: 25, // More oval shape
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
  },
  socialButtonText: {
    marginLeft: Spacing.sm,
    fontSize: 16,
    fontWeight: '500', // Medium
    color: Colors.socialButtonText, // #333333
    lineHeight: 16 * 1.2, // 120% line height
    letterSpacing: 0,
    fontFamily: 'Nunito Sans'
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border.light,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    fontSize: 14,
    color: Colors.text.secondary,
  },
  form: {
    marginBottom: Spacing.lg,
  },
  submitButton: {
    marginTop: Spacing.md,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
});

export default CreateAccountScreen;
