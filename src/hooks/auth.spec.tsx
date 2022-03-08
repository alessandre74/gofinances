import { renderHook, act } from '@testing-library/react-hooks'
import { AuthProvider, useAuth } from './auth'
import { startAsync } from 'expo-auth-session'
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn()
}))

jest.mock('expo-auth-session')

describe('Auth Hook', () => {
  it('must be able to login with existing google account ', async () => {
    const userTest = {
      id: 'any_id',
      email: 'john.doe@email.com',
      name: 'John Doe',
      photo: 'any_photo.png'
    }

    const googleMocked = jest.mocked(startAsync)
    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: { access_token: 'any_token' }
    } as any)

    fetchMock.mockResponseOnce(JSON.stringify(userTest))

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(() => result.current.signInWithGoogle())

    expect(result.current.user.email).toBe(userTest.email)
  })
  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = jest.mocked(startAsync)
    googleMocked.mockReturnValueOnce({
      type: 'cancel'
    } as any)

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(() => result.current.signInWithGoogle())

    expect(result.current.user).not.toHaveProperty('id')
  })
})
