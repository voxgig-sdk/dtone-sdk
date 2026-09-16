# Dtone SDK feature factory

from dtone_sdk.feature.base_feature import DtoneBaseFeature
from dtone_sdk.feature.debug_feature import DtoneDebugFeature
from dtone_sdk.feature.idempotency_feature import DtoneIdempotencyFeature
from dtone_sdk.feature.metrics_feature import DtoneMetricsFeature
from dtone_sdk.feature.paging_feature import DtonePagingFeature
from dtone_sdk.feature.ratelimit_feature import DtoneRatelimitFeature
from dtone_sdk.feature.retry_feature import DtoneRetryFeature
from dtone_sdk.feature.test_feature import DtoneTestFeature
from dtone_sdk.feature.timeout_feature import DtoneTimeoutFeature


_FEATURES = {
    "base": lambda: DtoneBaseFeature(),
    "debug": lambda: DtoneDebugFeature(),
    "idempotency": lambda: DtoneIdempotencyFeature(),
    "metrics": lambda: DtoneMetricsFeature(),
    "paging": lambda: DtonePagingFeature(),
    "ratelimit": lambda: DtoneRatelimitFeature(),
    "retry": lambda: DtoneRetryFeature(),
    "test": lambda: DtoneTestFeature(),
    "timeout": lambda: DtoneTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
