import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { SignInSocialButton } from "../../components/SignInSocialButton";

import {
	Container,
	Header,
	TitleWrapper,
	Title,
	SignInTitle,
	Footer,
	ButtonWrapper
} from "./styles";

export function SignIn() {
	return (
		<Container>
			<Header>
				<TitleWrapper>
					<LogoSvg
						width={RFValue(120)}
						height={RFValue(68)}
					/>

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
					/>

					<SignInSocialButton
						title="Entrar com Apple"
						svg={AppleSvg}
					/>
				</ButtonWrapper>

			</Footer>

		</Container>
	)
}