/*
    (PLEASE DO NOT DELETE THIS HEADER OR CREDIT!)

    User customizable settings below!
    Please refer to my guide over on https://virtualobserver.moe/ayano/comment-widget if you're confused on how to use this.
    The IDs at the top are a requirement but everything else is optional!
    Do not delete any settings even if you aren't using them! It could break the program.

    After filling out your options, just paste this anywhere you want a comment section
    (But change the script src URL to wherever you have this widget stored on your site!)

        <div id="c_widget"></div>
        <script src="comment-widget.js"></script>

    Have fun! Bug reports are encouraged if you happen to run into any issues.
    - Ayano (https://virtualobserver.moe/)
    * SPECIAL THANKS to espy (https://espy.world) with the code to do custom "styles" for the guestbook!!!!
    * Anything marked with ESPY is theirs.  
*/

// The values in this section are REQUIRED for the widget to work! Keep them in quotes!
const s_formId = '1FAIpQLSf21YnEenlT4fENqdAUaBSBrf4Md1us7za6eDFJVVffxwl73A';
const s_nameId = '1321636848';
const s_websiteId = '1498187766';
const s_textId = '1362742614';
const s_pageId = '234410652';
const s_styleId = '398650354' // Styles
const s_adminId = '613020272'; // Admin
const s_moderatedId = '1330129312';
const s_sheetId = '1XoQPrGuYusEcxAYCfsfhLHvX7x86qYx_kOE7MiTPuyU';


// The values below are necessary for accurate timestamps, I've filled it in with EST as an example
const s_timezone = -5; // Your personal timezone (Example: UTC-5:00 is -5 here, UTC+10:30 would be 10.5)
const s_daylightSavings = false; // If your personal timezone uses DST, set this to true
// For the dates DST start and end where you live: [Month, Weekday, which number of that weekday, hour (24 hour time)]
const s_dstStart = ['March', 'Sunday', 2, 2]; // Example shown is the second Sunday of March at 2:00 am
const s_dstEnd = ['November', 'Sunday', 1, 2]; // Example shown is the first Sunday of November at 2:00 am

// Misc - Other random settings
const s_commentsPerPage = 16; // The max amount of comments that can be displayed on one page, any number >= 1 (Replies not counted)
const s_maxLength = 250; // The max character length of a comment
const s_maxLengthName = 18; // The max character length of a name
const s_commentsOpen = true; // Change to false if you'd like to close your comment section site-wide (Turn it off on Google Forms too!)
const s_collapsedReplies = true; // True for collapsed replies with a button, false for replies to display automatically
const s_longTimestamp = false; // True for a date + time, false for just the date

// Word filter - Censor profanity, etc
const s_wordFilterOn = false; // True for on, false for off
const s_filterReplacement = '&#!@'; // Change what filtered words are censored with (**** is the default)
const s_filteredWords = [ // Add words to filter by putting them in quotes and separating with commas (ie. 'heck', 'dang')
    'heck', 'dang'
]

// Text - Change what messages/text appear on the form and in the comments section (Mostly self explanatory)
const s_widgetTitle = 'Leave a comment!';
const s_nameFieldLabel = 'Name';
const s_websiteFieldLabel = 'Website (Optional)';
const s_textFieldLabel = '';
const s_submitButtonLabel = 'send';
const s_loadingText = 'Loading entries...';
const s_noCommentsText = 'No entries yet.';
const s_closedCommentsText = 'Entries are closed temporarily!';
const s_websiteText = "website";
const s_expandRepliesText = 'Show Replies';
const s_leftButtonText = '<<';
const s_rightButtonText = '>>';
const s_stylesCount = 7;
let currStyle = 1;



/*
    DO NOT edit below this point unless you are confident you know what you're doing!
    Everything else is automatic, you don't have to change anything else. ^^
    However, feel free to edit this code as much as you like! Just please don't remove my credit if possible <3
*/


