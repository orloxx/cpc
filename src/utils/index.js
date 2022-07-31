import fs from 'fs'
import { spawn } from 'child_process'
import { dim } from './log-style'

export function isLowerAndDashesOnly(value) {
  return !!value.match(/^[a-z\\-]+$/)
}

export function readFile({ filepath }) {
  try {
    return fs.readFileSync(filepath, 'utf8')
  } catch (error) {
    return false
  }
}

export function readJsonFile({ filepath }) {
  try {
    return JSON.parse(readFile({ filepath }))
  } catch (error) {
    return false
  }
}

export function writeJsonFile({ filepath, data }) {
  try {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
  } catch (error) {
    return false
  }

  return true
}

export function getDirectories({ path }) {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
}

export function runCommand({ command, path, silent, pipeError }) {
  return new Promise((resolve) => {
    const endCommand = path ? `cd ${path} && ${command}` : command

    if (!silent) {
      console.log(`\n💬 Executing: ${dim(endCommand)}\n`)
    }

    const p = spawn(endCommand, {
      shell: true,
      stdio: silent ? null : [0, 1, pipeError ? 'pipe' : 2]
    })

    let errorOutput = ''

    if (pipeError) {
      p.stderr.on('data', (data) => {
        errorOutput += data.toString()
      })
    }

    p.on('close', () => {
      resolve(errorOutput)
    })
  })
}
