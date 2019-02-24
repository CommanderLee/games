function GoBack() {
    top.location.href = "index.html";
}

function ToggleHit(player, num) {
    newScore = 0;
    if (team_scores[player][num] > 0) {
        newScore = 0;
    }
    else {
        if (num == 0) {
            newScore = 10;
        }
        else if (num == 3) {
            newScore = 20;
        }
        else {
            newScore = 5;
        }
    }

    team_scores[player][num] = newScore;
    
}

$(document).ready(function()
{
    console.log("init-sports");

    team_scores = [[0,0,0,0], [0,0,0,0], [0,0,0,0]];
});
