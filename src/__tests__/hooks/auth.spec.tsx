import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import fetchMock from 'jest-fetch-mock';
import { useAuth, AuthProvider } from '../../hooks/auth';
import { startAsync } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

fetchMock.enableMocks();

jest.mock('expo-auth-session');

describe('## Auth Hook ##', () => {
	beforeEach(async () => {
		const userCollectionKey = '@gofinances:user';
		await AsyncStorage.removeItem(userCollectionKey);
	});

	it('should not be able to sign in if they cancel authentication with Google', async () => {
		const googleMocked = mocked(startAsync as any);
		googleMocked.mockReturnValueOnce({
			type: 'cancel',
		});

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

		await act(() => result.current.signInWithGoogle());

		expect(result.current.user).not.toHaveProperty('id');
	});

	it('should be able to sign in with google account', async () => {
		const userTest = {
			id: 'any_id',
			email: 'lucas.rossi@email.com',
			name: 'Lucas Rossi',
			photo: 'any_photo.png',
		};

		fetchMock.mockResponseOnce(JSON.stringify(userTest));

		const googleMocked = mocked(startAsync as any);
		googleMocked.mockReturnValueOnce({
			type: 'success',
			params: {
				access_token: 'any_token',
			},
		});

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

		await act(() => result.current.signInWithGoogle());

		expect(result.current.user.email).toBe(userTest.email);
	});
});
