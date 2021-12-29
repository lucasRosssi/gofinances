import React, { useState } from "react";

import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from "./styles";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";

export function Register() {
    const [transactionType, setTransactionType] = useState('')

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type)
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input 
                        placeholder="Nome"
                    />
                    <Input 
                        placeholder="Preço"
                    />

                    <TransactionsTypes>
                        <TransactionTypeButton 
                            type="up"
                            title="Entrada"
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={transactionType === 'up'}
                            isInactive={transactionType === 'down'}
                        />
                        <TransactionTypeButton 
                            type="down"
                            title="Saída"
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={transactionType === 'down'}
                            isInactive={transactionType === 'up'}
                        />
                    </TransactionsTypes>
                </Fields>

                <Button title="Enviar" />
            </Form>

        </Container>
    )
}