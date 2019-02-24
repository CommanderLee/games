var GameStatus = {
    DESC: 1,
    READY: 2,
    RUNNING: 3,
    END: 4,
};

$(document).ready(function()
{
    console.log("init-words");

    Init();

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        // alert('Key pressed' + keyName);

        switch (keyName) {
            case 'Enter':
                if (currStatus == GameStatus.DESC) {
                    // Start Game: DESC -> READY
                    GameStart();
                }
                else if (currStatus == GameStatus.READY) {
                    // Ready -> game start
                    currStatus = GameStatus.RUNNING;
                    // First word init (from -1)
                    NextWord();
                    // Start timer.
                    runTimer();
                }
                else if (currStatus == GameStatus.RUNNING) {
                    // Next word. Log successful word.
                    corrCnt += 1;
                    NextWord();
                }
                break;
            case 'Escape':
                // resume the status from runout / timeout
                if (currGroup < groupNum - 1) {
                    // Log the groupScores
                    groupScores[currGroup] = corrCnt;

                    currGroup += 1;
                    InitEachGroup();
                    return;
                }
                else {
                    groupScores[currGroup] = corrCnt;

                    // END
                    $('#curr_word').html("游戏结束");
                    $('#word_no').html(`1 ~ ${currGroup + 1}号队伍得分: ` + groupScores.join());
                    $('#curr_song').html("");
                }
                break;
            default:
                // any other character during the game
                if (currStatus == GameStatus.RUNNING) {
                    passCnt += 1;
                    NextWord();
                }
                break;
        }
    });
});

function  NextWord()
{
    // Update team score info and display the next word
    $('#team_info').html(`${currGroup + 1}号队伍: 正确 (${corrCnt}), 跳过 (${passCnt})`);

    wordID += 1;
    if (wordID < wordGroup[currGroup].length) {
        $('#curr_word').html(wordGroup[currGroup][wordID]);
        $('#word_no').html(`${wordID + 1} / ${wordGroup[currGroup].length}`);
    }
    else {
        $('#curr_word').html(`词库用完啦！<br>${currGroup + 1}号队伍：${corrCnt}分`);
        // runout = true;
        currStatus = GameStatus.END;
    }
}

function Init()
{
    words = "清华科技园;辅导员;一带一路;水木清华;元宵;北平市;《无问西东》;丁香花;汤圆;光华管理学院;猛龙队;财源广进;北京电影学院;《变形记》;拜年;东区浴室;细思极恐;福星高照;自动控制;静斋;西门烤翅;度假;朱自清;万人食堂;七十周年;综合体育馆;二维码;清华学堂;荷塘;基因编辑;博士后;工字厅;清华附中;照澜院;卧伍真;成府路;人艰不拆;辞旧迎新;小猪佩奇;新斋;艺术团;年年有余;图书馆;新竹;守岁;《金蛇狂舞》;近春园;金玉满堂;微波炉;金工实习;麻辣烫;校庆;梅竹赛;5G;猜灯谜;大类招生;年夜饭;观畴园;九字班;未名湖;情人坡;学生会;大吉大利;学生节;滑溜里脊;《飞驰人生》;科学馆;古月堂;《四世同堂》;麻辣香锅;清华园;酒井;荒岛;毕业证;日晷;高尔夫;校园卡;期末考试;《流浪地球》;昆明湖;葡萄;桥牌;学生证;马约翰;冻雨;《红楼梦》;团委;CN Tower;桃李园;二校门;奖学金;拓扑学;累觉不爱;梅花;《知否知否》;甲所;紫荆花;蒸蒸日上;压岁钱;西大饭厅;对联;社团;《大江大河》;博雅塔;昆明;紫荆公寓;共享单车;电动车;北冰洋;酱肘子;运动会;外星人;玉兔二号;除夕;工会俱乐部;滑雪;五道口;同方部;微积分;大礼堂";
    wordList = words.split(';');
    groupNum = 3;
    wordNumEach = Math.floor(wordList.length / groupNum);
    console.log(wordNumEach);
    // wordGroup = [wordList.slice(0, wordNumEach), wordList.slice(wordNumEach, wordNumEach * 2), wordList.slice(wordNumEach * 2, wordNumEach * 3), wordList.slice(wordNumEach * 3, wordNumEach * 4)];
    wordGroup = [wordList.slice(0, wordNumEach), wordList.slice(wordNumEach, wordNumEach * 2), wordList.slice(wordNumEach * 2, wordNumEach * 3)];
    console.log(wordGroup);
    currGroup = 0
    groupScores = [0, 0, 0];

    currStatus = GameStatus.DESC;

    document.getElementById("words").style.display = 'none';
}

function GameStart()
{
    currStatus = GameStatus.READY;
    // Remove description
    document.getElementById("description").style.display = 'none';
    document.getElementById("words").style.display = 'block';

    InitEachGroup();
}

function InitEachGroup()
{
    // Debug; should be 90
    currTimer = 150;
    wordID = -1;
    corrCnt = 0;
    passCnt = 0;
    // runout = false;
    // timeout = false;

    currStatus = GameStatus.READY;
    $('#curr_word').html("Ready?");
    $('#word_no').html('-- / --');
    $('#timer').html('剩余时间: ' + currTimer)
    $('#team_info').html(`${currGroup + 1}号队伍: 正确 (${corrCnt}), 跳过 (${passCnt})`);
}

function runTimer() {
    $('#timer').html('剩余时间: ' + currTimer)
    currTimer -= 1;
    if (currTimer >= 0) {
        if (currStatus != GameStatus.RUNNING) {
            // End immediately
            return;
        }
        else {
            setTimeout(runTimer, 1000);
        }
    }
    else {
        $('#curr_word').html(`时间到^-^<br>${currGroup + 1}号队伍：${corrCnt}分`);
        // started = false;
        // timeout = true;
        currStatus = GameStatus.END;
    }
}
