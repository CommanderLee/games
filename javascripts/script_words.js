$(document).ready(function()
{
    Init();

    $('#title').click(function(e)
    {
        Init();
    });

    $('ul.ul_menu li').click(function(e)
    {
        map = e.target.id;
        name = "Default";
        // Hide menu
        document.getElementById("menu").style.display = "none";
        // switch(map) {
        //     case "words":
        //         words = "大礼堂;运动会;九字班;清华学堂;猜灯谜;照澜院;毕业证;西大饭厅;图书馆;无问西东;万人食堂;昆明湖;博士后;东区浴室;同方部;酒井;团委;麻辣香锅;元宵;博雅塔;观畴园;新斋;高尔夫;七十周年;麻辣烫;北冰洋;汤圆;自动控制;5G;二维码;葡萄;校园卡;外星人;静斋;金工实习;工字厅;艺术团;大类招生;未名湖;近春园;微波炉;滑溜里脊;学生节;工会俱乐部;清华科技园;成府路;紫荆花;玉兔二号;朱自清;期末考试;马约翰;情人坡;二校门;昆明;科学馆;水木清华;体育馆;流浪地球;新竹;酱肘子;辅导员;卧伍真;飞驰人生;梅竹赛;丁香花;日晷;清华园;电动车;北平市;荷塘;社团;古月堂;紫荆公寓;西门烤翅;奖学金;梅花;北京电影学院;荒岛;共享单车;光华管理学院;桥牌;学生会;学生证;五道口;清华附中;甲所;微积分;桃李园";
        //         wordList = words.split(';');
        //         groupNum = 4;
        //         wordGroup = [wordList.slice(0,22), wordList.slice(22,44), wordList.slice(44,66), wordList.slice(66,88)];
        //         console.log(wordGroup);
        //
        //         name = "Ready?";
        //         document.getElementById("words").style.display = "block";
        //
        //         break;
        //     case "lottery":
        //         // Show actual content
        //         document.getElementById("lottery_detail").style.display = "block";
        //
        //         // $('#description').html("注释：爆破兵营地一刷新就去占领，尽可能多地占领地图下半部分的营地。");
        //         // counterInit = 125;
        //         // rangeInit = 15;
        //         // counterNext = 125;
        //         // rangeNext = 15;
        //         // countdown_time.innerText = "2 : 5";
        //         // mapInfoInit();
        //         break;
        // }

    });
});

function Init()
{
    document.getElementById("words").style.display = "none";
    document.getElementById("lottery_detail").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

function mapInfoInit() {
    currTime = counterInit;
    currRange = rangeInit;
    counterStatus = 0;
    $('#btn_timer').html("开始计时");
    document.getElementById('btn_special').style.visibility = "hidden";
}

function runCounter() {
    countdown_time.innerText = Math.floor(currTime / 60) + " : " + currTime % 60 + "  ±" + currRange;
    currTime -= 1;
    if (currTime > 0) {
        setTimeout(runCounter, 1000);
    }
    else if (currTime == 0) {
        countdown_time.innerText = condition;
        currTime = counterNext;
        currRange = rangeNext;
        counterStatus = 0;
        $('#btn_timer').html("继续计时");
        // Special case: Cursed Hollow
        if (flagCursed == 1) {

            $('#btn_timer').html("拿到贡品，继续计时");
            $('#btn_special').html("诅咒结束，继续计时");
            document.getElementById('btn_special').style.visibility = "visible";
        }
    }
}

function btnPass() {
    document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
}

function btnConfirm() {
    x = document.cookie;

    $('#description').html(x);
}

function timerClick() {
    if (counterStatus == 0) {
        counterStatus = 1;
        $('#btn_timer').html("正在计时...");
        runCounter();
    }
}

function timerSpecialClick() {
    if (flagCursed == 1 && counterStatus == 0) {
        counterStatus = 1;

        // Change the default setting
        currTime = counterNext2;
        currRange = rangeNext2;
        $('#btn_timer').html("正在计时...");
        document.getElementById('btn_special').style.visibility = "hidden";

        runCounter();
    }
}
