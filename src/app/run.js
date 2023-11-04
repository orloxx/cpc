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
  const isNPM = prefix === CHOICES_MAP.npm.prefix

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

function combineChoices([packageJson, localConfig, currentConfig]) {
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

  return choices
}

async function getChoice({ choices, params }) {
  const [command] = params

  if (command && choices.some(({ name }) => name === command)) {
    return choices.find(({ name }) => name === command)
  }

  const { scriptName } = await askScripts(choices)
  return choices.find(({ name }) => name === scriptName)
}

function getExtraParams(params) {
  const idx = params.indexOf('--')
  return idx > -1 ? params.slice(idx + 1) : []
}

function isSilent(params) {
  if (params.includes('--silent') || params.includes('-s')) {
    return true
  }

  const extraParams = getExtraParams(params)

  if (extraParams.length) {
    return params.length - extraParams.length > 1
  }

  return !!params.length
}

async function run(params) {
  if (isSilent(params)) {
    console.log = () => {}
  }

  const currentConfig = getCurrentConfig()
  const localConfig = getLocalConfig()
  const packageJson = readJsonFile({ filepath: 'package.json' })

  if (!currentConfig && !localConfig && !packageJson) {
    throw new Error('\n⚠️  Did not find any script to run.\n')
  }

  if (currentConfig) {
    console.log(`\nGlobal scripts: ${actionText(currentConfig.name)}`)
    console.log(`${dim(currentConfig.description)}`)
  }

  const choices = combineChoices([packageJson, localConfig, currentConfig])
  const choice = await getChoice({ choices, params })

  await runCommand({
    command: choice.command,
    path: choice.directory,
    args: getExtraParams(params)
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
  console.log(`\n\t\t  ${dim('cpc run [command] [-- arguments]')}`)
}

export default run
