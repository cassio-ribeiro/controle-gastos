# Controle de Gastos — CheckPoint 2

App em **React Native + TypeScript (Expo)** para gestão de gastos.
Disciplina: Mobile Application Development — FIAP — Prof. Pietro Rischi Nunes.

## Funcionalidades

- Campo para digitar um valor (aceita `10`, `5.50` ou `5,50`)
- Botão **Entrou**: soma o valor ao saldo
- Botão **Saiu**: subtrai o valor do saldo
- **Total** sempre visível (verde se positivo, vermelho se negativo)
- **Histórico** de todas as transações
- Botão **X** em cada item para removê-lo do histórico **sem alterar o saldo total**

## Tratamento de erros

| Entrada | Resultado |
|---|---|
| Campo vazio ou só espaços | Alerta: "Digite um valor..." |
| Letras ou texto inválido (`abc`, `12a`, `5,5,5`) | Alerta: "Valor inválido..." |
| Zero, negativo ou menor que R$ 0,01 | Alerta: "O valor precisa ser maior que zero..." |
| Valor válido | Registra, limpa o campo e mostra mensagem de sucesso |

## Estrutura (separação entre lógica e UI)

```
src/
├── app/
│   └── index.tsx          → TELA: estados (useState), useEffect e layout
├── components/
│   └── HistoryItem.tsx    → UI: um item do histórico com o botão "X"
└── utils/
    └── finance.ts         → LÓGICA: validação, cálculo do saldo, formatação
```

`finance.ts` não importa nada de `react-native`: só faz contas e validações.
A tela chama essas funções e decide o que mostrar.

## Como rodar

```bash
npm install
npx expo start
```

Depois pressione `a` (emulador Android), `w` (navegador) ou leia o QR Code com o **Expo Go**.
