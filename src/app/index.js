import { askCoreCommands } from 'src/prompts'
import { actionText } from 'src/utils/log-style'
import help from './help'
import load from './load'
import run from './run'
import use from './use'

const CORE_COMMANDS = [
  {
    name: 'help',
    message: 'ℹ️  Show help screen',
    hint: 'cpc help',
    action: help
  },
  {
    name: 'load',
    message: '🛠  Load configuration',
    hint: 'cpc load',
    action: load
  },
  {
    name: 'run',
    message: '⚙️  Run script',
    hint: 'cpc run',
    action: run
  },
  {
    name: 'use',
    message: '🗂  Use configuration',
    hint: 'cpc use',
    action: use
  }
]

async function init(params) {
  const all = await askCoreCommands(CORE_COMMANDS)
  const { coreCommands } = all
  const command = CORE_COMMANDS.find(({ name }) => coreCommands === name)

  if (command.hint) {
    console.log(`\nNow running ${actionText(command.hint)}\n`)
  }

  await command.action(params)
}

export default {
  help,
  init,
  load,
  run,
  use
}
