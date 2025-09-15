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
import { BusinessRegistrationFormData } from '../../types/auth';
import { businessRegistrationSchema } from '../../utils/validation';
import { AuthAPI } from '../../services/api';
import { BUSINESS_CATEGORIES } from '../../types/auth';

const BusinessRegistrationScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BusinessRegistrationFormData>({
    resolver: yupResolver(businessRegistrationSchema),
    mode: 'onBlur',
    defaultValues: {
      ownerFirstName: '',
      ownerLastName: '',
      companyName: '',
      category: '',
      companyAddress: '',
      city: '',
      roleInCompany: '',
      officePhoneNumber: '',
      officeEmailAddress: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: BusinessRegistrationFormData) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await AuthAPI.createAccount({
        accountType: 'business',
        businessData: data,
      });
      
      // Navigate to email verification
      (navigation as any).navigate('EmailVerification', { 
        email: data.officeEmailAddress 
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
            <Text style={styles.title}>Create Business Account</Text>

            {/* Form Fields */}
            <View style={styles.form}>
              <Controller
                control={control}
                name="ownerFirstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Owner First Name"
                    placeholder="Enter owner's first name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.ownerFirstName?.message}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                )}
              />

              <Controller
                control={control}
                name="ownerLastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Owner Last Name"
                    placeholder="Enter owner's last name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.ownerLastName?.message}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                )}
              />

              <Controller
                control={control}
                name="companyName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Company Name"
                    placeholder="Enter company name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.companyName?.message}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                )}
              />

              <Controller
                control={control}
                name="category"
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    label="Business Category"
                    placeholder="Select business category"
                    value={value}
                    onSelect={(option) => onChange(option.value)}
                    options={BUSINESS_CATEGORIES}
                    error={errors.category?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="companyAddress"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Company Address"
                    placeholder="Enter company address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.companyAddress?.message}
                    multiline
                    numberOfLines={3}
                  />
                )}
              />

              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="City"
                    placeholder="Enter city"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.city?.message}
                    autoCapitalize="words"
                  />
                )}
              />

              <Controller
                control={control}
                name="roleInCompany"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Role in Company"
                    placeholder="e.g. CEO, Manager, Owner"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.roleInCompany?.message}
                    autoCapitalize="words"
                  />
                )}
              />

              <Controller
                control={control}
                name="officePhoneNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Office Phone Number"
                    placeholder="Enter office phone number"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.officePhoneNumber?.message}
                    keyboardType="phone-pad"
                  />
                )}
              />

              <Controller
                control={control}
                name="officeEmailAddress"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Office Email Address"
                    placeholder="Enter office email address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.officeEmailAddress?.message}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
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

export default BusinessRegistrationScreen;
