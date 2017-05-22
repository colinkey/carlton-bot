#NoEnv
#SingleInstance, force

SendMode, Input
SetWorkingDir, %A_ScriptDir%
DetectHiddenWindows, On
SetTitleMatchMode, 2
; ================================================================= ;
IniRead, jakeX, coords.ini, jake, 1
IniRead, jakeY, coords.ini, jake, 2

WinGetActiveTitle, myGame 
ControlClick, x%jakeX% y%jakeY%, OBS
WinActivate, %myGame%
Return

debug(x*){
for a,b in x
    msg .= b "`n"

msgbox, , , %msg%, 2
}