import { readJsonFile, runCommand } from 'src/utils'
import { askScripts } from 'src/prompts'
import { actionText, dim } from 'src/utils/log-style'
import { getCurrentConfig, getLocalConfig } from 'src/utils/config'

const CHOICES_MAP = {
  local: { prefix: 'local-', hint: '(local .cpcrc)' },
  npm: { prefix: 'npm-', hint: '(package.json)' }
}

function getChoices(config, { prefix, hint } = {}) {
  if (!config) return []

  const { scripts } = config
  const isNPM = prefix === 'npm-'

  return Object.keys(scripts).map((command) => ({
    name: `${prefix || ''}${command}`,
    message: command,
    directory: scripts[command].path,
    command: isNPM
      ? `npm run ${command}`
      : scripts[command].command || scripts[command],
    hint
  }))
}

async function run() {
  const currentConfig = getCurrentConfig()
  const localConfig = getLocalConfig()
  const packageJson = readJsonFile({ filepath: 'package.json' })

  if (!currentConfig && !localConfig && !packageJson) {
    throw new Error('\n⚠️  Did not find any script to run.\n')
  }

  const globalChoices = getChoices(currentConfig)
  const localChoices = getChoices(localConfig, CHOICES_MAP.local)
  const packageChoices = getChoices(packageJson, CHOICES_MAP.npm)
  const choices = globalChoices

  if (
    (currentConfig || localConfig) &&
    currentConfig.name !== localConfig.name
  ) {
    choices.push(...localChoices)
  }
  choices.push(...packageChoices)

  const { scriptName } = await askScripts(choices)
  const choice = choices.find(({ name }) => name === scriptName)

  await runCommand({
    command: choice.command,
    path: choice.directory
  })
}

export function runDoc() {
  console.log(`\n\t${actionText('run')}\t- Run script`)
  console.log(
    `\t\t  ${dim(
      'It will look for scripts to run in the global configuration or in'
    )}`
  )
  console.log(`\t\t  ${dim('the package.json file.')}`)
  console.log(`\n\t\t  ${dim('e.g. cpc run')}`)
}

export default run
