package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestTransactionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Transaction(nil)
		if ent == nil {
			t.Fatal("expected non-nil TransactionEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"transaction": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Transaction(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Transaction(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := transactionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "transaction." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set DTONE_TEST_TRANSACTION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		transactionRef01Ent := client.Transaction(nil)
		transactionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "transaction"}, setup.data), "transaction_ref01"))

		transactionRef01DataResult, err := transactionRef01Ent.Create(transactionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		transactionRef01Data = core.ToMapAny(entityData(transactionRef01DataResult))
		if transactionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if transactionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		transactionRef01Match := map[string]any{}

		transactionRef01ListResult, err := transactionRef01Ent.List(transactionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		transactionRef01List, transactionRef01ListOk := transactionRef01ListResult.([]any)
		if !transactionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", transactionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(transactionRef01List), map[string]any{"id": transactionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		transactionRef01DataUp0Up := map[string]any{
			"id": transactionRef01Data["id"],
		}

		transactionRef01MarkdefUp0Name := "callback_url"
		transactionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-transaction_ref01_%d", setup.now)
		transactionRef01DataUp0Up[transactionRef01MarkdefUp0Name] = transactionRef01MarkdefUp0Value

		transactionRef01ResdataUp0Result, err := transactionRef01Ent.Update(transactionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		transactionRef01ResdataUp0 := core.ToMapAny(entityData(transactionRef01ResdataUp0Result))
		if transactionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if transactionRef01ResdataUp0["id"] != transactionRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if transactionRef01ResdataUp0[transactionRef01MarkdefUp0Name] != transactionRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", transactionRef01MarkdefUp0Name, transactionRef01ResdataUp0[transactionRef01MarkdefUp0Name])
		}

		// LOAD
		transactionRef01MatchDt0 := map[string]any{
			"id": transactionRef01Data["id"],
		}
		transactionRef01DataDt0Loaded, err := transactionRef01Ent.Load(transactionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		transactionRef01DataDt0LoadResult := core.ToMapAny(entityData(transactionRef01DataDt0Loaded))
		if transactionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if transactionRef01DataDt0LoadResult["id"] != transactionRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func transactionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "transaction", "TransactionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read transaction test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse transaction test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"transaction01", "transaction02", "transaction03"},
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
	entidEnvRaw := os.Getenv("DTONE_TEST_TRANSACTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"DTONE_TEST_TRANSACTION_ENTID": idmap,
		"DTONE_TEST_LIVE":      "FALSE",
		"DTONE_TEST_EXPLAIN":   "FALSE",
		"DTONE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["DTONE_TEST_TRANSACTION_ENTID"])
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
