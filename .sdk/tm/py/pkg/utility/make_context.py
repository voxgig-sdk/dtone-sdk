# Dtone SDK utility: make_context

from projectname_sdk.core.context import DtoneContext


def make_context_util(ctxmap, basectx):
    return DtoneContext(ctxmap, basectx)
