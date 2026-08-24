-- Typed models for the Dtone SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Service
---@field id? number
---@field name? string
---@field subservices? table

---@class ServiceLoadMatch
---@field id number

---@class ServiceListMatch
---@field id? number
---@field name? string
---@field subservices? table

local M = {}

return M
