import styled, { css, DefaultTheme } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

type TypeProps = {
  type: 'up' | 'down' | 'total'
}

const IconModifiers = {
  up: (theme: DefaultTheme) => css`
    color: ${theme.colors.success};
  `,
  down: (theme: DefaultTheme) => css`
    color: ${theme.colors.attention};
  `,
  total: (theme: DefaultTheme) => css`
    color: ${theme.colors.shape};
  `
}

export const Container = styled.View<TypeProps>`
  ${({ theme, type }) => css`
    background-color: ${type === 'total' ? theme.colors.sencondary : theme.colors.shape};
    width: ${RFValue(300)}px;

    border-radius: 5px;

    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: 16px;
  `}
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled.Text<TypeProps>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${type === 'total' ? theme.colors.shape : theme.colors.text_dark};
  `}
`

export const Icon = styled(Feather)<TypeProps>`
  ${({ theme, type }) => css`
    font-size: ${RFValue(40)}px;

    ${type === 'up' && IconModifiers.up(theme)};
    ${type === 'down' && IconModifiers.down(theme)};
    ${type === 'total' && IconModifiers.total(theme)};
  `}
`

export const Footer = styled.View``

export const Amount = styled.Text<TypeProps>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.medium};
    font-size: ${RFValue(32)}px;

    color: ${type === 'total' ? theme.colors.shape : theme.colors.text_dark};

    margin-top: 38px;
  `}
`

export const LastTransaction = styled.Text<TypeProps>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(12)}px;

    color: ${type === 'total' ? theme.colors.shape : theme.colors.text};
  `}
`
