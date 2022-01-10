import React from "react";

import { RectButtonProps } from "react-native-gesture-handler";

import { 
    Container,
    Button,
    Icon,
    Title 
} from "./styles";

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface Props extends RectButtonProps {
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
            type={type}
            isActive={isActive}
            isInactive={isInactive}
        >
            <Button {...rest}>
                <Icon 
                    name={icons[type]}
                    type={type}
                    isActive={isActive}
                    isInactive={isInactive}
                />
                <Title isActive={isActive} isInactive={isInactive}>
                    {title}
                </Title>
            </Button>
        </Container>
    )
}