var converter = new showdown.Converter()
DOMPurify.setConfig(
    {
        USE_PROFILES: { html: true },
        FORBID_TAGS: ['style, script'],
        FORBID_ATTR: ['style', 'class', 'aria-hidden']
    }
)

// HTML Form
const v_mainHtml = `
    <div id="c_inputDiv">
      <form id="c_form" onsubmit="c_submitButton.disabled = true; v_submitted = true;" method="post" target="c_hiddenIframe" action="https://docs.google.com/forms/d/e/${s_formId}/formResponse">
        <div id="c_formContent">
          <div id="c_textWrapper" class="c-inputWrapper">

            <textarea name="entry.${s_textId}" id="entry.${s_textId}" required></textarea>
            <input name="entry.${s_moderatedId}" id="entry.${s_moderatedId}" type="hidden" readonly value="false">
            <input name="entry.${s_adminId}" id="entry.${s_adminId}" type="hidden" readonly value="false">
          </div>
      </form>
    </div>
    <div id="c_container"><span class='w-100 block text-center p-2'>Loading...</span></div> `; const v_formHtml = ` <div id="c_imageWrapper" class="c-inputWrapper">
 
    </div>
    <div id="c_formContent">
      <div id="c_textWrapper" class="c-inputWrapper">
      </div>
      <input name="entry.${s_adminId}" id="entry.${s_adminId}" type="hidden" readonly value="false">
      <div id="c_inputFooter" class="gb-footer">
        <input class="c-input c-nameInput gb-name" name="entry.${s_nameId}" id="entry.${s_nameId}" type="text" maxlength="18" required placeholder="name *" autocomplete="off">
        <input class="c-input c-websiteInput gb-extra" name="entry.${s_websiteId}" id="entry.${s_websiteId}" type="url" pattern="https://.*" placeholder="site" autocomplete="off">
        <button type="button" id="c_styleLeft">
            < 
        </button>
        <button type="button" id="c_styleRight">
            >
        </button>
        
      </div>
              <textarea name="entry.${s_textId}" class="entry1" id="entry.${s_textId}" maxlength="250" required placeholder="markdown is supported, please be kind. you can choose a style for your entry by clicking the arrows *"></textarea>
    <div class="w-100 flex justify-end items-end">
            <button id="c_submitButton" name="c_submitButton" type="submit" disabled>${s_submitButtonLabel}</button>
</div>
    </div>
  
`;


// Insert main HTML to page
document.getElementById('c_widget').innerHTML = v_mainHtml;
const c_form = document.getElementById('c_form');
if (s_commentsOpen) {
    c_form.innerHTML = v_formHtml
} else { c_form.innerHTML = "<span class='text-center w-100 block p-2'>Entries are closed.</span>" }

// Initialize misc things
const c_container = document.getElementById('c_container');
let v_pageNum = 1;
let v_amountOfPages = 1;
let v_commentMax = 1;
let v_commentMin = 1;

// Set up the word filter if applicable
let v_filteredWords;
if (s_wordFilterOn) {
    v_filteredWords = s_filteredWords.join('|');
    v_filteredWords = new RegExp(String.raw`\b(${v_filteredWords})\b`, 'ig');
}

// The fake button is just a dummy placeholder for when comments are closed
let c_submitButton;
if (s_commentsOpen) { c_submitButton = document.getElementById('c_submitButton') }
else { c_submitButton = document.createElement('button') }

// Add invisible page input to document
let v_pagePath = window.location.pathname;
const c_pageInput = document.createElement('input');
c_pageInput.value = v_pagePath; c_pageInput.type = 'text'; c_pageInput.style.display = 'none';
c_pageInput.id = 'entry.' + s_pageId; c_pageInput.name = c_pageInput.id;
c_form.appendChild(c_pageInput);

// [ESPY] Add invisible style input to document if guestbook
const c_styleInput = document.createElement('input');
c_styleInput.value = '1';
c_styleInput.type = 'text';
c_styleInput.style.display = 'none';
c_styleInput.id = 'entry.' + s_styleId;
c_styleInput.name = c_styleInput.id;
c_form.appendChild(c_styleInput);


