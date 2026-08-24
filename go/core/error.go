package core

type DtoneError struct {
	IsDtoneError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewDtoneError(code string, msg string, ctx *Context) *DtoneError {
	return &DtoneError{
		IsDtoneError: true,
		Sdk:              "Dtone",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *DtoneError) Error() string {
	return e.Msg
}
