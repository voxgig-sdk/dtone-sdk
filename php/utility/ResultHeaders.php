<?php
declare(strict_types=1);

// Dtone SDK utility: result_headers

class DtoneResultHeaders
{
    public static function call(DtoneContext $ctx): ?DtoneResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
