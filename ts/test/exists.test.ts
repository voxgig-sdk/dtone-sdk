
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DtoneSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DtoneSDK.test()
    equal(testsdk instanceof DtoneSDK, true,
      'DtoneSDK.test() must return a client synchronously')
  })

})
