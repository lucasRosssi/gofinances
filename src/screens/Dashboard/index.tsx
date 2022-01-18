import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { HighlightCard } from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard'

import {
  Container,
  LoadingContainer,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles'
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighlightProps {
  amount: string,
	lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps
  expenses: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)
		
	const theme = useTheme()

	function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
		const lastTransaction = new Date(Math.max.apply(
      Math, collection
        .filter((transaction: DataListProps) => transaction.type === type)
        .map((transaction: DataListProps) => new Date(transaction.date).getTime())))

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
			month: 'long'
		})}`
	}

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entries = 0
    let expenses = 0

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === 'positive') {
          entries += Number(item.amount)
        } else {
          expenses += Number(item.amount)
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date))

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        }})

    setTransactions(transactionsFormatted)

		const lastEntriesTransaction = getLastTransactionDate(transactions, 'positive')
		const lastExpensesTransaction = getLastTransactionDate(transactions, 'negative')
		const totalInterval = `01 a ${lastExpensesTransaction > lastEntriesTransaction ? lastExpensesTransaction : lastEntriesTransaction}`

    let total = entries - expenses

    setHighlightData({
      entries: {
        amount: entries.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
				lastTransaction: `Última entrada dia ${lastEntriesTransaction}`
      },
      expenses: {
        amount: expenses.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
				lastTransaction: `Última saída dia ${lastExpensesTransaction}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
				lastTransaction: totalInterval
      },
    })

    setIsLoading(false)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, [])
  )

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/lucasRosssi.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Lucas</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator
            color={theme.colors.secondary}
            size="large"
            style={{ marginTop: 60 }}
          />
        </LoadingContainer>
      ) : (
        <HighlightCards>
          <HighlightCard
            title="Entradas"
            amount={highlightData.entries.amount}
            lastTransaction={highlightData.entries.lastTransaction}
            type="up"
          />
          <HighlightCard
            title="Saídas"
            amount={highlightData.expenses.amount}
            lastTransaction={highlightData.expenses.lastTransaction}
            type="down"
          />
          <HighlightCard
            title="Total"
            amount={highlightData.total.amount}
            lastTransaction={highlightData.total.lastTransaction}
            type="total"
          />
        </HighlightCards>
      )}

      <Transactions>
        <Title>Listagem</Title>
        {isLoading ? (
          <LoadingContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </LoadingContainer>
        ) : (
          <TransactionList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionCard data={item} />}
          />
        )}
      </Transactions>
    </Container>
  )
}
