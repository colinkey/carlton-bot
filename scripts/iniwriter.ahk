#NoEnv
#SingleInstance, force

SendMode, Input
SetWorkingDir, %A_ScriptDir%
DetectHiddenWindows, On
SetTitleMatchMode, 2
;==============================================;

MsgBox, Let's calibrate some shit. Open OBS, hold 1 and click on the scene in the Scenes: list to calibrate that scene.

1 & LButton::
MouseGetPos, benX, benY
Return

2 & LButton::
MouseGetPos, jakeX, jakeY
Return

3 & LButton::
MouseGetPos, gregX, gregY
Return

+F11::
Gosub, CoordSave
ExitApp
Return

CoordSave:
Loop 3 
{
    User:= A_Index
    Loop 2
        IniWrite, % (User = 1 and A_Index = 1) ? benX : (User = 1 and A_Index = 2) ? benY : (User = 2 and A_Index = 1) ? jakeX : (User = 2 and A_Index = 2) ? jakeY : (User = 3 and A_Index = 1) ? gregX : gregY, coords.ini, % User = 1 ? "benjamin" : User = 2 ? "jake" : "greg", %A_Index%
}
Return