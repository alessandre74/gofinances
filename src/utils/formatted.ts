import { Platform } from 'react-native'

function formatDate(date: string | number, type: 'digit' | 'long') {
  const newDate =
    type === 'digit'
      ? new Date(date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })
      : new Date(date).toLocaleDateString('pt-BR', {
          month: 'long'
        })

  return newDate
}

function formatCurrency(price: number) {
  let priceFormated = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  if (Platform.OS === 'android') priceFormated = priceFormated.replace('R$', 'R$ ')

  return priceFormated
}

export { formatDate, formatCurrency }
