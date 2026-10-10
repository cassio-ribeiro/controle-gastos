export enum TransactionType {
  In = 'Entrou',
  Out = 'Saiu',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
}

type OnSuccessCallback = (amount: number) => void;
type OnErrorCallback = (errorMessage: string) => void;

export function validateAmount(
  text: string,
  onSuccess: OnSuccessCallback,
  onError: OnErrorCallback
): void {
  if (text.trim() === '') {
    onError('Digite um valor antes de clicar em Entrou ou Saiu.');
    return;
  }

  const amount = Number(text.replace(',', '.'));

  if (!Number.isFinite(amount)) {
    onError('Valor inválido. Digite apenas números, por exemplo: 10 ou 5,50.');
    return;
  }

  const roundedAmount = Number(amount.toFixed(2));

  if (roundedAmount <= 0) {
    onError('O valor precisa ser maior que zero (mínimo R$ 0,01).');
    return;
  }

  onSuccess(roundedAmount);
}

export function calculateNewTotal(
  currentTotal: number,
  type: TransactionType,
  amount: number
): number {
  let newTotal = 0;

  if (type === TransactionType.In) {
    newTotal = currentTotal + amount;
  } else {
    newTotal = currentTotal - amount;
  }

  return Number(newTotal.toFixed(2));
}

export function createTransaction(type: TransactionType, amount: number): Transaction {
  return {
    id: Date.now().toString(),
    type: type,
    amount: amount,
  };
}

export function formatCurrency(value: number): string {
  const sign = value < 0 ? '- ' : '';
  const absoluteValue = Math.abs(value).toFixed(2).replace('.', ',');
  return `${sign}R$ ${absoluteValue}`;
}
