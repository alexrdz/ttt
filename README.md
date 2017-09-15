# Terminal Tic Tac Toe

A tic tac toe game in the terminal using 

- [colors-cli](https://www.npmjs.com/package/colors-cli)
- [inquirer](https://www.npmjs.com/package/inquirer)

### Run the game

```
$ git clone git@github.com:alexrdz/ttt.git
$ cd ttt/
$ npm i -S
$ npm run start
```



### Player O wins - horizontal

![screen recording 1](ScreenRecording2017-09-14-A.gif)



### Player X wins - diagonal

![screen recording 1](ScreenRecording2017-09-14-B.gif)


#### Fix
I encountered a `call stack size exceeded` issue and have made a slight change to amend this. The change is in a an unmerged branch.

To see the fixes or use the less bugier version:
```
$ git checkout origin fix-one
$ npm run start
```
