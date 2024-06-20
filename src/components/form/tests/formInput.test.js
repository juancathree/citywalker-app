import { cleanup, render, screen, fireEvent } from '@testing-library/react-native'
import { FormInput } from 'src/components/form/formInput'

describe('FormInput', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render', () => {
    const tree = render(<FormInput name="email" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should not trigger as a password', () => {
    render(<FormInput name="email" />)
    const emailInput = screen.queryByTestId('email-input')
    expect(emailInput.props.secureTextEntry).toBe(false)
  })

  it('should trigger as a password field: password', () => {
    render(<FormInput name="password" />)
    const passwordInput = screen.queryByTestId('password-input')
    const seePassIcon = screen.queryByTestId('seePassIcon')
    expect(passwordInput.props.secureTextEntry).toBe(true)
    expect(seePassIcon).toBeTruthy()
  })

  it('should trigger as a password field: confirmPassword', () => {
    render(<FormInput name="confirmPassword" />)
    const confirmPassword = screen.queryByTestId('confirmPassword-input')
    const seePassIcon = screen.queryByTestId('seePassIcon')
    expect(confirmPassword.props.secureTextEntry).toBe(true)
    expect(seePassIcon).toBeTruthy()
  })

  it('call function onFocus', () => {
    const onFocus = jest.fn()
    render(<FormInput name="email" onFocus={onFocus} />)
    const emailInput = screen.queryByTestId('email-input')
    fireEvent(emailInput, 'focus')
    expect(onFocus).toHaveBeenCalled()
  })

  it('call function onBlur', () => {
    const onBlur = jest.fn()
    render(<FormInput name="email" onBlur={onBlur} />)
    const emailInput = screen.queryByTestId('email-input')
    fireEvent(emailInput, 'blur')
    expect(onBlur).toHaveBeenCalled()
  })

  it('should see password on click seePassIcon', () => {
    render(<FormInput name="password" />)
    const passwordInput = screen.queryByTestId('password-input')
    const seePassIcon = screen.queryByTestId('seePassIcon')
    fireEvent(seePassIcon, 'press')
    expect(passwordInput.props.secureTextEntry).toBe(false)
  })
})
