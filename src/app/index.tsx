import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HistoryItem } from '@/components/HistoryItem';
import {
  Transaction,
  TransactionType,
  validateAmount,
  calculateNewTotal,
  createTransaction,
  formatCurrency,
} from '@/utils/finance';

export default function Index() {
  const [text, setText] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [history, setHistory] = useState<Transaction[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    console.log('Histórico atualizado:', history);
  }, [history]);

  const handleTransaction = (type: TransactionType) => {
    validateAmount(
      text,
      (amount) => {
        setTotal((prevTotal) => calculateNewTotal(prevTotal, type, amount));
        setHistory((prevHistory) => [...prevHistory, createTransaction(type, amount)]);
        setText('');
        setIsError(false);
        setMessage(`${type}: ${formatCurrency(amount)} registrado com sucesso!`);
      },
      (errorMessage) => {
        Alert.alert('Erro', errorMessage);
        setIsError(true);
        setMessage(errorMessage);
      }
    );
  };

  const handleDelete = (idToDelete: string) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== idToDelete));
    setIsError(false);
    setMessage('Item removido do histórico. O saldo total não foi alterado.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor"
        value={text}
        onChangeText={setText}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleTransaction(TransactionType.In)}
      >
        <Text style={styles.buttonText}>Entrou</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleTransaction(TransactionType.Out)}
      >
        <Text style={styles.buttonText}>Saiu</Text>
      </TouchableOpacity>

      {message !== '' && (
        <Text style={isError ? styles.messageError : styles.messageSuccess}>{message}</Text>
      )}

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={[styles.totalValue, total < 0 ? styles.negative : styles.positive]}>
          {formatCurrency(total)}
        </Text>
      </View>

      <Text style={styles.historyTitle}>Histórico</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryItem transaction={item} onDelete={() => handleDelete(item.id)} />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma transação registrada.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 12,
    padding: 14,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 20,
  },
  messageSuccess: {
    color: '#27ae60',
    textAlign: 'center',
    marginBottom: 8,
  },
  messageError: {
    color: '#c0392b',
    textAlign: 'center',
    marginBottom: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  positive: {
    color: '#27ae60',
  },
  negative: {
    color: '#c0392b',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
  },
});
