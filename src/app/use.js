import { getGlobalConfig, setCurrentConfig } from 'src/utils/config'
import { actionText, dim } from 'src/utils/log-style'
import { askConfigurations } from 'src/prompts'

async function use() {
  const { configurations } = getGlobalConfig()
  const { configurationName } = await askConfigurations(
    Object.keys(configurations)
  )
  setCurrentConfig(configurations[configurationName])
}

export function useDoc() {
  console.log(`\n\t${actionText('use')}\t- Use a different configuration`)
  console.log(
    `\t\t  ${dim(
      'It shows a list of previously loaded configurations to choose from'
    )}`
  )
  console.log(`\n\t\t  ${dim('cpc use')}`)
}

export default use
