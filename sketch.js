//array of Date objects containing the matches in ascending order, i.e. match 1 first, 18 seconds, 145 third etc.
let times = [], matches = [], teams = [];
let eventKey = "2019mdowi";
let repeater1, repeater2;
let userTeam = "3339";
let online = true;

let options = {
    "headers": {
        "X-TBA-Auth-Key":"cmFcFpGZc5fEQUZjabjCkCB6qE61eg433UE7zhXu7eGaE92F9HoFhcZ0AMLEOcyu"
    }
}

let curIndex = 0;

function updateClock() {
    //console.log(curIndex);
    //console.log(times[curIndex]);
    //console.log(new Date().toString());
    while (getDiff(times[curIndex], new Date()) < 0 && curIndex < times.length) {
        curIndex++;
        // console.log(curIndex);
        // console.log(times[curIndex].toString());
    }
    if (curIndex >= times.length) {
        document.getElementById("clock").innerHTML = "No Matches Left";
        document.getElementById("match").innerHTML = "Match: N/A";
    } else {
        // console.log(document.getElementById("time-label"));
        document.getElementById("clock").innerHTML = getDiff(times[curIndex], new Date());
        document.getElementById("match").innerHTML = "Match: " + matches[curIndex];
        for(let i = 0; i < 6; i++) {
            document.getElementById("team"+(String)(i+1)).innerHTML = teams[curIndex][i];
            document.getElementById("team"+(String)(i+1)).setAttribute('href', "https://www.thebluealliance.com/team/"+teams[curIndex][i]);
        }
    }
}

function updateTime() {
    let time = new Date();
    document.getElementById("time").innerHTML= pad(((time.getHours() -1)%12 +1), 2)+":"+pad(time.getMinutes(), 2)+":"+pad(time.getSeconds(),2);
}

function pad(a, b) { return (1e15 + a + "").slice(-b) }

function getDiff(date1, date2) {
    let diff = date1 - date2;
    // console.log(diff);

    if (diff < 0) {
        return -1;
    }
    diff = Math.ceil(diff / 1000);
    let seconds = diff % 60;
    diff -= seconds;
    let minutes = (diff % 3600);
    diff -= minutes;
    minutes /= 60;
    let hours = diff / 3600;
    // console.log("hours: " + hours);
    // console.log("minutes: " + minutes);
    // console.log("seconds: " + seconds);
    return hours + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);
}

