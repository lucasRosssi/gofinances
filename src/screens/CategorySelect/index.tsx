import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Button } from "../../components/Forms/Button";

import { categories } from "../../utils/categories";

import { 
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer
} from "./styles";

interface Category {
    key: string,
    name: string
}

interface Props {
    category: Category,
    setCategory: (category: Category) => void,
    closeSelectCategory: () => void
}

export function CategorySelect({ 
    category,
    setCategory,
    closeSelectCategory
 }: Props) {
	const theme = useTheme()

    function handleCategorySelect(category: Category) {
        setCategory(category)
    }

    return (
    <Container>
        <Header>
            <Title>Categorias</Title>
        </Header>

        <FlatList 
            data={categories}
            style={{ flex: 1, width: '100%' }}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
                <Category
                    onPress={() => handleCategorySelect(item)}
										style={{ backgroundColor: category.key === item.key ? item.color : theme.colors.background }}
                >
                    <Icon name={item.icon} color={category.key === item.key ? theme.colors.shape : theme.colors.text_dark} />
                    <Name
											style={{
												color: category.key === item.key ? theme.colors.shape : theme.colors.text_dark
											}}
										>
											{item.name}
										</Name>
                </Category>
            )}
            ItemSeparatorComponent={() => <Separator />}
						showsVerticalScrollIndicator={false}
        />

        <Footer>
            <Button 
                title="Selecionar"
                onPress={closeSelectCategory}
            />
        </Footer>

    </Container>
    )
}