import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('PROFILE SCREEN', () => {
	it('should show user name input placeholder correctly', () => {
		const { getByPlaceholderText } = render(<Profile />);

		const inputName = getByPlaceholderText('Nome');

		expect(inputName).toBeTruthy();
	});

	it('should load user data', () => {
		const { getByTestId } = render(<Profile />);

		const inputName = getByTestId('input-name');
		const inputSurname = getByTestId('input-surname');

		expect(inputName.props.value).toEqual('Lucas');
		expect(inputSurname.props.value).toEqual('Rossi');
	});

	it('should render title correctly', () => {
		const { getByTestId } = render(<Profile />);

		const textTitle = getByTestId('text-title');

		expect(textTitle.props.children).toBe('Perfil');
	});
});
