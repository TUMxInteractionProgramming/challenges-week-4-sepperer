/* #6 start the #external #action and say hello */
console.log("App is alive");

/** #7 global variable for current channel*/
var currentChannel = sevenContinents;

/** #7 gloabel current location */
var currentLocation = {
    latitude: 48.249438,
    longitude: 11.633385,
    what3words: "gern.saal.stärken"
};


/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channel Text which is set
 */
function switchChannel(channel) {
    //Log the channel switch
    console.log("Tuning in to channel", channel);

    //#7 change the channel name and location location link
    document.getElementById('channel-name').innerHTML = channel.name;
    document.getElementById('channel-location').innerHTML = 
        'by <a href="http://w3w.co/' + channel.createdBy + '" target="_blank"><strong>' 
        + channel.createdBy + '</strong></a>';

    /* #7 set class of star according to objects definition */
    $('#chat h1 i').removeClass('far fas');
    $('#chat h1 i').addClass(channel.starred ? 'fas' : 'far');

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channel.name + ')').addClass('selected');

    /* #7 store current channel */
    currentChannel = channel;
}

/* #6 #liking a channel on #click */
function star() {
    // #7 toggle icon of star
    $('#chat h1 i').toggleClass('fas');
    $('#chat h1 i').toggleClass('far');

    currentChannel.starred = !currentChannel.starred;

    $('#channels li:contains(' + currentChannel.name + ') .fa-star').removeClass('fas far');
    $('#channels li:contains(' + currentChannel.name + ') .fa-star').addClass(currentChannel.starred ? 'fas' : 'far');
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}
