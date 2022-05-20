/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
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
        <p>${tweetData.content.text}</p>
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
  }
  
  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweetData of tweets) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    } 
  }
  
  const loadtweets = function() {
    $.ajax("/tweets", { method: 'GET' })
      .then(function(data) {
        console.log(data);
        renderTweets(data);
      })
  }

  loadtweets();

  $("#addTweetForm").submit(function(event) {
    let tweet = $(this).serialize();
    console.log(tweet);
    
    $.ajax("/tweets", { method: 'POST', data: tweet })
      .then(function(data) {
        console.log("Data: " + data);
      });

    event.preventDefault();
  })
});
