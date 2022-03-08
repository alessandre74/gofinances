import { renderHook, act } from '@testing-library/react-hooks'
import fetchMock from 'jest-fetch-mock'
import { AuthProvider, useAuth } from './auth'

fetchMock.enableMocks()

const userTest = {
  id: 'any_id',
  email: 'john.doe@email.com',
  name: 'John Doe',
  photo: 'any_photo.png'
}

jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => {
      return {
        type: 'success',
        params: { access_token: 'any_token' }
      }
    }
  }
})

describe('Auth Hook', () => {
  it('must be able to login with existing google account ', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest))

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(() => result.current.signInWithGoogle())

    expect(result.current.user.email).toBe('john.doe@email.com')
  })
})
