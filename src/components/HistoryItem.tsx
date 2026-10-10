import { View, Text, Button, StyleSheet } from 'react-native';
import { Transaction, TransactionType, formatCurrency } from '@/utils/finance';

interface HistoryItemProps {
  transaction: Transaction;
  onDelete: () => void;
}

export function HistoryItem({ transaction, onDelete }: HistoryItemProps) {
  const isIn = transaction.type === TransactionType.In;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, isIn ? styles.textIn : styles.textOut]}>
        {transaction.type}: {formatCurrency(transaction.amount)}
      </Text>

      <Button title="X" color="#c0392b" onPress={onDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    fontSize: 18,
  },
  textIn: {
    color: '#27ae60',
  },
  textOut: {
    color: '#c0392b',
  },
});
