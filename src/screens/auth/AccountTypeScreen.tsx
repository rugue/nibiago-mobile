import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import { Spacing } from '../../constants/Layout';
import { AuthAPI } from '../../services/api';

type AccountType = 'family' | 'business' | null;

const AccountTypeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState<AccountType>('family');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedType) {
      Alert.alert('Selection Required', 'Please select an account type to continue.');
      return;
    }

    setIsLoading(true);
    try {
      await AuthAPI.selectAccountType({ accountType: selectedType });
      // Navigate to email verification
      navigation.navigate('EmailVerification' as never);
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'An error occurred. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const AccountOption = ({ 
    type, 
    title, 
    description, 
    isSelected, 
    onPress 
  }: { 
    type: 'family' | 'business';
    title: string;
    description: string;
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[
        styles.optionCard,
        isSelected && styles.optionCardSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.optionContent}>
        <View style={styles.radioContainer}>
          <View style={[
            styles.radioButton,
            isSelected && styles.radioButtonSelected,
          ]}>
            {isSelected && <View style={styles.radioButtonInner} />}
          </View>
        </View>
        
        <View style={styles.optionTextContainer}>
          <Text style={[
            styles.optionTitle,
            isSelected && styles.optionTitleSelected,
          ]}>
            {title}
          </Text>
          <Text style={styles.optionDescription}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose your account type</Text>
        </View>

        <View style={styles.optionsContainer}>
          <AccountOption
            type="family"
            title="Family Account"
            description="For you and your family's everyday need"
            isSelected={selectedType === 'family'}
            onPress={() => setSelectedType('family')}
          />

          <AccountOption
            type="business"
            title="Business Account"
            description="Perfect for your business, bulk orders, and teams"
            isSelected={selectedType === 'business'}
            onPress={() => setSelectedType('business')}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={isLoading ? 'Processing...' : 'Continue'}
            onPress={handleContinue}
            disabled={!selectedType || isLoading}
            style={styles.continueButton}
            variant="accent"
          />
        </View>
      </View>
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
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  titleContainer: {
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  optionsContainer: {
    flex: 1,
  },
  optionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: Spacing.lg,
  },
  optionCardSelected: {
    borderColor: Colors.accent,
    backgroundColor: 'rgba(205, 220, 57, 0.1)',
  },
  optionContent: {
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radioContainer: {
    marginRight: Spacing.md,
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.accent,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  optionTitleSelected: {
    color: Colors.accent,
  },
  optionDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingBottom: Spacing.xl,
  },
  continueButton: {
    backgroundColor: Colors.accent,
  },
});

export default AccountTypeScreen;
