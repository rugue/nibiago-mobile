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
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>nibia</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
              <Ionicons name="logo-google" size={20} color="#DB4437" />
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
                  leftIcon="mail-outline"
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
                  leftIcon="call-outline"
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
                  leftIcon="lock-closed-outline"
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
                  leftIcon="lock-closed-outline"
                />
              )}
            />
          </View>

          {/* Submit Button */}
          <Button
            title={isLoading ? 'Creating Account...' : 'Sign up'}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isLoading}
            style={styles.submitButton}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.accent,
    textAlign: 'center',
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
  formContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  signInLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
  socialContainer: {
    marginBottom: Spacing.lg,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
  },
  socialButtonText: {
    marginLeft: Spacing.sm,
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: '500',
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
