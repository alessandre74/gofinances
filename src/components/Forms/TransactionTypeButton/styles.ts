import styled, { css, DefaultTheme } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'

type IconsProps = {
  type: 'up' | 'down'
}

type ContainerProps = {
  isActive: Boolean
} & IconsProps

const ContainerModifiers = {
  up: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.succes_light};
  `,
  down: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.attetion_light};
  `
}

export const Container = styled.View<ContainerProps>`
  ${({ theme, isActive, type }) => css`
    width: 48%;

    border: 1.5px solid ${isActive ? 'transparent' : theme.colors.text};
    border-radius: 5px;

    ${isActive && type === 'up' && ContainerModifiers.up(theme)}

    ${isActive && type === 'down' && ContainerModifiers.down(theme)}
  `}
`
export const Button = styled(RectButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

export const Icon = styled(Feather)<IconsProps>`
  ${({ theme, type }) => css`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    color: ${type === 'up' ? theme.colors.success : theme.colors.attention};
  `}
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(14)}px;
  `}
`
