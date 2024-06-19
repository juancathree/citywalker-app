export type Translation = {
  translation: {
    screens: {
      login: {
        description: string
        loginButton: string
        forgotPassword: string
        notAccount: string
        register: string
      }
      forgotPassword: {
        title: string
        description: string
        button: string
      }
      register: {
        title: string
        description: string
        button: string
      }
      confirmCode: {
        wrongOTPCode: string
        errorFetchingCode: string
        title: string
        description: string
      }
    }
    components: {
      divider: {
        or: string
      }
      formInput: {
        email: string
        password: string
        fullName: string
        confirmPassword: string
      }
      forgotPassword: {
        title: string
        subtitle: string
        button: string
      }
    }
    schema: {
      email: {
        required: string
        invalid: string
      }
      password: {
        required: string
        min: string
        bothMustMatch: string
      }
      fullName: {
        required: string
      }
    }
    services: {
      networkError: string
      '/user/googleLogin-error': string
      '/user/googleCreate-error': string
      '/user/create-error': string
      '/user/login-error': string
      '/user/forgotPassword-error': string
    }
    toast: {
      useAuth: {
        accountCreated: string
        accountNotCreated: string
        loginFailed: string
        continueWithGoogleFailed: string
        passwordReseted: string
        resetPasswordFailed: string
      }
    }
  }
}
