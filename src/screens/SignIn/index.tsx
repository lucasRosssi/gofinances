import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuth } from '../../hooks/auth';

import { ActivityIndicator, Alert, Platform } from 'react-native';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import {
	Container,
	Header,
	TitleWrapper,
	Title,
	SignInTitle,
	Footer,
	ButtonWrapper,
} from './styles';
import { useTheme } from 'styled-components';

export function SignIn() {
	const [isLoading, setIsLoading] = useState(false);

	const { signInWithGoogle, signInWithApple } = useAuth();
	const theme = useTheme();

	async function handleSignInWithGoogle() {
		try {
			setIsLoading(true);
			await signInWithGoogle();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar a conta Google');
			setIsLoading(false);
		}
	}

	async function handleSignInWithApple() {
		try {
			setIsLoading(true);
			await signInWithApple();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar a conta Apple');
			setIsLoading(false);
		}
	}

	return (
		<Container>
			<Header>
				<TitleWrapper>
					<LogoSvg width={RFValue(120)} height={RFValue(68)} />

					<Title>
						Controle suas{'\n'}
						finanças de forma{'\n'}
						muito simples
					</Title>

					<SignInTitle>
						Faça seu login com{'\n'}
						uma das contas abaixo
					</SignInTitle>
				</TitleWrapper>
			</Header>

			<Footer>
				<ButtonWrapper>
					<SignInSocialButton
						title="Entrar com Google"
						svg={GoogleSvg}
						onPress={handleSignInWithGoogle}
						enabled={!isLoading}
					/>

					{Platform.OS === 'ios' && (
						<SignInSocialButton
							title="Entrar com Apple"
							svg={AppleSvg}
							onPress={handleSignInWithApple}
							enabled={!isLoading}
						/>
					)}
					{isLoading && (
						<ActivityIndicator
							color={theme.colors.shape}
							size="large"
							style={{ margin: 18 }}
						/>
					)}
				</ButtonWrapper>
			</Footer>
		</Container>
	);
}
