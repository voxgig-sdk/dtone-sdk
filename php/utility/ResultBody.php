<?php
declare(strict_types=1);

// Dtone SDK utility: result_body

class DtoneResultBody
{
    public static function call(DtoneContext $ctx): ?DtoneResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
