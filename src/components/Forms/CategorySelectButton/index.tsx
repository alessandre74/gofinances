import React from 'react'
import * as S from './styles'

type Props = {
  title: string
  onPress: () => void
}

export function CategorySelectButton({ title, onPress, ...rest }: Props) {
  return (
    <S.Container onPress={onPress} {...rest}>
      <S.Category>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  )
}
