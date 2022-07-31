const STYLES = {
  reset: '\x1B[0m',
  bright: '\x1B[1m',
  dim: '\x1B[2m',
  underscore: '\x1B[4m',
  blink: '\x1B[5m',
  reverse: '\x1B[7m',
  hidden: '\x1B[8m',
  fgBlack: '\x1B[30m',
  fgRed: '\x1B[31m',
  fgGreen: '\x1B[32m',
  fgYellow: '\x1B[33m',
  fgBlue: '\x1B[34m',
  fgMagenta: '\x1B[35m',
  fgCyan: '\x1B[36m',
  fgWhite: '\x1B[37m',
  bgBlack: '\x1B[40m',
  bgRed: '\x1B[41m',
  bgGreen: '\x1B[42m',
  bgYellow: '\x1B[43m',
  bgBlue: '\x1B[44m',
  bgMagenta: '\x1B[45m',
  bgCyan: '\x1B[46m',
  bgWhite: '\x1B[47m'
}

function applyStyle(text, style) {
  return `${style}${text}${STYLES.reset}`
}

export function bold(text) {
  return applyStyle(text, STYLES.bright)
}

export function dim(text) {
  return applyStyle(text, STYLES.dim)
}

export function underline(text) {
  return applyStyle(text, STYLES.underscore)
}

export function highlight(text) {
  return applyStyle(applyStyle(text, STYLES.fgBlack), STYLES.bgWhite)
}

export function actionText(text) {
  return applyStyle(bold(text), STYLES.fgCyan)
}
