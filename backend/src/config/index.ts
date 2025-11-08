import devConfig from './dev'
import prodConfig from './prod'

type Config = Record<string, any>

const config: Config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

config.isGuestMode = true

export default config