import { askCoreCommands } from 'src/prompts'
import { actionText } from 'src/utils/log-style'
import help from './help'
import load from './load'
import run from './run'

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
  }
]

async function init() {
  const all = await askCoreCommands(CORE_COMMANDS)
  const { coreCommands } = all
  const command = CORE_COMMANDS.find(({ name }) => coreCommands === name)

  if (command.hint) {
    console.log(`\nNow running ${actionText(command.hint)}\n`)
  }

  await command.action()
}

export default {
  help,
  init,
  load,
  run
}
