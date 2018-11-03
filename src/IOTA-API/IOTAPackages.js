import { composeAPI } from '@iota/core'
import { createHttpClient } from '@iota/http-client'
import { createGetNodeInfo } from '@iota/core'



export const iota = composeAPI({
    provider: 'https://dyn.tangle-nodes.com:443'
})

export const client = createHttpClient({
    provider: 'https://dyn.tangle-nodes.com:443'
})

export const Converter = require('@iota/converter')