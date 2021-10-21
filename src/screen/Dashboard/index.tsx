import React, { useEffect, useState, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { useAuth } from '../../hooks/auth'

import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'

import { formatCurrency, formatDate } from '../../utils/formatted'

import * as S from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string
}

type HighlightProps = {
  amount: string
  lastTransaction: string
}

type HighlightData = {
  income: HighlightProps
  outcome: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>()
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  const theme = useTheme()
  const { signOut, user } = useAuth()

  function getLastTransactionDate(collections: DataListProps[], type: 'positive' | 'negative') {
    const collectionsFilter = collections.filter(collection => collection.type === type)

    if (collectionsFilter.length === 0) return 0

    const lastTransaction = new Date(
      Math.max(
        ...collectionsFilter.map(collectionFilter => new Date(collectionFilter.date).getTime())
      )
    )

    return `${lastTransaction.getDate()} de ${formatDate(String(lastTransaction), 'long')}`
  }

  async function loadTransaction() {
    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      if (item.type === 'positive') {
        entriesTotal += Number(item.amount)
      }

      if (item.type === 'negative') {
        expensiveTotal += Number(item.amount)
      }

      const amount = formatCurrency(Number(item.amount))
      const date = formatDate(item.date, 'digit')

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
    })

    setTransactions(transactionsFormatted)

    const lastTransactionIncome = getLastTransactionDate(transactions, 'positive')
    const lastTransactionOutcome = getLastTransactionDate(transactions, 'negative')
    const totalInterval =
      lastTransactionOutcome !== 0 ? `01 a ${lastTransactionOutcome}` : 'não há movimentação'

    setHighlightData({
      income: {
        amount: formatCurrency(entriesTotal),
        lastTransaction: lastTransactionIncome
          ? `Última entrada dia ${lastTransactionIncome}`
          : 'não há movimentação'
      },
      outcome: {
        amount: formatCurrency(expensiveTotal),
        lastTransaction: lastTransactionOutcome
          ? `Última saída dia ${lastTransactionOutcome}`
          : 'não há movimentação'
      },
      total: {
        amount: formatCurrency(entriesTotal - expensiveTotal),
        lastTransaction: totalInterval
      }
    })
    setIsLoading(false)
  }

  useEffect(() => {
    // AsyncStorage.removeItem('@gofinances:transactions')
    loadTransaction()
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadTransaction()
    }, [])
  )

  return (
    <S.Container>
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <>
          <S.Header>
            <S.UseWrapper>
              <S.UserInfo>
                <S.Photo
                  source={{
                    uri: user.photo
                  }}
                />
                <S.User>
                  <S.UserGreeting>Olá</S.UserGreeting>
                  <S.Username>{user.name}</S.Username>
                </S.User>
              </S.UserInfo>

              <S.LogoutButton onPress={signOut}>
                <S.Icon name="power" />
              </S.LogoutButton>
            </S.UseWrapper>
          </S.Header>

          <S.HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.income.amount}
              lastTransaction={highlightData.income.lastTransaction}
            />
            <HighlightCard
              type="down"
              title={'Saidas'}
              amount={highlightData.outcome.amount}
              lastTransaction={highlightData.outcome.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </S.HighlightCards>

          <S.Transactions>
            <S.Title>Listagem</S.Title>

            <S.TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  )
}
