# pit-clock
It's a pit clock

Just open the index.html file in chrome or smth and enjoy

To start a match, you have to run `init("eventKey", teamnumber)` in the console

To add a match, use `addMatch(["red1", "red2", "red3", "blue1", "blue2", "blue3"], new Date(matchTime), "matchLevel")`

The match level should one of the TBA-specified ones, like "f" or "qm"

It's real time, so if the event is over, it won't display matches. However, you can add matches and manipulate time if you feel like it.
