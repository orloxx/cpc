import packageJson from '../../package.json'
import { loadDoc } from './load'
import { runDoc } from './run'
import { useDoc } from './use'

function header() {
  console.log('\n ██████╗██████╗  ██████╗')
  console.log('██╔════╝██╔══██╗██╔════╝')
  console.log('██║     ██████╔╝██║')
  console.log('██║     ██╔═══╝ ██║')
  console.log('╚██████╗██║     ╚██████╗')
  console.log(` ╚═════╝╚═╝      ╚═════╝ v${packageJson.version}\n`)
  console.log('A program that suggest scripts depending on the context.\n')
}

function synopsis() {
  console.log('\nSynopsis:\n')
  console.log('\tcpc [command] [...parameters]')
}

function help() {
  header()
  synopsis()

  console.log('\nAvailable commands:')

  loadDoc()
  runDoc()
  useDoc()

  console.log()
}

export default help
