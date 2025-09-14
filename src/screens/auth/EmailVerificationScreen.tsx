import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput as RNTextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Spacing } from '../../constants/Layout';
import { AuthAPI, SecureStorage } from '../../services/api';

interface RouteParams {
  email?: string;
}

const EmailVerificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = (route.params as RouteParams) || {};

  const [code, setCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Refs for the input fields
  const inputRefs = useRef<(RNTextInput | null)[]>([]);

  // Get stored email if not passed as parameter
  const [userEmail, setUserEmail] = useState(email || '');

  useEffect(() => {
    const getUserEmail = async () => {
      if (!userEmail) {
        try {
          const user = await SecureStorage.getUser();
          if (user?.email) {
            setUserEmail(user.email);
          }
        } catch (error) {
          console.error('Error getting user email:', error);
        }
      }
    };
    getUserEmail();
  }, [userEmail]);

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleCodeChange = (value: string, index: number) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit when all fields are filled
    if (newCode.every(digit => digit !== '') && value) {
      handleVerify(newCode);
    }

    // Haptic feedback
    if (value) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (codeArray?: string[]) => {
    const verificationCode = (codeArray || code).join('');
    
    if (verificationCode.length !== 4) {
      Alert.alert('Invalid Code', 'Please enter the complete 4-digit code.');
      return;
    }

    if (!userEmail) {
      Alert.alert('Error', 'Email address not found. Please try again.');
      return;
    }

    setIsLoading(true);
    try {
      await AuthAPI.verifyEmail({
        email: userEmail,
        code: verificationCode,
      });
      
      // Success haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Navigate to main app or success screen
      Alert.alert(
        'Verification Successful!',
        'Your email has been verified successfully.',
        [
          {
            text: 'Continue',
            onPress: () => {
              // Navigate to main app or dashboard
              navigation.navigate('Dashboard' as never);
            },
          },
        ]
      );
    } catch (error: any) {
      // Error haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      
      Alert.alert(
        'Verification Failed',
        error.message || 'The verification code is incorrect. Please try again.',
        [{ text: 'OK' }]
      );
      
      // Clear the code inputs on error
      setCode(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || isResendLoading) return;

    setIsResendLoading(true);
    try {
      // Call resend endpoint if your API has one
      // await AuthAPI.resendVerificationCode({ email: userEmail });
      
      Alert.alert(
        'Code Resent',
        'A new verification code has been sent to your email.',
        [{ text: 'OK' }]
      );
      
      setResendCooldown(60); // 60 seconds cooldown
      
    } catch (error: any) {
      Alert.alert(
        'Resend Failed',
        error.message || 'Failed to resend the verification code. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsResendLoading(false);
    }
  };

  const formatEmail = (email: string) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    if (username.length <= 3) return email;
    return `${username.substring(0, 3)}****@${domain}`;
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

      <KeyboardAvoidingView 
        style={styles.content} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Verify your Email</Text>
          <Text style={styles.subtitle}>
            Enter 4-digit code the we just sent to your{'\n'}
            email address {formatEmail(userEmail)}
          </Text>

          {/* Code Input */}
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <RNTextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.codeInput,
                  digit && styles.codeInputFilled,
                ]}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* Resend Code */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            <TouchableOpacity
              onPress={handleResendCode}
              disabled={resendCooldown > 0 || isResendLoading}
            >
              <Text style={[
                styles.resendLink,
                (resendCooldown > 0 || isResendLoading) && styles.resendLinkDisabled,
              ]}>
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : isResendLoading
                  ? 'Sending...'
                  : 'Resend Code'
                }
              </Text>
            </TouchableOpacity>
          </View>

          {/* Verify Button */}
          <Button
            title={isLoading ? 'Verifying...' : 'Verify Code'}
            onPress={() => handleVerify()}
            disabled={code.some(digit => digit === '') || isLoading}
            style={styles.verifyButton}
          />
        </View>
      </KeyboardAvoidingView>
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
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xxl,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderRadius: 12,
    backgroundColor: Colors.background.secondary,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginHorizontal: Spacing.xs,
  },
  codeInputFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  resendText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  resendLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  resendLinkDisabled: {
    color: Colors.text.muted,
  },
  verifyButton: {
    width: '100%',
    marginTop: Spacing.lg,
  },
});

export default EmailVerificationScreen;
