function getPosTop(i,j){//计算格子的top值
    return 20 + i * 120;
}

function getPosLeft(i,j){//计算格子的Left值
    return 20 + j * 120;
}

function getNumberBackgroundcolor(number){//根据不同值获取不同的背景色
    switch(number){
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#eee4da";
            break;
        case 8:
            return "#f26179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e36";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#3365a5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6bc";
            break;
        case 8192:
            return "#93c";
            break;
        }
        return "black";
}

function getNumberColor(number){//前景色
    if(number <= 4){
        return "#776e65";
    }
    return "white";
}

function nospace(board){//生成随机数的时候判断16宫格有无空间
    for(var i = 0 ; i < 4 ; i ++)
       for(var j = 0 ; j < 4 ; j ++)
           if(board[i][j]==0)
           return false;

    return true;
}

function canMoveLeft(board){//判断是否能左移
    for(var i = 0; i < 4 ; i++)
        for(var j = 1 ; j < 4 ; j ++)
            if(board[i][j]!=0)
               if(board[i][j-1]==0 || board[i][j-1]==board[i][j])
                  return true;
    return false;         
}

function canMoveRight(board){//判断是否能右移
    for(var i = 0 ; i < 4 ; i++)
        for(var j = 2 ; j >= 0 ; j--)
            if(board[i][j] != 0)
               if(board[i][j+1] == 0 || board[i][j+1]==board[i][j])
                  return true;
    return false;
}

function canMoveUp(board){//判断是否能上移
    for(var j = 0 ; j < 4 ; j++)
        for(var i = 1 ; i < 4 ; i ++)
            if(board[i][j]!=0)
               if(board[i-1][j] == 0 || board[i-1][j]==board[i][j])
                  return true;
    return false;
}

function canMoveDown(board){//判断是否能下移
    for(var j = 0 ; j < 4 ; j++)
    for(var i = 2 ; i >= 0 ; i --)
        if(board[i][j]!=0)
           if(board[i+1][j] == 0 || board[i+1][j]==board[i][j])
              return true;
return false;
}

function noBlockHorizontal(row,col1,col2,board){//水平方向上是否有障碍物
    for(var i = col1+1 ; i < col2 ; i++)
        if(board[row][i]!=0)
           return false;
    return true;
}

function noBlockVertical(col,row1,row2,board){//垂直方向是否有障碍物
    for(var i = row1+1 ; i < row2 ; i ++)
        if(board[i][col] != 0)
           return false;
    return true;
}

function nomove(board){//判断是否还能上下左右的移动
    if(canMoveLeft(board) || 
    canMoveRight(board) ||
    canMoveUp(board) ||
    canMoveDown(board))
        return false;
    return true;
}