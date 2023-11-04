import load from 'src/app/load'

const mocks = {
  getConfigFilepath() {},
  getConfig() {},
  setCurrentConfig() {}
}

jest.mock('src/utils/config', () => ({
  ...jest.requireActual('src/utils/config'),
  getConfigFilepath(name) {
    mocks.getConfigFilepath()

    if (name === 'no-file-path') return false

    return '.cpcrc'
  },
  getConfig() {
    mocks.getConfig()
    return {
      name: 'cpc-sample',
      description: 'Some description',
      scripts: { hello: 'echo "Hello world!"' }
    }
  },
  setCurrentConfig() {
    mocks.setCurrentConfig()
  }
}))

describe('Testing load', () => {
  it('Should load current config', () => {
    const spy = jest.spyOn(mocks, 'setCurrentConfig')

    load()
    expect(spy).toBeCalled()
  })

  it('Should fail without filepath', () => {
    try {
      load(['no-file-path'])
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
