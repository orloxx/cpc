import { prompt } from 'enquirer'
import { isLowerAndDashesOnly } from 'src/utils'

export function askProjectName() {
  return prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your project?',
      validate: isLowerAndDashesOnly
    }
  ])
}

export function askCoreCommands(choices) {
  console.log()
  return prompt([
    {
      type: 'autocomplete',
      name: 'coreCommands',
      message: 'What do you want to do?',
      choices
    }
  ])
}

export function askScripts(choices) {
  console.log()
  return prompt([
    {
      type: 'autocomplete',
      name: 'scriptName',
      message: 'Please choose a script',
      choices
    }
  ])
}

export function askConfigurations(choices) {
  console.log()
  return prompt([
    {
      type: 'autocomplete',
      name: 'configurationName',
      message: 'Please choose one configuration',
      choices
    }
  ])
}

export function askConfirm(message) {
  return prompt([{ type: 'confirm', name: 'ok', message }])
}
