import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Colors from '../../constants/Colors';
import { Spacing } from '../../constants/Layout';
import { FamilyRegistrationFormData } from '../../types/auth';
import { familyRegistrationSchema } from '../../utils/validation';
import { AuthAPI } from '../../services/api';
import { NIGERIAN_LOCATIONS } from '../../types/auth';

const FamilyRegistrationScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FamilyRegistrationFormData>({
    resolver: yupResolver(familyRegistrationSchema),
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

  const onSubmit = async (data: FamilyRegistrationFormData) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await AuthAPI.createAccount({
        accountType: 'family',
        familyData: data,
      });
      
      // Navigate to email verification
      (navigation as any).navigate('EmailVerification', { 
        email: data.email 
      });
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
        <Image source={require('../../../assets/nibia.png')} style={styles.headerLogo} />
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Family Account</Text>

            {/* Form Fields */}
            <View style={styles.form}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="First Name"
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
                    label="Last Name"
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
                    label="Email Address"
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
                    label="Phone Number"
                    placeholder="Enter your phone number"
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
                    placeholder="Select your location"
                    value={value}
                    onSelect={(option) => onChange(option.value)}
                    options={NIGERIAN_LOCATIONS}
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
                    placeholder="Confirm your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.confirmPassword?.message}
                    isPassword={true}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>

        {/* Bottom Section - Sticky */}
        <View style={styles.bottomSection}>
          <Button
            title={isLoading ? 'Creating Account...' : 'Create Account'}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            variant="primary"
            style={styles.submitButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.authHeader,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.md,
  },
  formContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.titleColor,
    textAlign: 'center',
    lineHeight: 24 * 1.2,
    marginBottom: Spacing.xl,
    fontFamily: 'Nunito Sans',
  },
  form: {
    marginBottom: Spacing.lg,
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.md,
    backgroundColor: Colors.white,
  },
  submitButton: {
    marginBottom: Spacing.lg,
  },
});

export default FamilyRegistrationScreen;
