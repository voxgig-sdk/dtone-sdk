<?php
declare(strict_types=1);

// MobileNumber entity test

require_once __DIR__ . '/../dtone_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class MobileNumberEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = DtoneSDK::test(null, null);
        $ent = $testsdk->MobileNumber(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = mobile_number_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "mobile_number." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set DTONE_TEST_MOBILE_NUMBER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $mobile_number_ref01_ent = $client->MobileNumber(null);
        $mobile_number_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.mobile_number"), "mobile_number_ref01"));

        $mobile_number_ref01_data_result = $mobile_number_ref01_ent->create($mobile_number_ref01_data, null);
        $mobile_number_ref01_data = Helpers::to_map(is_object($mobile_number_ref01_data_result) && method_exists($mobile_number_ref01_data_result, 'data_get') ? $mobile_number_ref01_data_result->data_get() : $mobile_number_ref01_data_result);
        $this->assertNotNull($mobile_number_ref01_data);

        // LOAD
        $mobile_number_ref01_match_dt0 = [];
        $mobile_number_ref01_data_dt0_loaded = $mobile_number_ref01_ent->load($mobile_number_ref01_match_dt0, null);
        $this->assertNotNull($mobile_number_ref01_data_dt0_loaded);

    }
}

function mobile_number_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/mobile_number/MobileNumberTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = DtoneSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["mobile_number01", "mobile_number02", "mobile_number03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("DTONE_TEST_MOBILE_NUMBER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "DTONE_TEST_MOBILE_NUMBER_ENTID" => $idmap,
        "DTONE_TEST_LIVE" => "FALSE",
        "DTONE_TEST_EXPLAIN" => "FALSE",
        "DTONE_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["DTONE_TEST_MOBILE_NUMBER_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["DTONE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["DTONE_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new DtoneSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["DTONE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["DTONE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
