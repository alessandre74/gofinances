import React from 'react'
import { render } from '@testing-library/react-native'

import { Register } from '.'

describe('Register Screen', () => {
  it('should be open category modal when user click on the category button', () => {
    const {} = render(<Register />)
  })
})
