#NoEnv
#SingleInstance, force

SendMode, Input
SetWorkingDir, %A_ScriptDir%
DetectHiddenWindows, On
SetTitleMatchMode, 2
; ================================================================= ;
IniRead, gregX, coords.ini, greg, 1
IniRead, gregY, coords.ini, greg, 2

WinGetActiveTitle, myGame 
ControlClick, x%gregX% y%gregY%, OBS
WinActivate, %myGame%
Return

debug(x*){
for a,b in x
    msg .= b "`n"

msgbox, , , %msg%, 2
}