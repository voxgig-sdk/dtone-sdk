-- Dtone SDK error

local DtoneError = {}
DtoneError.__index = DtoneError


function DtoneError.new(code, msg, ctx)
  local self = setmetatable({}, DtoneError)
  self.is_sdk_error = true
  self.sdk = "Dtone"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function DtoneError:error()
  return self.msg
end


function DtoneError:__tostring()
  return self.msg
end


return DtoneError
