<?php
declare(strict_types=1);

// Dtone SDK utility: prepare_body

class DtonePrepareBody
{
    public static function call(DtoneContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
