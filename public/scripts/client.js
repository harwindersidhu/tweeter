/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  /**
   * 
   * @param {*} tweetData This is tweet object containing all information about tweet
   * @returns DOM created from given tweet object
   */
  const createTweetElement = function(tweetData) {
    const tweet = `
      <article class="tweet-container">
        <header>
          <section class="UserAvatarAndName">
            <img src="${tweetData.user.avatars}">
            <h4>${tweetData.user.name}</h4>
          </section>
          <section class="UserHandle">
            <h4>${tweetData.user.handle}</h4>
          </section>
        </header>
        <p>${escape(tweetData.content.text)}</p>
        <footer>
          <section class="createdAt">
            <span>${timeago.format(tweetData.created_at)}</span>
          </section>
          <section class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </section>
        </footer>
      </article>
    `;

    return tweet;
  };
  

  /**
   * Given the arrays of tweets objects, it loop through each tweet object to make DOM from that tweet 
   * and then appends to tweets-container DOM element.
   */
  const renderTweets = function(tweets) {
    // loops through tweets
    tweets.slice().reverse().forEach(tweetData => {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    });
  };
  

  /**
   * This function loads tweet in tweets-container DOM element
   * @param {*} pageRefreshed Boolean value that tells page is refreshed or not
   */
  const loadtweets = function(pageRefreshed) {
    $.ajax("/tweets", { method: 'GET' })
      .then(function(data) {
        if (pageRefreshed) {
          renderTweets(data);
        } else {
          const $tweet = createTweetElement(data[data.length-1]);
          $('#tweets-container').prepend($tweet);
        } 
      });
  };

  loadtweets(true);

  /**
   * Ajax function to handle new posted tweet
   */
  $("#addTweetForm").submit(function(event) {
    if (!($("#tweet-text").val().length)) {
      $("#error").html("<i class='fa-solid fa-triangle-exclamation'></i> Tweet can not be a empty string. <i class='fa-solid fa-triangle-exclamation'></i>").css({"display": "block"});
      // alert("Tweet can not be empty string.")
    } else if ($("#tweet-text").val().length > 140) {
      $("#error").html("<i class='fa-solid fa-triangle-exclamation'></i> Too long. Please respect our arbitrary limit of 140 characters. <i class='fa-solid fa-triangle-exclamation'></i>").css({"display": "block"});
      // alert("Tweet can not exceeds 140 characters.")
    } else {
      $("#error").html("").css({"display": "none"});
      let tweet = $(this).serialize();
      
      $.ajax("/tweets", { method: 'POST', data: tweet })
        .then(function(data) {
          $("#tweet-text").val("");
          $("#addTweetForm").find("output").val(140).css({"color": "#545149"});
          loadtweets(false);
      });
    }
    event.preventDefault();
  })

  /**
   * If form to post new tweet is hidden, clicking createNewTweet button will make the form visible,
   * if form was already visible, clicking this button will hide this form.
   */
  $("#createNewTweet").click(function() {
    if($(".new-tweet").is(":visible")) {
      $(".new-tweet").slideUp("slow");
    } else {
      $(".new-tweet").slideDown("slow");
      $("#tweet-text").focus();
    } 
  });

  /**
   * If page is scrolled down, the createNewTweet button will be hidden and scrollToTopButton will be visible,
   * if page is scrolled to top, scrollToTopButton will be hidden and createNewTweet button will be visible.
   */
  $(document).scroll(function() {
    if ($(window).scrollTop() > 0) {
      $("#scrollToTopButton").css({"display": "block"});
      $(".navRightDiv").css({"display": "none"});
    } else {
      $("#scrollToTopButton").css({"display": "none"});
      $(".navRightDiv").css({"display": "flex"});
    }
    
  });

  /**
   * Page will be scrolled back to top, after clicking scrollToTopButton which is fixed at bottom right corner of window.
   */
  $("#scrollToTopButton").click(function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    $("#tweet-text").focus();
  });
});
