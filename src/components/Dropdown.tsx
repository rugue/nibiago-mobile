import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Spacing } from '../constants/Layout';
import { LocationOption } from '../types/auth';

interface DropdownProps {
  label?: string;
  placeholder?: string;
  value?: string;
  options: LocationOption[];
  onSelect: (option: LocationOption) => void;
  error?: string;
  containerStyle?: any;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder = 'Select an option',
  value,
  options,
  onSelect,
  error,
  containerStyle,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption?.label || placeholder;

  const handleSelect = (option: LocationOption) => {
    onSelect(option);
    setIsVisible(false);
  };

  const renderOption = ({ item }: { item: LocationOption }) => (
    <TouchableOpacity
      style={[
        styles.optionItem,
        item.value === value && styles.selectedOption,
      ]}
      onPress={() => handleSelect(item)}
    >
      <Text
        style={[
          styles.optionText,
          item.value === value && styles.selectedOptionText,
        ]}
      >
        {item.label}
      </Text>
      {item.value === value && (
        <Ionicons
          name="checkmark"
          size={20}
          color={Colors.primary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      
      <TouchableOpacity
        style={[
          styles.dropdown,
          error && styles.dropdownError,
          disabled && styles.dropdownDisabled,
        ]}
        onPress={() => !disabled && setIsVisible(true)}
        disabled={disabled}
      >
        <Text
          style={[
            styles.dropdownText,
            !selectedOption && styles.placeholderText,
            disabled && styles.disabledText,
          ]}
          numberOfLines={1}
        >
          {displayText}
        </Text>
        <Ionicons
          name={isVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={disabled ? Colors.text.muted : Colors.text.secondary}
        />
      </TouchableOpacity>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {label || 'Select Option'}
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsVisible(false)}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={Colors.text.primary}
                  />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={options}
                renderItem={renderOption}
                keyExtractor={(item) => item.value}
                style={styles.optionsList}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    height: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  dropdownError: {
    borderColor: Colors.status.error,
    backgroundColor: '#FFF5F5',
  },
  dropdownDisabled: {
    backgroundColor: Colors.gray[100],
    opacity: 0.6,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  placeholderText: {
    color: Colors.text.secondary,
  },
  disabledText: {
    color: Colors.text.muted,
  },
  errorText: {
    fontSize: 12,
    color: Colors.status.error,
    marginTop: Spacing.xs,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border.light,
  },
  selectedOption: {
    backgroundColor: Colors.background.secondary,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  selectedOptionText: {
    color: Colors.primary,
    fontWeight: '500',
  },
});

export default Dropdown;