function getMatchData () {
    if(online) {
        fetch("https://www.thebluealliance.com/api/v3/event/" + eventKey, options)
        .then(response => response.json())
        .then(json => {
            eventName = json.name; 
            document.getElementById("event").innerHTML = eventName;
        })
        .catch(err => {
            console.log(err);
            console.log("Checking for offline data");
            console.log((data[0] != null).toString());
        });  
    } else {
        document.getElementById("event").innerHTML = eventName;
    }
        
    if(online) {
        fetch("https://www.thebluealliance.com/api/v3/event/" + eventKey + "/matches", options)
        .then(response => response.json())
        .then(json => {
            console.log("Fetching...");
            matches = [];
            times = []
            teams = [];
            let isMatch;
            json.forEach(match => {
                isMatch = false;
                match.alliances.blue.team_keys.forEach(team => {
                    if(team == "frc" + userTeam) {
                        isMatch = true;
                        times.push(new Date(match.predicted_time * 1000));
                        switch(match.comp_level){
                            case "f":
                                matches.push("Finals");
                                break;
                            case "sf":
                                matches.push("Semifinals");
                                break;
                            case "qf":
                                matches.push("Quarter Finals");
                                break;
                            case "qm":
                                matches.push(match.match_number);
                                break;
                            default:
                                break;
                        }
                    }
                });
                match.alliances.red.team_keys.forEach(team => {
                    if(team == "frc" + userTeam) {
                        isMatch = true;
                        times.push(new Date(match.predicted_time * 1000));
                        switch(match.comp_level){
                            case "f":
                                matches.push("Finals");
                                break;
                            case "sf":
                                matches.push("Semifinals");
                                break;
                            case "qf":
                                matches.push("Quarter Finals");
                                break;
                            case "qm":
                                matches.push(match.match_number);
                                break;
                            default:
                                break;
                        }
                    }
                });
                if(isMatch) {
                    let matchTeams = [];
                    match.alliances.red.team_keys.forEach(team => matchTeams.push(team.substring(3)));
                    match.alliances.blue.team_keys.forEach(team => matchTeams.push(team.substring(3)));
                    matchTeams.push((match.comp_level == "qm")?match.match_number:match.comp_level);
                    teams.push(matchTeams);
                    //console.log(matchTeams);
                }
            });
            sortArrays();
            console.log(matches);
            console.log(times);
            console.log(teams); 
        })
        .catch(err => {
            console.log(err);
            repeater2 = setTimeout(repeat2, 900000);
        });
    }   
    
    if(data[0] != null && !online) {
        matches = [];
        times = []
        teams = [];
        let isMatch;
        data.forEach(match => {
            isMatch = false;
            match.alliances.blue.team_keys.forEach(team => {
                if(team == "frc" + userTeam) {
                    isMatch = true;
                    times.push(new Date(match.predicted_time * 1000));
                    switch(match.comp_level){
                        case "f":
                            matches.push("Finals");
                            break;
                        case "sf":
                            matches.push("Semifinals");
                            break;
                        case "qf":
                            matches.push("Quarter Finals");
                            break;
                        case "qm":
                            matches.push(match.match_number);
                            break;
                        default:
                            break;
                    }
                }
            });
            match.alliances.red.team_keys.forEach(team => {
                if(team == "frc5587") {
                    isMatch = true;
                    times.push(new Date(match.predicted_time * 1000));
                    switch(match.comp_level){
                        case "f":
                            matches.push("Finals");
                            break;
                        case "sf":
                            matches.push("Semifinals");
                            break;
                        case "qf":
                            matches.push("Quarter Finals");
                            break;
                        case "qm":
                            matches.push(match.match_number);
                            break;
                        default:
                            break;
                    }
                }
            });
            if(isMatch) {
                let matchTeams = [];
                match.alliances.red.team_keys.forEach(team => matchTeams.push(team.substring(3)));
                match.alliances.blue.team_keys.forEach(team => matchTeams.push(team.substring(3)));
                matchTeams.push((match.comp_level == "qm")?match.match_number:match.comp_level);
                teams.push(matchTeams);
                //console.log(matchTeams);
            }
        });
        sortArrays();
        console.log("matches:" + matches.toString());
        console.log("times:" + times.toString());
        console.log("teams:" + teams.toString());
        return;
    }
}

function init(event, team) {
    eventKey = event;
    userTeam = team;
    console.log("initialized");
    repeat1();
    repeat2();
    times = [];
    matches = [];
    teams = [];
}

function repeat1() {
    updateClock();
    updateTime();
    repeater1 = setTimeout(repeat1, 1000);
}

function repeat2() {
    getMatchData();
    repeater2 = setTimeout(repeat2, 300000);
}

function addMatch(matchTeams, matchTime, matchNum ) {
    let matchTeamsP = matchTeams;
    matchTeamsP.push(matchNum);
    teams.push(matchTeamsP);
    times.push(matchTime);
    matches.push(matchNum);
    console.log("Match added");
    console.log(teams);
    sortArrays();

}

function sortArrays () {
    matches.sort((a,b) => {
        if(a === "Finals")
            return 1;
        else if(a === "Semifinals" && b != "Finals")
            return 1;
        else if(a === "Quarter Finals" && b != "Finals" && b != "Semifinals")
            return 1
        else if(b != "Finals" && b != "Semifinals" && b != "Quarter Finals" && a>b) 
            return 1
        return -1;
    });
    times.sort((a,b) => a-b);
    teams.sort((a,b) => {
        if(a[6] === "f")
            return 1;
        else if(a[6] === "sf" && b[6] != "f")
            return 1;
        else if(a[6] === "qf" && b[6] != "f" && b[6] != "sf")
            return 1
        else if(b[6] != "f" && b[6] != "sf" && b[6] != "qf" && a[6]>b[6]) 
            return 1
        return -1;
    });
}

function setTime (match, newTime) {
    let index;
    for(let i = matches.length - 1; i >= 0; i++) {
        if(matches[i] == match) {
            index = i;
        }
    }
    times[index] = newTime;
}

function setTeam(team) {
    userTeam = team;
    repeat2();
}