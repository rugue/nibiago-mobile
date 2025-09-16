import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { Spacing } from '../../../constants/Layout';

interface BalanceCardProps {
  balance: number;
  isLoading?: boolean;
  onAddMoneyPress?: () => void;
  onViewHistoryPress?: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  isLoading = false,
  onAddMoneyPress,
  onViewHistoryPress,
}) => {
  const formatBalance = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddMoney = () => {
    if (onAddMoneyPress) {
      onAddMoneyPress();
    } else {
      // Navigate to wallet/top-up screen
      console.log('Navigate to add money screen');
    }
  };

  const handleViewHistory = () => {
    if (onViewHistoryPress) {
      onViewHistoryPress();
    } else {
      // Navigate to order history screen
      console.log('Navigate to order history screen');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <Text style={styles.labelText}>Available Balance</Text>
        <TouchableOpacity onPress={handleViewHistory}>
          <View style={styles.historyLink}>
            <Text style={styles.historyText}>View Order History</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.text.secondary} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Balance Row */}
      <View style={styles.balanceRow}>
        <View style={styles.balanceContainer}>
          {isLoading ? (
            <View style={styles.balanceLoading}>
              <View style={styles.loadingSkeleton} />
            </View>
          ) : (
            <Text style={styles.balanceText}>{formatBalance(balance)}</Text>
          )}
          <Ionicons name="eye-outline" size={20} color={Colors.text.secondary} style={styles.eyeIcon} />
        </View>

        <TouchableOpacity
          style={styles.addMoneyButton}
          onPress={handleAddMoney}
          activeOpacity={0.8}
        >
          <Ionicons name="wallet" size={16} color={Colors.buttonAccentText} style={styles.walletIcon} />
          <Text style={styles.addMoneyText}>Add Food money</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: 16,
    padding: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  labelText: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontFamily: 'Inter-Regular',
  },
  historyLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyText: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontFamily: 'Inter-Regular',
    marginRight: 4,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text.primary,
    fontFamily: 'Inter-Bold',
  },
  balanceLoading: {
    width: 120,
    height: 32,
  },
  loadingSkeleton: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.gray[200],
    borderRadius: 4,
  },
  eyeIcon: {
    marginLeft: Spacing.sm,
  },
  addMoneyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.buttonAccent,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  walletIcon: {
    marginRight: 6,
  },
  addMoneyText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.buttonAccentText,
    fontFamily: 'Inter-SemiBold',
  },
});

export default BalanceCard;
