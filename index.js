#!/usr/bin/env node

import app from 'src/app'

async function startCLI() {
  const [, , command, ...params] = process.argv

  if (app[command]) {
    await app[command](params)
  } else {
    await app.init([command, ...params])
  }
}

startCLI().catch((error) => console.error(error.message))
