import {cleanup, screen, fireEvent, act, waitFor, waitForElementToBeRemoved} from '@testing-library/react-native'
import { LoginScreen } from '../login'
import { renderWithNavigation } from './test-utils';

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    signIn: jest.fn().mockResolvedValue({ idToken: 'test-id-token' }),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signOut: jest.fn().mockResolvedValue(true),
    isSignedIn: jest.fn().mockResolvedValue(false),
    getCurrentUser: jest.fn().mockResolvedValue(null),
    getTokens: jest.fn().mockResolvedValue({ idToken: 'test-id-token', accessToken: 'test-access-token' }),
  },
}));


describe('LoginScreen', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render', () => {
    const tree = renderWithNavigation(LoginScreen).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render without form error', () => {
    renderWithNavigation(LoginScreen)
    
    const emailError = screen.queryByText('schema.email.required') || screen.queryByText('schema.email.invalid')
    const passwordError = screen.queryByText('schema.password.required') || screen.queryByText('schema.password.minLength')

    expect(emailError).toBeNull()
    expect(passwordError).toBeNull()
  })

  it('should display required form error', async () => {
    renderWithNavigation(LoginScreen)
    
    const submit = await screen.findByTestId('loading-button')
    act(() => {
      fireEvent.press(submit)
    })

    const emailError = await screen.findByText('schema.email.required')
    const passwordError = await screen.findByText('schema.password.required')
    expect(emailError).toBeDefined()
    expect(passwordError).toBeDefined()
  })

  it('should display validation form error', async () => {
    renderWithNavigation(LoginScreen)

    const emailInput = await screen.findByTestId('email-input')
    const passwordInput = await screen.findByTestId('password-input')
    const submit = await screen.findByTestId('loading-button')
    act(() => {
      fireEvent.changeText(emailInput, 'adad@')
      fireEvent.changeText(passwordInput, 'asdfghj')
      fireEvent.press(submit)
    })

    const emailError = await screen.findByText('schema.email.invalid')
    const passwordError = await screen.findByText('schema.password.minLength')
    expect(emailError).toBeDefined()
    expect(passwordError).toBeDefined()
  })

  it('should disappear form error', async () => {
    renderWithNavigation(LoginScreen)

    const emailInput = await screen.findByTestId('email-input')
    const passwordInput = await screen.findByTestId('password-input')
    const submit = await screen.findByTestId('loading-button')
    act(() => {
      fireEvent.press(submit)
    })

    act(() => {
      fireEvent.changeText(emailInput, 'adad@adad.com')
      fireEvent.changeText(passwordInput, 'asdfghj')
    })

    const emailError = await screen.queryByText('schema.email.invalid')
    const passwordError = await screen.queryByText('schema.password.minLength')
    expect(emailError).toBeNull()
    expect(passwordError).toBeNull()
  })

})
