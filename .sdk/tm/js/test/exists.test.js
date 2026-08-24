
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { DtoneSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await DtoneSDK.test()
    equal(null !== testsdk, true)
  })

})
