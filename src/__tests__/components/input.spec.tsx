import React from 'react';
import { render } from '@testing-library/react-native';

import { Input } from '../../components/Forms/Input';

describe('Component Input', () => {
	it('should have specific border color when focused', () => {
		const { getByTestId } = render(
			<Input
				testID="input-email"
				placeholder="E-mail"
				keyboardType="email-address"
				autoCorrect={false}
				active={true}
			/>
		);

		const inputComponent = getByTestId('input-email');

		expect(inputComponent.props.style[0].borderColor).toEqual('#E83F5B');
	});
});
