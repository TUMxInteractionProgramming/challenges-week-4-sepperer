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
 * @param channelObject Text which is set
 */
function switchChannel(channelObject) {
    //Log the channel switch
    console.log("Tuning in to channel", channelObject);

    //#7 change the channel name and location location link
    document.getElementById('channel-name').innerHTML = channelObject.name;
    document.getElementById('channel-location').innerHTML = 
        'by <a href="http://w3w.co/' + channelObject.createdBy + '" target="_blank"><strong>' 
        + channelObject.createdBy + '</strong></a>';

    /* #7 set class of star according to objects definition */
    $('#chat h1 i').removeClass('far fas');
    $('#chat h1 i').addClass(channelObject.starred ? 'fas' : 'far');

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelObject.name + ')').addClass('selected');

    /* #7 store current channel */
    currentChannel = channelObject;
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



/**
 * #8 Constructor function for messages 
 * @param text text of message
*/
function Message(text){
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = new Date();
    this.expiresOn = new Date(Date.now() + 15 * 60 * 1000);
    this.text = text;
    this.own = true;
}

/**
 *  #8 Function to send message
 */
function sendMessage()
{
    /* # 8 rework send message */
    var messageObject = new Message($('#messageText').val());
    
    console.log('New Message: ', messageObject);

    /* #8 call sendMessage and append it to messages with scrolling down*/
    var messageElement = createMessageElement(messageObject);
    var scrollHeight = $('#messages').prop('scrollHeight');
    $('#messages').append(messageElement).scrollTop(scrollHeight);

    /* #8 Clear message after sendt */
    $('#messageText').val('');
}

/**
 *  # 8 Function to create string representation of HTML element
 *  @param messageObject object of chat message
 *  @returns html element
 */
function createMessageElement(messageObject)
{
    var expiresIn = Math.round((messageObject.expiresOn - Date.now())/1000/60);

    return '' + 

    '<div class="message' +
        /* # 8 add class own dynamically */
        (messageObject.own ? ' own' : '') + '">' +
        '<h3>' +
            '<a href="http://w3w.co/' + messageObject.createdBy + '" target="_blank">' +
                '<strong>' + messageObject.createdBy + '</strong> ' +
            '</a>' +
            messageObject.createdOn.toLocaleString() + '<em>'+ expiresIn + ' min. left</em>' +
        '</h3>' +
        '<p>' + messageObject.text + '</p>' +
        '<button>+5 min.</button>' +
    '</div>';
}


/**
 * # 8 append channels to channel list
 */
function listChannels()
{
    $('#channels ul').append(createChannelElement(yummy));
    $('#channels ul').append(createChannelElement(sevenContinents));
    $('#channels ul').append(createChannelElement(killerApp));
    $('#channels ul').append(createChannelElement(firstPersonOnMars));
    $('#channels ul').append(createChannelElement(octoberfest));
}


/**
 * # 8 create channel element
 * @param channelObject channelObject to create element for
 * @return jQuery element of channelObject
 */
function createChannelElement(channelObject)
{
    /* #8 Create channel and meta element */
    var channelElement = $('<li>').text(channelObject.name).addClass((currentChannel == channelObject) ? 'selected' : '');
    var channelMeta = $('<span>').addClass('channel-meta').appendTo(channelElement);
    
    /* #8 add elements to meta element */
    $('<i>').addClass(channelObject.starred ?'fas' : 'far').addClass('fa-star').appendTo(channelMeta);
    
    $('<span>').text(channelObject.expiresIn + ' min').appendTo(channelMeta);
    $('<span>').text(channelObject.messageCount  + ' new').appendTo(channelMeta);

    $('<i>').addClass('fas').addClass('fa-chevron-right').appendTo(channelMeta);

    return channelElement;
}