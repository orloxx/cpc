import path from 'path'
import { actionText, dim } from 'src/utils/log-style'
import {
  getConfig,
  getConfigFilepath,
  CONFIG_RC,
  isValidConfig,
  setCurrentConfig
} from 'src/utils/config'

function load([name] = []) {
  const filepath = getConfigFilepath(name)

  if (!filepath) {
    throw new Error(
      `\n⚠️  File '${path.join(process.cwd(), name || CONFIG_RC)}' not found.\n`
    )
  }

  const config = getConfig({ filepath })

  if (!isValidConfig(config)) {
    throw new Error(
      `\n⚠️  File '${path.join(process.cwd(), filepath)}' invalid format.\n`
    )
  }

  setCurrentConfig(config)
}

export function loadDoc() {
  console.log(`\n\t${actionText('load')}\t- Load a CPC scripts file`)
  console.log(
    `\t\t  ${dim(
      'It loads a set of scripts to be used globally, no matter in which'
    )}`
  )
  console.log(`\t\t  ${dim("directory they're executed")}`)
  console.log(`\n\t\t  ${dim('cpc load [filepath]')}`)
}

export default load
