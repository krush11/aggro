import { cookies } from 'next/headers'

export async function GET(request) {
  const authToken = cookies().get('auth-token')?.value
  const headers = new Headers();
  headers.append("Authorization", authToken);

  const resData = {
    token: cookies().get('accessToken')?.value
  }

  return new Response(JSON.stringify(resData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}