// Add the invisible iFrame to the document for catching the default Google Forms submisson page
let v_submitted = false;
let c_hiddenIframe = document.createElement('iframe');
c_hiddenIframe.id = 'c_hiddenIframe'; c_hiddenIframe.name = 'c_hiddenIframe'; c_hiddenIframe.style.display = 'none'; c_hiddenIframe.setAttribute('onload', 'if(v_submitted){fixFrame()}');
c_form.appendChild(c_hiddenIframe);
c_hiddenIframe = document.getElementById('c_hiddenIframe');


// Initialize styles
const c_styleLeft = document.getElementById("c_styleLeft");
const c_styleRight = document.getElementById("c_styleRight");
c_styleLeft.addEventListener("click", () => {
    if (currStyle == 1) currStyle = s_stylesCount
    else currStyle -= 1
    setStyle(currStyle);
})
c_styleRight.addEventListener("click", () => {
    if (currStyle == s_stylesCount) currStyle = 1
    else currStyle += 1
    setStyle(currStyle);
})


// Set default style
setStyle(1);



// [ESPY] Set guestbook entry style
function setStyle(num) {
    const c_formContent = document.getElementById("c_formContent");
    const c_styleNum = document.getElementById("c_styleNum");
    c_formContent.className = `style_${num}`;
    c_styleInput.value = num;
}


// Fix the invisible iFrame so it doesn't keep trying to load stuff
function fixFrame() {
    v_submitted = false;
    c_hiddenIframe.srcdoc = '';
    getComments(); // Reload comments after submission
    c_confirmation.style.display = 'block'; // [ESPY] Show confirmation after submission

    // [ESPY] Manually clear text input
    if (isGuestbook) {
        c_textInput.innerText = "";
    }
}

// Processes comment data with the Google Sheet ID
function getComments() {
    // Disable the submit button while comments are reloaded
    c_submitButton.disabled;


    // Clear input fields too
    if (s_commentsOpen) {
        document.getElementById(`entry.${s_nameId}`).value = '';
        document.getElementById(`entry.${s_websiteId}`).value = '';
        document.getElementById(`entry.${s_textId}`).value = '';
    }

    // Get the data
    const url = `https://docs.google.com/spreadsheets/d/${s_sheetId}/gviz/tq?`;
    const retrievedSheet = getSheet(url);

    // Do stuff with the data here
    retrievedSheet.then(result => {
        // The data comes with extra stuff at the beginning, get rid of it
        const json = JSON.parse(result.split('\n')[1].replace(/google.visualization.Query.setResponse\(|\);/g, ''));

        // Need index of page column for checking if comments are for the right page
        const isPage = (col) => col.label == 'Page';
        let pageIdx = json.table.cols.findIndex(isPage);

        // Turn that data into usable comment data
        // All of the messy val checks are because Google Sheets can be weird sometimes with comment deletion
        let comments = [];
        if (json.table.parsedNumHeaders > 0) { // Check if any comments exist in the sheet at all before continuing
            for (r = 0; r < json.table.rows.length; r++) {
                // Check for null rows
                let val1;
                if (!json.table.rows[r].c[pageIdx]) { val1 = '' }
                else { val1 = json.table.rows[r].c[pageIdx].v }

                // Check if the page name matches before adding to comment array
                if (val1 == v_pagePath) {
                    let comment = {}
                    for (c = 0; c < json.table.cols.length; c++) {
                        // Check for null values
                        let val2;
                        if (!json.table.rows[r].c[c]) { val2 = '' }
                        else { val2 = json.table.rows[r].c[c].v }

                        // Finally set the value properly
                        comment[json.table.cols[c].label] = val2;
                    }
                    comment.Timestamp2 = json.table.rows[r].c[0].f;
                    comments.push(comment);
                }
            }
        }

        // Check for empty comments before displaying to page
        if (comments.length == 0 || Object.keys(comments[0]).length < 2) { // Once again, Google Sheets can be weird
            c_container.innerHTML = "<span class='text-center w-100 p-2'>There are no comments yet.</span>";
        } else { displayComments(comments) }

        c_submitButton.disabled = false // Now that everything is done, re-enable the submit button
    })
}

