import React from 'react'
import * as S from './styles'

type Props = {
  title: string
  amount: string
  color: string
}

export function Historycard({ title, amount, color }: Props) {
  return (
    <S.Container color={color}>
      <S.Title>{title}</S.Title>
      <S.Amount>{amount}</S.Amount>
    </S.Container>
  )
}
