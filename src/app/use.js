import { getGlobalConfig, setCurrentConfig } from 'src/utils/config'
import { actionText, dim } from 'src/utils/log-style'
import { askConfigurations } from 'src/prompts'

async function use() {
  const { configurations } = getGlobalConfig()
  const options = Object.keys(configurations)

  if (!options.length) {
    throw new Error('\n⚠️  Global configuration not found. Load one first.\n')
  }

  const { configurationName } = await askConfigurations(options)
  setCurrentConfig(configurations[configurationName])
}

export function useDoc() {
  console.log(`\n\t${actionText('use')}\t- Use a configuration`)
  console.log(
    `\t\t  ${dim(
      'It will show a list of previously loaded configurations to choose from.'
    )}`
  )
  console.log(`\n\t\t  ${dim('e.g. cpc use')}`)
}

export default use
