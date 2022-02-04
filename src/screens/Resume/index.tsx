import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
import { categories } from "../../utils/categories";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useAuth } from "../../hooks/auth";
import { useTheme } from "styled-components";

import { VictoryPie } from "victory-native";
import { HistoryCard } from "../../components/HistoryCard";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ActivityIndicator } from "react-native";

import {
	Container,
	Header,
	Title,
	Content,
	ChartContainer,
	MonthSelect,
	Button,
	SelectIcon,
	Month,
	LoadingContainer
} from "./styles";

interface TransactionData {
	type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

interface CategoryData {
	key: string,
	name: string,
	total: number,
	totalFormatted: string,
	color: string,
	percent: string
}

export function Resume() {
	const theme = useTheme()
	const { user } = useAuth()

	const [isLoading, setIsLoading] = useState(true)
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

	function handleChangeDate(action: 'next' | 'previous') {
		if (action === 'next') {
			setSelectedDate(addMonths(selectedDate, 1))

		} else {
			setSelectedDate(subMonths(selectedDate, 1))
		}
	}

	async function loadData() {
		setIsLoading(true)
		
		const dataKey = `@gofinances:transactions_user:${user.id}`
		const response = await AsyncStorage.getItem(dataKey)
		const responseFormatted = response ? JSON.parse(response) : []

		const expenses = responseFormatted
			.filter((expense: TransactionData) => expense.type === 'negative' &&
			new Date(expense.date).getMonth() === selectedDate.getMonth() &&
			new Date(expense.date).getFullYear() === selectedDate.getFullYear()
		)

		const totalExpenses = expenses.reduce((acumullator: number, expense: TransactionData) => {
			return acumullator + Number(expense.amount)
		}, 0)

		

		const totalByCategory: CategoryData[] = []

		categories.forEach(category => {
			let categorySum = 0

			expenses.forEach((expense: TransactionData) => {
				if (expense.category === category.key) {
					categorySum += Number(expense.amount)
				}
			})

			if (categorySum > 0) {
				const totalFormatted = categorySum.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				})

				const percent = `${(categorySum / totalExpenses * 100).toFixed(0)}%`

				totalByCategory.push({
					key: category.key,
					name: category.name,
					color: category.color,
					total: categorySum,
					totalFormatted,
					percent
				})
			}

		})
		setTotalByCategories(totalByCategory)
		setIsLoading(false)
	}

	useFocusEffect(
    useCallback(() => {
      loadData()
    }, [selectedDate])
  )

	return (
		<Container>
			<Header>
				<Title>Resumo por categoria</Title>
			</Header>

			<Content
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: useBottomTabBarHeight(),
					paddingHorizontal: 24
				}}
			>
				<MonthSelect>
					<Button onPress={() => handleChangeDate('previous')}>
						<SelectIcon name="chevron-left" />
					</Button>

					<Month>{ format(selectedDate, 'MMMM, yyyy', {locale: ptBR}) }</Month>

					<Button onPress={() => handleChangeDate('next')}>
						<SelectIcon name="chevron-right" />
					</Button>
				</MonthSelect>


				{
					isLoading ?
						<LoadingContainer>
          		<ActivityIndicator
								color={theme.colors.primary}
								size={100}
								style={{ marginTop: 150 }}
          		/>
        		</LoadingContainer>
					:
					<>
						<ChartContainer>
							<VictoryPie 
								data={totalByCategories}
								colorScale={totalByCategories.map(category => category.color)}
								style={{
									labels: {
										fontSize: RFValue(17),
										fontWeight: 'bold',
									}
								}}
								labelRadius={130}
								x="percent"
								y="total"
								width={RFValue(330)}
							/>
						</ChartContainer>

						{
							totalByCategories.map(item => (
								<HistoryCard 
									key={item.key}
									title={item.name}
									amount={item.totalFormatted}
									color={item.color}
								/>
							))
						}
					</>
				}
			</Content>
		</Container>
	)
}