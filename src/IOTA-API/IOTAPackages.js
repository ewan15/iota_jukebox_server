import { composeAPI } from '@iota/core'
import { createHttpClient } from '@iota/http-client'
//import { createGetNodeInfo } from '@iota/core'



export const iota = composeAPI({
    provider: 'https://turnip.iotasalad.org:14265'
})

export const client = createHttpClient({
    provider: 'https://turnip.iotasalad.org:14265'
})

export const Converter = require('@iota/converter')