import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons'

export const Container = styled(GestureHandlerRootView)`
    width: 90%;
		height: 70%;
    background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(70)}px;

    background-color: ${({ theme }) => theme.colors.primary};

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.shape};
`

export const Category = styled.TouchableOpacity`
    width: 100%;
    padding: ${RFValue(10)}px ${RFValue(15)}px;

    flex-direction: row;
    align-items: center;
`

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
`

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`

export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.text};
`

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`