// Fetches the Google Sheet resource from the provided URL
function getSheet(url) {
    return new Promise(function (resolve, reject) {
        fetch(url).then(response => {
            if (!response.ok) { reject('Could not find Google Sheet with that URL') } // Checking for a 404
            else {
                response.text().then(data => {
                    if (!data) { reject('Invalid data pulled from sheet') }
                    resolve(data);
                })
            }
        })
    })
}

// Displays comments on page
let a_commentDivs = []; // For use in other functions
function displayComments(comments) {
    // Clear for re-display
    a_commentDivs = [];
    c_container.innerHTML = '';


    // Values for pagination
    v_amountOfPages = Math.ceil(comments.length / s_commentsPerPage);
    v_commentMax = s_commentsPerPage * v_pageNum;
    v_commentMin = v_commentMax - s_commentsPerPage;

    // Main comments (not replies)
    comments.reverse(); // Newest comments go to top
    for (i = 0; i < comments.length; i++) {
        let comment = createComment(comments[i]);


        // Choose whether to display or not based on page number
        comment.style.display = 'none';
        if (i >= v_commentMin && i < v_commentMax) { comment.style.display = 'block' }

        if (comments[i].Pinned == true) {
            c_container.insertBefore(comment, c_container.firstChild);
            a_commentDivs.unshift(document.getElementById(comment.id));
            comment.style.display = 'block';
        } else {
            c_container.appendChild(comment);
            a_commentDivs.push(document.getElementById(comment.id));
        }

        let content = comment.querySelector(".c-content")
        let text = comment.querySelector(".c-text");
        let name = comment.querySelector(".c-name");
        let timestamp = comment.querySelector(".c-timestamp");

        // [ESPY] Set guestbook style
        const commentStyle = comments[i].Style;
        if (commentStyle) {
            comment.classList.add(`style_${commentStyle}`);
        } else {
            comment.classList.add(`style_${(i % (s_stylesCount)) + 1}`)
        }
        comment.classList.add("c-comment")



    }



    // Handle pagination if there's more than one page
    if (v_amountOfPages > 1) {
        let pagination = document.createElement('div');

        leftButton = document.createElement('button');
        leftButton.innerHTML = s_leftButtonText; leftButton.id = 'c_leftButton'; leftButton.name = 'left';
        leftButton.setAttribute('onclick', `changePage(this.name)`);
        if (v_pageNum == 1) { leftButton.disabled = true } // Can't go before page 1
        leftButton.className = 'c-paginationButton';
        pagination.appendChild(leftButton);

        rightButton = document.createElement('button');
        rightButton.innerHTML = s_rightButtonText; rightButton.id = 'c_rightButton'; rightButton.name = 'right';
        rightButton.setAttribute('onclick', `changePage(this.name)`);
        if (v_pageNum == v_amountOfPages) { rightButton.disabled = true } // Can't go after the last page
        rightButton.className = 'c-paginationButton';
        pagination.appendChild(rightButton);

        pagination.id = 'c_pagination';
        c_container.appendChild(pagination);
    }
}

