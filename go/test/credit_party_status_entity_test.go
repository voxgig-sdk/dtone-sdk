package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/dtone-sdk/go"
	"github.com/voxgig-sdk/dtone-sdk/go/core"

	vs "github.com/voxgig-sdk/dtone-sdk/go/utility/struct"
)

func TestCreditPartyStatusEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CreditPartyStatus(nil)
		if ent == nil {
			t.Fatal("expected non-nil CreditPartyStatusEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := credit_party_statusBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "credit_party_status." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set DTONE_TEST_CREDIT_PARTY_STATUS_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		creditPartyStatusRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.credit_party_status", setup.data)))
		var creditPartyStatusRef01Data map[string]any
		if len(creditPartyStatusRef01DataRaw) > 0 {
			creditPartyStatusRef01Data = core.ToMapAny(creditPartyStatusRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = creditPartyStatusRef01Data

		// LOAD
		creditPartyStatusRef01Ent := client.CreditPartyStatus(nil)
		creditPartyStatusRef01MatchDt0 := map[string]any{}
		creditPartyStatusRef01DataDt0Loaded, err := creditPartyStatusRef01Ent.Load(creditPartyStatusRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if creditPartyStatusRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func credit_party_statusBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "credit_party_status", "CreditPartyStatusTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read credit_party_status test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse credit_party_status test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"credit_party_status01", "credit_party_status02", "credit_party_status03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("DTONE_TEST_CREDIT_PARTY_STATUS_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"DTONE_TEST_CREDIT_PARTY_STATUS_ENTID": idmap,
		"DTONE_TEST_LIVE":      "FALSE",
		"DTONE_TEST_EXPLAIN":   "FALSE",
		"DTONE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["DTONE_TEST_CREDIT_PARTY_STATUS_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["DTONE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["DTONE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewDtoneSDK(core.ToMapAny(mergedOpts))
	}

	live := env["DTONE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["DTONE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
