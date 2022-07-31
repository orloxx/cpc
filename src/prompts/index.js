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
      message: 'We found these scripts, please choose one',
      choices
    }
  ])
}

export function askESLintConfig(choices) {
  console.log(
    '\n⚠️  This action will overwrite existing ESLint configuration files\n'
  )
  return prompt([
    {
      type: 'autocomplete',
      name: 'eslintConfig',
      message: 'Which configuration do you want to use?',
      choices
    }
  ])
}

export function askConfirm(message) {
  return prompt([{ type: 'confirm', name: 'ok', message }])
}
