import app from 'src/app'

describe('Testing app', () => {
  it('should export all function properties', () => {
    Object.keys(app).forEach((key) => {
      expect(typeof app[key]).toBe('function')
    })
  })
})
