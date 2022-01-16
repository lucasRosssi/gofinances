import React from 'react'

import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, Button, Icon, Title } from './styles'

const icons = {
  positive: 'arrow-up-circle',
  negative: 'arrow-down-circle',
}

interface Props extends RectButtonProps {
  type: 'positive' | 'negative'
  title: string
  isActive: boolean
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
    <Container type={type} isActive={isActive} isInactive={isInactive}>
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
