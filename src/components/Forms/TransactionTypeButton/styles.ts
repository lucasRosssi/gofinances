import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons"
import { RFValue } from "react-native-responsive-fontsize";

interface TransactionButtonProps {
    isActive?: boolean,
    isInactive?: boolean,
    type?: 'up' | 'down'
}

export const Container = styled.TouchableOpacity<TransactionButtonProps>`
    width: 48%;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-width: ${({ isActive }) => isActive ? 0 : 1.5}px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text_light};
    border-radius: 5px;

    padding: 16px;

    ${({ isActive, type }) => isActive && type === 'up' && css`
        background-color: ${({ theme }) => theme.colors.success};
    `};

    ${({ isActive, type }) => isActive && type === 'down' && css`
        background-color: ${({ theme }) => theme.colors.attention};
    `};

    ${({ isInactive }) => isInactive && css`
        border-color: ${({ theme }) => theme.colors.background};
    `};
`;

export const Icon = styled(Feather)<TransactionButtonProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    ${({ type }) => type === 'up' 
        ? css`color: ${({ theme }) => theme.colors.success}` 
        : css`color: ${({ theme }) => theme.colors.attention}`
    };

    ${({ isActive }) => isActive && css`
        color: ${({ theme }) => theme.colors.shape};
    `};

    ${({ isInactive }) => isInactive && css`
        opacity: 0.3;
    `};
`

export const Title = styled.Text<TransactionButtonProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text_dark}

    ${({ isActive }) => isActive && css`
        color: ${({ theme }) => theme.colors.shape};
    `};

    ${({ isInactive }) => isInactive && css`
        opacity: 0.3;
    `};
`