# Dtone SDK exists test

import pytest
from dtone_sdk import DtoneSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DtoneSDK.test(None, None)
        assert testsdk is not None
