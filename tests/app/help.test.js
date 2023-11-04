import help from 'src/app/help'

const docMocks = {
  loadDoc: () => {},
  runDoc: () => {},
  useDoc: () => {}
}

jest.mock('src/app/load', () => ({
  loadDoc: () => docMocks.loadDoc()
}))
jest.mock('src/app/run', () => ({
  runDoc: () => docMocks.runDoc()
}))
jest.mock('src/app/use', () => ({
  useDoc: () => docMocks.useDoc()
}))

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Testing help', () => {
  it('should show all docs', () => {
    const spies = Object.keys(docMocks).map((name) =>
      jest.spyOn(docMocks, name)
    )

    help()
    spies.forEach((spy) => {
      expect(spy).toBeCalled()
    })
  })
})