// Create basic HTML comment, reply or not
function createComment(data) {
    let comment = document.createElement('div');

    // Get the right timestamps
    let timestamps = convertTimestamp(data.Timestamp);
    let timestamp;
    if (s_longTimestamp) { timestamp = timestamps[0] }
    else { timestamp = timestamps[1] }

    // Set the ID (uses Name + Full Timestamp format)
    const id = data.Name + '|--|' + data.Timestamp2;
    comment.id = id;




    // Name of user
    let userInfo = document.createElement('div');
    userInfo.className = 'user-info';

    



    // Timestamp
    let time = document.createElement('span');
    time.innerText = timestamp;
    time.className = 'c-timestamp';
    userInfo.appendChild(time);





    let name = document.createElement('span');
    comment.appendChild(name);
    if (data.Website) {
        let site = document.createElement('a');
        site.innerHTML = s_websiteText;
        site.href = data.Website;
        site.className = 'c-site';
        if (data.Moderated == false) {
            site.innerText = '';
        }
        userInfo.appendChild(site);
    }

    comment.appendChild(userInfo);


    let filteredName = data.Name;
    if (s_wordFilterOn) { filteredName = filteredName.replace(v_filteredWords, s_filterReplacement) }
    name.innerText = filteredName;
    name.className = 'c-name';
    if (data.Pinned == true) {
        name.insertAdjacentHTML('beforeend', "<svg class='ml-1' xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' viewBox='0 0 24 24'><path d='M0 0h24v24H0z' fill='none'/><path fill='var(--light)' d='M3.71 21.71L9 16.42l2.29 2.29c.2.2.45.29.71.29s.51-.1.71-.29l2-2a.996.996 0 0 0 0-1.41l-.79-.79l3.59-3.59l.79.79c.39.39 1.02.39 1.41 0l2-2a.996.996 0 0 0 0-1.41l-6-6a.996.996 0 0 0-1.41 0l-2 2a.996.996 0 0 0 0 1.41l.79.79l-3.59 3.59l-.79-.79a.996.996 0 0 0-1.41 0l-2 2a.996.996 0 0 0 0 1.41L7.59 15L2.3 20.29l1.41 1.41Z'/></svg>");
    }
    if (data.Admin == true) {
        name.insertAdjacentHTML('beforeend', " <svg class='mr-4' xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' viewBox='0 0 24 24'><path d='M0 0h24v24H0z' fill='none' /><path fill='var(--light)' d='M17 11c.34 0 .67.04 1 .09V6.27L10.5 3L3 6.27v4.91c0 4.54 3.2 8.79 7.5 9.82c.55-.13 1.08-.32 1.6-.55c-.69-.98-1.1-2.17-1.1-3.45c0-3.31 2.69-6 6-6' /><path fill='var(--light)' d='M17 13c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 1.38c.62 0 1.12.51 1.12 1.12s-.51 1.12-1.12 1.12s-1.12-.51-1.12-1.12s.5-1.12 1.12-1.12m0 5.37c-.93 0-1.74-.46-2.24-1.17c.05-.72 1.51-1.08 2.24-1.08s2.19.36 2.24 1.08c-.5.71-1.31 1.17-2.24 1.17' /></svg> ");
    }

    if (data.Moderated == false) {
        name.innerText = 'Guest'; // Change 'Guest' to whatever you want

    }






    // Website URL, if one was provided


    // Text content
    let text = document.createElement('p');
    let filteredText = data.Text;
    if (s_wordFilterOn) { filteredText = filteredText.replace(v_filteredWords, s_filterReplacement) }
    filteredText = converter.makeHtml(filteredText);
    filteredText = DOMPurify.sanitize(filteredText);
    text.innerHTML = filteredText;
    text.className = 'c-text';
    comment.appendChild(text);

    if (data.Moderated == false) {
        text.innerText = 'This entry is awaiting moderation.'; // Change this value to whatever you want

    }

    return comment;
}

