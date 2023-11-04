import { getGlobalConfig, setCurrentConfig } from 'src/utils/config'
import { actionText, dim } from 'src/utils/log-style'
import { askConfigurations } from 'src/prompts'

async function use(params) {
  const { configurations } = getGlobalConfig()
  const options = Object.keys(configurations)
  const [preSelectedOption] = params

  if (!options.length) {
    throw new Error('\n⚠️  Global configuration not found. Load one first.\n')
  }

  if (preSelectedOption && options.includes(preSelectedOption)) {
    setCurrentConfig(configurations[preSelectedOption])
  } else {
    const { configurationName } = await askConfigurations(options)
    setCurrentConfig(configurations[configurationName])
  }
}

export function useDoc() {
  console.log(`\n\t${actionText('use')}\tcpc use [<configuration>]`)
  console.log(
    `\n\t\t${dim('It will show a list of previously loaded configurations.')}`
  )
  console.log(
    `\n\t\t<configuration> ${dim('Configuration name to use it directly')}`
  )
  console.log(`\t\t  ${dim('without prompting for suggestions.')}`)
}

export default use
