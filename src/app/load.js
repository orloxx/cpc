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
  console.log(`\n\t${actionText('load')}\tcpc load [<filepath>]`)
  console.log(`\n\t\t${dim('It loads a set of scripts to be used globally,')}`)
  console.log(`\t\t  ${dim('no matter in which directory they are executed.')}`)
  console.log(
    `\n\t\t<filepath> ${dim('The path to the script file. If empty,')}`
  )
  console.log(
    `\t\t  ${dim('it will look for a .cpcrc file in the current directory.')}`
  )
  console.log(`\t\t${dim('It supports the following formats:')}`)
  console.log(`\t\t  ${dim('- .cpcrc: JSON format')}`)
  console.log(`\t\t  ${dim('- .cpcrc.json: JSON format')}`)
  console.log(`\t\t  ${dim('- .cpcrc.js: JavaScript format')}`)
}

export default load
