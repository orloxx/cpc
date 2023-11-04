import app from 'src/app'

describe('Testing app', () => {
  it('should export all function properties', () => {
    Object.keys(app).forEach((key) => {
      expect(typeof app[key]).toBe('function')
    })
  })

  it('should have all core functions', () => {
    const all = ['help', 'init', 'load', 'run', 'use']
    const current = Object.keys(app)
    expect(all.every((name) => current.includes(name))).toBe(true)
    expect(current.every((name) => all.includes(name))).toBe(true)
  })
})
