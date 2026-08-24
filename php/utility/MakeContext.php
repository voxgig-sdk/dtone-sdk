<?php
declare(strict_types=1);

// Dtone SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class DtoneMakeContext
{
    public static function call(array $ctxmap, ?DtoneContext $basectx): DtoneContext
    {
        return new DtoneContext($ctxmap, $basectx);
    }
}
