import React from "react";
import { TouchableOpacityProps } from "react-native";

import { 
    Container,
    Icon,
    Title 
} from "./styles";

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface Props extends TouchableOpacityProps {
    type: 'up' | 'down',
    title: string,
    isActive: boolean,
    isInactive: boolean
}

export function TransactionTypeButton({ 
    title, 
    type,
    isActive,
    isInactive, 
    ...rest 
}: Props) {

    return (
        <Container 
            {...rest} 
            type={type}
            isActive={isActive}
            isInactive={isInactive}
        >
            <Icon 
                name={icons[type]}
                type={type}
                isActive={isActive}
                isInactive={isInactive}
            />
            <Title isActive={isActive} isInactive={isInactive}>
                {title}
            </Title>
        </Container>
    )
}