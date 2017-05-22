#NoEnv
#SingleInstance, force

SendMode, Input
SetWorkingDir, %A_ScriptDir%
DetectHiddenWindows, On
SetTitleMatchMode, 2
; ================================================================= ;
IniRead, benX, coords.ini, benjamin, 1
IniRead, benY, coords.ini, benjamin, 2

WinGetActiveTitle, myGame 
ControlClick, x%benX% y%benY%, OBS
WinActivate, %myGame%
Return

debug(x*){
for a,b in x
    msg .= b "`n"

msgbox, , , %msg%, 2
}
