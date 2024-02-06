import sdk from '../client'

export const getAllAdds = (async () => {
  const response = await sdk.allAdds()

  return {
    adds: response.addss,
  }
})
