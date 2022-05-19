/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const createTweetElement = function(tweetData) {
    console.log(tweetData);
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
            <span>${tweetData.created_at}</span>
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
      console.log($tweet); 
      $('#tweets-container').append($tweet);
    } 
  }
  
  renderTweets(data);
});
