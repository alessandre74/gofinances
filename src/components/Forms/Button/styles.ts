import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.sencondary};

    padding: 18px;
    align-items: center;
    border-radius: 5px;
  `}
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
    font-size: ${RFValue(14)}px;

    color: ${theme.colors.shape};
  `}
`
