$(document).ready(function()
{
    Init();

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        // alert('Key pressed' + keyName);

        switch (keyName) {
            case 'Enter':
                if (started && !runout) {
                    // Go to next one.
                    corrCnt += 1;
                }
                else if (!started) {
                    // Start timer.
                    InitEachGroup()

                    $('#curr_word').html(wordGroup[nextGroup][wordID]);
                    started = true;

                    runCounter();
                }
                break;
            case 'Escape':
                // resume the status from runout / timeout
                if (nextGroup < 4) {
                    nextGroup += 1;
                    InitEachGroup();
                    return;
                }
                break;
            default:
                if (!runout) {
                    passCnt += 1;
                }
                break;
        }

        if (!runout) {
            wordID += 1;
            $('#team_info').html(`team ${nextGroup + 1}: correct (${corrCnt}), pass (${passCnt})`);

            if (wordID < wordGroup[nextGroup].length) {
                $('#curr_word').html(wordGroup[nextGroup][wordID]);
            }
            else {
                $('#curr_word').html("词库用完啦！");
                runout = true;
            }
        }

    });
});

function Init()
{
    words = "大礼堂;运动会;九字班;清华学堂;猜灯谜;照澜院;毕业证;西大饭厅;图书馆;无问西东;万人食堂;昆明湖;博士后;东区浴室;同方部;酒井;团委;麻辣香锅;元宵;博雅塔;观畴园;新斋;高尔夫;七十周年;麻辣烫;北冰洋;汤圆;自动控制;5G;二维码;葡萄;校园卡;外星人;静斋;金工实习;工字厅;艺术团;大类招生;未名湖;近春园;微波炉;滑溜里脊;学生节;工会俱乐部;清华科技园;成府路;紫荆花;玉兔二号;朱自清;期末考试;马约翰;情人坡;二校门;昆明;科学馆;水木清华;体育馆;流浪地球;新竹;酱肘子;辅导员;卧伍真;飞驰人生;梅竹赛;丁香花;日晷;清华园;电动车;北平市;荷塘;社团;古月堂;紫荆公寓;西门烤翅;奖学金;梅花;北京电影学院;荒岛;共享单车;光华管理学院;桥牌;学生会;学生证;五道口;清华附中;甲所;微积分;桃李园";
    wordList = words.split(';');
    groupNum = 4;
    wordGroup = [wordList.slice(0,22), wordList.slice(22,44), wordList.slice(44,66), wordList.slice(66,88)];
    console.log(wordGroup);
    nextGroup = 0
    started = false;

    // TODO: add rules page as page -1.
    // BUG: start from 1. 

    InitEachGroup();
}

function InitEachGroup()
{
    currTimer = 10;
    wordID = 0;
    corrCnt = 0;
    passCnt = 0;
    runout = false;
    timeout = false;

    $('#curr_word').html("Ready?");
    $('#timer').html('Timer: ' + currTimer)
    $('#team_info').html(`team ${nextGroup + 1}: correct (${corrCnt}), pass (${passCnt})`);
}

function runCounter() {
    $('#timer').html('Timer: ' + currTimer)
    currTimer -= 1;
    if (currTimer >= 0) {
        if (runout) {
            // End immediately
            return;
        }
        else {
            setTimeout(runCounter, 1000);
        }
    }
    else {
        $('#curr_word').html(`${nextGroup + 1}号队伍：${corrCnt}分`);
        started = false;
        timeout = true;

        // Same for "OK" and "Cancel"
        if (confirm("Time out")) {
            if (nextGroup == 3)
            {
                $('#curr_word').html("游戏结束");
            }
        }
        else {
            if (nextGroup == 3)
            {
                $('#curr_word').html("游戏结束");
            }
        }
    }
}
