var board = new Array(); //将游戏数据存储其中
var score = 0;  //得分记录
var hasConflicted = new Array();//声明碰撞
$(document).ready(function(){//定义了一个newgame等document加载完后调用
    newgame();
});

function newgame(){
    //首先初始化棋盘格
    init();
    //随机生成两个数字
    generateOneNumber();
    generateOneNumber();

}

function init(){//双重循环遍历每一个格子
    for(var i = 0 ; i < 4 ; i ++){
        for(var j = 0 ; j < 4 ; j ++){
            var gridCell=$("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
        }
    }

    for(var i = 0 ; i < 4 ; i ++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j = 0 ; j < 4 ; j ++){
        board[i][j] = 0;  //将board的值初始化为0  
        hasConflicted[i][j] = false; 
       }
    }
    updateBoardView();//通知前端对board数组进行设定
    score = 0;//分数初始化
}

function updateBoardView(){
    $(".number-cell").remove(); //先清空可能存在的number-cell
    for(var i = 0 ; i < 4 ; i ++)
        for(var j = 0 ; j < 4 ; j ++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell=$("#number-cell-"+i+"-"+j); //代表number-cell
            
            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css("top",getPosTop(i,j)+50);
                theNumberCell.css("left",getPosLeft(i,j)+50);
            }
            else{//不为0时number-cell覆盖
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css("top",getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundcolor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
}

function generateOneNumber(){//生成随机的格子

    if(nospace(board))  //判断有无空间
        return false;

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() *4));
    var randy = parseInt(Math.floor(Math.random() *4));
    while(true){
        if(board[randx][randy]==0)
           break;
    randx = parseInt(Math.floor(Math.random() *4));
    randy = parseInt(Math.floor(Math.random() *4));

    }
    //随机一个数字
    var randNumber = Math.random() < 0.5? 2 :4 ;
    //在随机位置显示生成随机数字
    board[randx][randy]=randNumber;
    //引入动画效果
    showNumberAnimation(randx,randy,randNumber);
    return true;
    
}

//游戏主逻辑上下左右移
$(document).keydown(function(event){
    switch(event.keyCode){
        case 37://Left
             if(moveLeft()){
                 setTimeout("generateOneNumber()",210);//每次新增一个数字都有可能导致游戏结束
                 setTimeout("isgameover()",300);
             }
             break;
        case 38: //Up
             if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
             }
             break;
        case 39://Right
             if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
             }
             break;
        case 40: //Down
             if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
             }
             break;
        default:
             break;
    }
});

function isgameover(){//判断游戏是否结束
    if(nospace(board) && nomove(board))
    gameover();   
}

function gameover(){
    $("#gameover").css('display','block');
}

//向左移动
function moveLeft(){

    if( !canMoveLeft(board))
       return false;
   //真正的向左移动
    for(var i = 0 ; i < 4; i ++)
        for(var j = 1 ; j < 4 ; j ++){//第一列数字已经不能再向左移动
            if(board[i][j]!=0){
                for(var k = 0 ; k < j ; k ++){
                    //落脚位置是否为空 && 中间没有障碍物
                   if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                      //移动
                      showMoveAnimation(i,j,i,k); //移动的动画显示 
                      board[i][k] = board[i][j];  //移动到新的位置上
                      board[i][j] = 0;//移动原来的位置清0
                      continue;

                   }
                   //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                   else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                       //移动
                       showMoveAnimation(i,j,i,k); 
                       //相加
                       board[i][k] += board[i][j];
                       board[i][j] = 0;
                       score += board[i][k];
                       updateScore(score);
                       hasConflicted[i][k] = true;
                       continue;
                   }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

//向右移动
function moveRight(){
    if(!canMoveRight(board))
       return false;
       //实现向右移动
       for(var i = 0 ; i < 4; i++)
           for(var j = 2 ; j >= 0; j--){//最后一列数字不能向右移动
               if(board[i][j]!=0){
                   for(var k = 3 ; k > j ; k --){
                       //落脚位置是否为空 && 中间没有障碍物
                       if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                           //移动
                           showMoveAnimation(i,j,i,k);
                           board[i][k] = board[i][j];
                           board[i][j] = 0;
                           continue;
                       }
                       //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                       else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
                           //移动
                           showMoveAnimation(i,j,i,k);
                           //叠加操作
                           board[i][k] *= 2;
                           board[i][j] = 0;
                           score += board[i][k];
                           updateScore(score);
                           hasConflicted[i][k] = true;
                           continue;
                        }
                   }
               }
        }
    setTimeout("updateBoardView()",200);
    return true;      
}

function moveUp(){
    if(!canMoveUp(board))
        return false;
        //实现向上移动
        for(var j = 0 ; j < 4 ; j ++)
            for(var i = 1 ; i < 4 ; i++){//最上面的一行无法再向上移动
                if(board[i][j] != 0){
                    for(var k = 0 ; k < i ; k++){
                        //落脚位置是否为空 && 中间没有障碍物
                        if(board[k][j] == 0 && noBlockVertical(j,k,i,board) ){
                            //移动
                            showMoveAnimation(i,j,k,j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                        else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board)&& !hasConflicted[k][j]){
                            //移动
                            showMoveAnimation(i,j,k,j);
                            board[k][j] *= 2;
                            board[i][j] = 0;
                            score += board[k][j];
                            updateScore(score);
                            hasConflicted[k][j] = true;
                            continue;
                        }
                    }
                }
            }
    setTimeout("updateBoardView()",200);
    return true;          
}

function moveDown(){
    if(!canMoveDown(board))
        return false;
        //实现向上移动
        for(var j = 0 ; j < 4 ; j ++)
            for(var i = 2 ; i >= 0 ; i --){//最下面的一行无法再向下移动
                if(board[i][j] != 0){
                    for(var k = 3 ; k > i ; k --){
                        //落脚位置是否为空 && 中间没有障碍物
                        if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
                            //移动
                            showMoveAnimation(i,j,k,j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                        else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
                            //移动
                            showMoveAnimation(i,j,k,j);
                            board[k][j] *= 2;
                            board[i][j] = 0;
                            score += board[k][j];
                            updateScore(score);
                            hasConflicted[k][j] = true;
                            continue;
                        }
                    }
                }
            }
    setTimeout("updateBoardView()",200);
    return true;          
}