import { APIGatewayProxyEvent } from 'aws-lambda'
import axios from 'axios'

const badRequest = {
  statusCode: 400,
  body: 'Invalid request',
}

export const handler = async (event: APIGatewayProxyEvent) => {
  if (!event.queryStringParameters) return badRequest

  const username = event.queryStringParameters.user

  if (!username) return badRequest

  const url = `https://atcoder.jp/users/${username}/history/json`

  return await axios
    .get(url)
    .then(({ data }) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
      }
    })
    .catch(err => {
      return {
        statusCode: 500,
        body: err,
      }
    })
}
