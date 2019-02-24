var GameStatus = {
    DESC: 1,
    READY: 2,
    RUNNING: 3,
    END: 4,
};

$(document).ready(function()
{
    console.log("init-songs");
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
                    // First word init
                    NextSong();
                }
                else if (currStatus == GameStatus.RUNNING) {
                    corrCnt += 1;
                    if (corrCnt > 10) {
                        corrCnt = 10;
                    }
                    $('#team_info').html(`${currGroup + 1} 号队伍: ${corrCnt} 分`);
                }
                break;
            case 'Escape':
                currStatus = GameStatus.READY;
                document.getElementById("audio").pause();
                document.getElementById("songs").style.display = 'none';
                document.getElementById("description").style.display = 'block';
                // resume the status from runout / timeout
                // if (currGroup < groupNum - 1) {
                //     // Log the groupScores
                //     groupScores[currGroup] = corrCnt;
                //
                //     currGroup += 1;
                //     InitEachGroup();
                //     return;
                // }
                // else {
                //     groupScores[currGroup] = corrCnt;
                //
                //     // END
                //     $('#curr_song').html("游戏结束");
                //     $('#curr_lyric').html(`1 ~ ${currGroup + 1}号队伍得分: ` + groupScores.join());
                //     $('#curr_song').html("");
                // }
                break;
            default:
                break;
        }
    });
});

function  NextSong()
{
    lyrics = songList[currGroup].split(';')
    $('#curr_song').html((currGroup + 1) + ' - ' + lyrics[0]);
    $('#curr_lyric').html(lyrics.slice(1).join('<br>'));
}

function Init()
{
    songs = '我和我的祖国;1 我和我的祖国 一刻也不能分割;2 无论我走到哪里 都流出一首赞歌;3 我歌唱每一座高山;4 - - - - - - -;5 袅袅炊烟 小小村落 - - - - -;6 你用你那 母亲的脉搏 和我诉说;7 我的祖国和我 - - - - - - -;8 浪是海的赤子 - - - - - - -;9 每当大海在微笑 - - - - - - -;10 我分担着 海的忧愁 分享海的欢乐,同桌的你;1 明天你是否会想起 昨天你写的日记;2 明天你是否还惦记 曾经最爱哭的你;3 老师们都已想不起 猜不出- - - -;4 我也是偶然翻相片 - - - - - - -;5 谁娶了多愁善感的你 - - - - - - -;6 谁把你的长发盘起 谁给你做的嫁衣;7 你从前总是很小心 问我借半块橡皮;8 你也曾无意中说起 - - - - - - -;9 那时候天总是很蓝 - - - - - - -;10 你总说毕业遥遥无期 转眼就各奔东西,一生有你;1 因为梦见你离开 我从哭泣中醒来;2 看夜风吹过窗台;3 你能否感受我的爱;4 等到老去那一天 - - - - - - - -;5 看那些誓言谎言6 随往事 - - - -;7 多少人曾爱慕你年轻时的容颜;8 可知谁愿承受- - - - - - -;9 多少人曾在你生命中来了又还;10 可知一生有你- - - - - - -,老男孩;1 那是我日夜思念深深爱着的人啊;2 到底我该如何表达 她会接受我吗;3 也许永远都不会跟她- - - - -;4 注定我要浪迹天涯 - - - - - -;5 梦想总是遥不可及 是不是应该放弃;6 花开花落又是一季 春天啊- - - -;7 青春如同奔流的江河 一去不回来不及道别;8 只剩下麻木的我 - - - - - - - -;9 看那满天飘零的花朵 - - - - - - - - -;10 有谁会记得这世界它来过,光阴的故事;1 春天的花开秋天的风;2 以及冬天的落阳;3 忧郁的青春年少的我;4 曾经- - - - - -;5 风车在四季轮回的歌里;6 - - - - - -;7 风花雪月的诗句里;8 - - - - - - -;9 流水它带走光阴的故事 - - - - - -;10 就在那多愁善感而初次 - - - - -,打靶归来;1 日落西山红霞飞;2 战士打靶把营归 ---;3 胸前红花映彩霞 - - - - - - -;4 Mi So La Mi So - - - - -;5 愉快的歌声满天飞;6 歌声飞到北京去;7 毛主席听了心欢喜;8 夸咱们歌儿唱的好 - - - - - - - -;9 - - - - - - - - - -;10 夸咱们枪法数第一,最炫民族风;1 苍茫的天涯是我的爱 绵绵的青山脚下花正开;2 什么样的节奏是最呀最摇摆 什么样的歌声- - - - -;3 弯弯的河水 - - - -;4 - - - - - - - - - -;5 火辣辣的歌谣是我们的期待;6 一路边走边唱才是最自在;7 我们要唱就要唱得最痛快;8 你是我天边 - - - - -;9 让我用心把你留下来（留下来）;10 悠悠的唱着最炫的民族风 - - - - - - - - -,青花瓷;1 素胚勾勒出青花笔锋浓转淡 瓶身描绘的牡丹一如你初妆;2 冉冉檀香透过窗心事我了然 宣纸上走笔至此搁一半;3 釉色渲染仕女图韵味被私藏 而你嫣然的一笑- - - - -;4 你的美一缕飘散 - - - - - - - - -;5 天青色等烟雨 - - - - -;6 炊烟袅袅升起 隔江千万里;7 在瓶底书刻隶仿前朝的飘逸 就当我为遇见你伏笔;8 天青色等烟雨 - - - - -;9 月色被打捞起 - - - - -;10 如传世的青花瓷自顾自美丽 你眼带笑意';
    groupNum = 8;

    songList = songs.split(',');
    console.log(songList.length);

    currGroup = -1;
    groupScores = [0, 0, 0, 0, 0, 0, 0, 0];

    currStatus = GameStatus.DESC;

    document.getElementById("songs").style.display = 'none';
}

function GameStart()
{
    currStatus = GameStatus.READY;
    // Remove description
    document.getElementById("description").style.display = 'none';
    document.getElementById("songs").style.display = 'block';

    currGroup = 0;
    InitEachGroup();
}

function InitGroup(groupNum)
{
    GameStart();
    currGroup = groupNum;

    document.getElementById("audio_src").src = `audio/song${currGroup + 1}.mp3`;
    document.getElementById("audio").load();
}

function InitEachGroup()
{
    corrCnt = 0;

    $('#curr_song').html('Ready?');
    $('#curr_lyric').html('-- --');

    currStatus = GameStatus.READY;
    // $('#team_info').html(`${currGroup + 1} 号队伍: ${corrCnt} 分`);
}
