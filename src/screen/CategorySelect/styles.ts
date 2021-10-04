import styled, { css } from 'styled-components/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { Button as ButtonForms } from '../../components/Forms/Button'

// Faz presertvar o estado do botão no android só trocar bo Container=styled(GestureHandlerRootView)
// import {GestureHandlerRootView} from 'react-native-gesture-handler'

type CategoryProps = {
  isActive: Boolean
}

export const Container = styled(GestureHandlerRootView)`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background};
  `}
`
export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: ${RFValue(113)}px;

    background-color: ${theme.colors.primary};

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
  `}
`
export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(18)}px;
    font-family: ${theme.fonts.medium};
    color: ${theme.colors.shape};
  `}
`

export const Category = styled.TouchableOpacity<CategoryProps>`
  ${({ theme, isActive }) => css`
    width: 100%;
    padding: ${RFValue(15)}px;

    flex-direction: row;
    align-items: center;

    background-color: ${isActive
      ? theme.colors.sencndary_light
      : theme.colors.background};
  `}
`
export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`

export const Name = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(14)}px;
  `}
`

export const Separetor = styled.View`
  ${({ theme }) => css`
    height: 1px;
    width: 100%;
    background-color: ${theme.colors.text};
  `}
`

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`
export const Button = styled(ButtonForms)``
