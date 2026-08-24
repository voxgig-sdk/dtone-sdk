# Dtone SDK utility: make_context

from dtone_sdk.core.context import DtoneContext


def make_context_util(ctxmap, basectx):
    return DtoneContext(ctxmap, basectx)
