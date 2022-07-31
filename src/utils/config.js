import fs from 'fs'
import path from 'path'
import { homedir } from 'os'
import { readJsonFile, writeJsonFile } from './index'
import { dim } from './log-style'

export const CONFIG_RC = '.cpcrc'
export const CONFIG_RC_PATH = path.join(homedir(), CONFIG_RC)
export const SUPPORTED_FILES = [
  CONFIG_RC,
  `${CONFIG_RC}.json`,
  `${CONFIG_RC}.js`,
  `${CONFIG_RC}.cjs`
]

export function getConfigFilepath(filename) {
  if (fs.existsSync(filename)) {
    return filename
  }

  if (filename) {
    return false
  }

  return SUPPORTED_FILES.find((name) => fs.existsSync(name))
}

export function isValidConfig(configRc) {
  return configRc && configRc.name && !configRc.global
}

export function getGlobalConfig() {
  return (
    readJsonFile({
      filepath: CONFIG_RC_PATH
    }) || { global: true, configurations: {} }
  )
}

export function setCurrentConfig(configRc) {
  const globalRc = getGlobalConfig()

  globalRc.current = configRc.name
  globalRc.configurations[configRc.name] = configRc

  writeJsonFile({
    filepath: CONFIG_RC_PATH,
    data: globalRc
  })

  console.log(`\n✅ Configuration saved! Now using '${configRc.name}'`)
  console.log(`\t${dim(configRc.description)}\n`)
}

export function getCurrentConfig() {
  const globalRc = getGlobalConfig()

  if (!globalRc.current) {
    return false
  }

  return globalRc.configurations[globalRc.current]
}

export function getConfig({ filepath }) {
  const fileExt = path.extname(filepath).slice(1)

  if (fileExt.match(/js|cjs/)) {
    // This is the only place where we need 'require'
    // The alternative would be to use 'eval' which is not safe
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(`${path.join(process.cwd(), filepath)}`)
  }

  return readJsonFile({ filepath })
}

export function getLocalConfig() {
  const filepath = getConfigFilepath()

  if (!filepath || isValidConfig()) return false

  const configRc = getConfig({ filepath: getConfigFilepath() })

  return isValidConfig(configRc) ? configRc : false
}