// Makes the Google Sheet timestamp usable
function convertTimestamp(timestamp) {
    const vals = timestamp.split('(')[1].split(')')[0].split(',');
    const date = new Date(vals[0], vals[1], vals[2], vals[3], vals[4], vals[5]);
    const timezoneDiff = (s_timezone * 60 + date.getTimezoneOffset()) * -1;
    let offsetDate = new Date(date.getTime() + timezoneDiff * 60 * 1000);
    if (s_daylightSavings) { offsetDate = isDST(offsetDate) }
    return [offsetDate.toLocaleString(), offsetDate.toLocaleDateString()];
}
// DST checker
function isDST(date) {
    const dstStart = [getMonthNum(s_dstStart[0]), getDayNum(s_dstStart[1]), s_dstStart[2], s_dstStart[3]];
    const dstEnd = [getMonthNum(s_dstEnd[0]), getDayNum(s_dstEnd[1]), s_dstEnd[2], s_dstEnd[3]];

    const year = date.getFullYear();
    let startDate = new Date(year, dstStart[0], 1);
    startDate = nthDayOfMonth(dstStart[1], dstStart[2], startDate, dstStart[3]).getTime();
    let endDate = new Date(year, dstEnd[0], 1);
    endDate = nthDayOfMonth(dstEnd[1], dstEnd[2], endDate, dstEnd[3]).getTime();
    time = date.getTime();

    if (time >= startDate && time < endDate) { date.setHours(date.getHours() - 1) }
    return date;
}
// Thank you to https://stackoverflow.com/questions/32192982/get-a-given-weekday-in-a-given-month-with-javascript for the below function
function nthDayOfMonth(day, n, date, hour) {
    var count = 0;
    var idate = new Date(date);
    idate.setDate(1);
    while ((count) < n) {
        idate.setDate(idate.getDate() + 1);
        if (idate.getDay() == day) {
            count++;
        }
    }
    idate.setHours(hour);
    return idate;
}
// Convert weekday and month names into numbers
function getDayNum(day) {
    let num;
    switch (day.toLowerCase()) {
        case 'sunday': num = 0; break;
        case 'monday': num = 1; break;
        case 'tuesday': num = 2; break;
        case 'wednesday': num = 3; break;
        case 'thursday': num = 4; break;
        case 'friday': num = 5; break;
        case 'saturday': num = 6; break;
        default: num = 0; break;
    }
    return num;
}
function getMonthNum(month) {
    let num;
    switch (month.toLowerCase()) {
        case 'january': num = 0; break;
        case 'february': num = 1; break;
        case 'march': num = 2; break;
        case 'april': num = 3; break;
        case 'may': num = 4; break;
        case 'june': num = 5; break;
        case 'july': num = 6; break;
        case 'august': num = 7; break;
        case 'september': num = 8; break;
        case 'october': num = 9; break;
        case 'november': num = 10; break;
        case 'december': num = 11; break;
    }
    return num;
}

// Handle making replies
const link = document.createElement('a');
link.href = '#c_inputDiv';

// Handle expanding replies (should only be accessible with collapsed replies enabled)
function expandReplies(id) {
    const targetDiv = document.getElementById(`${id}-replies`);
    if (targetDiv.style.display == 'none') { targetDiv.style.display = 'block' }
    else { targetDiv.style.display = 'none' }
}

function changePage(dir) {
    const leftButton = document.getElementById('c_leftButton');
    const rightButton = document.getElementById('c_rightButton');

    // Find directional number
    let num;
    switch (dir) {
        case 'left': num = -1; break;
        case 'right': num = 1; break;
        default: num = 0; break;
    }
    let targetPage = v_pageNum + num;

    // Cancel if impossible direction for safety, should never happen though
    if (targetPage > v_amountOfPages || targetPage < 1) { return }

    // Enable/disable buttons if needed
    leftButton.disabled = false; rightButton.disabled = false;
    if (targetPage == 1) { leftButton.disabled = true } // Can't go before page 1
    if (targetPage == v_amountOfPages) { rightButton.disabled = true } // Can't go past the last page

    // Hide all comments and then display the correct ones
    v_pageNum = targetPage;
    v_commentMax = s_commentsPerPage * v_pageNum;
    v_commentMin = v_commentMax - s_commentsPerPage;
    for (i = 0; i < a_commentDivs.length; i++) {
        a_commentDivs[i].style.display = 'none';
        if (i >= v_commentMin && i < v_commentMax) { a_commentDivs[i].style.display = 'block' }
    }
}


getComments(); // Run once on page load

