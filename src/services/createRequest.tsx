import i18next from 'i18next'

// @ts-ignore: Suppress ts(2339) error for this line
const API_URL = process.env.EXPO_PUBLIC_API_URL

export const CreateRequest = async (
  url: string,
  method: string,
  data: any
): Promise<any | null> => {
  let response: any = ''
  try {
    response = await fetch(`${API_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  } catch {
    throw new Error(i18next.t(`services.networkError`))
  }

  const json = await response.json()

  if (json['error']) {
    throw new Error(i18next.t(`services.${url}-error`))
  }

  return json['data']
}
