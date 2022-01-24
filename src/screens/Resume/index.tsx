import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { categories } from "../../utils/categories";

import { VictoryPie } from "victory-native";
import { HistoryCard } from "../../components/HistoryCard";

import {
	Container,
	Header,
	Title,
	Content,
	ChartContainer
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

	const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

	async function loadData() {
		const dataKey = '@gofinances:transactions'
		const response = await AsyncStorage.getItem(dataKey)
		const responseFormatted = response ? JSON.parse(response) : []

		const expenses = responseFormatted.filter((expense: TransactionData) => expense.type === 'negative')

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
	}

	useEffect(() => {
		loadData()
	}, [totalByCategories])

	return (
		<Container>
			<Header>
				<Title>Resumo por categoria</Title>
			</Header>

			<Content>
				<ChartContainer>
					<VictoryPie 
						data={totalByCategories}
						colorScale={totalByCategories.map(category => category.color)}
						style={{
							labels: {
								fontSize: RFValue(18),
								fontWeight: 'bold',
							}
						}}
						labelRadius={0}
						x="percent"
						y="total"
						width={RFValue(330)}
					/>

				</ChartContainer>

				{totalByCategories.map(item => (
					<HistoryCard 
					key={item.key}
					title={item.name}
					amount={item.totalFormatted}
					color={item.color}
				/>
				))}
			</Content>
		</Container>
	)
}