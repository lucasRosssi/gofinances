import React, { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/auth';

import Modal from 'react-native-modal';
import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import {
	Container,
	Header,
	Title,
	Form,
	Fields,
	TransactionsTypes,
} from './styles';

interface FormData {
	name: string;
	amount: string;
}

const schema = Yup.object().shape({
	name: Yup.string().required('Informe um nome'),
	amount: Yup.number()
		.typeError('Informe um valor')
		.positive('O valor deve ser positivo')
		.required('Informe um valor'),
});

export function Register() {
	const [transactionType, setTransactionType] = useState('');
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [category, setCategory] = useState({
		key: 'category',
		name: 'Categoria',
	});

	const { user } = useAuth();

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const navigation = useNavigation();

	function handleTransactionTypeSelect(type: 'positive' | 'negative') {
		setTransactionType(type);
	}

	function handleOpenSelectCategoryModal() {
		setCategoryModalOpen(true);
	}

	function handleCloseSelectCategoryModal() {
		setCategoryModalOpen(false);
	}

	async function handleRegister(form: FormData) {
		if (!transactionType) {
			return Alert.alert('Selecione o tipo da transação');
		}

		if (category.key === 'category') {
			return Alert.alert('Selecione a categoria');
		}

		const newTransaction = {
			id: String(uuid.v4()),
			name: form.name,
			amount: form.amount,
			type: transactionType,
			category: category.key,
			date: new Date(),
		};

		try {
			const dataKey = `@gofinances:transactions_user:${user.id}`;
			const data = await AsyncStorage.getItem(dataKey);
			const currentData = data ? JSON.parse(data) : [];

			const dataFormatted = [newTransaction, ...currentData];

			await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

			reset();
			setTransactionType('');
			setCategory({
				key: 'category',
				name: 'Categoria',
			});

			navigation.navigate('Listagem');
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível salvar');
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<Header>
					<Title>Cadastro</Title>
				</Header>

				<Form>
					<Fields>
						<InputForm
							name="name"
							control={control}
							placeholder="Nome"
							autoCapitalize="sentences"
							autoCorrect={false}
							error={errors.name && errors.name.message}
						/>
						<InputForm
							name="amount"
							control={control}
							placeholder="Preço"
							keyboardType="numeric"
							error={errors.amount && errors.amount.message}
						/>

						<TransactionsTypes>
							<TransactionTypeButton
								type="positive"
								title="Entrada"
								onPress={() => handleTransactionTypeSelect('positive')}
								isActive={transactionType === 'positive'}
								isInactive={transactionType === 'negative'}
							/>
							<TransactionTypeButton
								type="negative"
								title="Saída"
								onPress={() => handleTransactionTypeSelect('negative')}
								isActive={transactionType === 'negative'}
								isInactive={transactionType === 'positive'}
							/>
						</TransactionsTypes>

						<CategorySelectButton
							testID="button-category"
							title={category.name}
							onPress={handleOpenSelectCategoryModal}
						/>
					</Fields>

					<Button title="Enviar" onPress={handleSubmit(handleRegister)} />
				</Form>

				<Modal
					testID="modal-category"
					isVisible={categoryModalOpen}
					onBackButtonPress={handleCloseSelectCategoryModal}
					onBackdropPress={handleCloseSelectCategoryModal}
					style={{
						margin: 0,
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<CategorySelect
						category={category}
						setCategory={setCategory}
						closeSelectCategory={handleCloseSelectCategoryModal}
					/>
				</Modal>
			</Container>
		</TouchableWithoutFeedback>
	);
}
