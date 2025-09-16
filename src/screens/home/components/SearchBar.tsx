import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { Spacing } from '../../../constants/Layout';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  placeholder?: string;
  editable?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value = '',
  onChangeText,
  onPress,
  placeholder = 'Search',
  editable = true,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigate to search screen
      console.log('Navigate to search screen');
    }
  };

  const content = (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={Colors.text.secondary} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholderColor}
        editable={editable}
        pointerEvents={editable ? 'auto' : 'none'}
      />
    </View>
  );

  if (!editable || onPress) {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 25,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    fontFamily: 'Inter-Regular',
  },
});

export default SearchBar;
