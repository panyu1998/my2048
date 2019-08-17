function showNumberAnimation(i,j,randNumber){//实现随机数字样式的变动

    var numbercell = $('#number-cell-'+i+'-'+j);
    numbercell.css('background-color',getNumberBackgroundcolor(randNumber));
    numbercell.css('color',getNumberColor(randNumber));
    numbercell.text(randNumber);

    numbercell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);
}

function showMoveAnimation(fromx,fromy,tox,toy){//实现移动格子样式的改变
    var numbercell = $('#number-cell-'+fromx+'-'+fromy);

numbercell.animate({
    top:getPosTop(tox,toy),
    left:getPosLeft(tox,toy),
},200);
}

function updateScore(score){
    $('#score').text(score);
}