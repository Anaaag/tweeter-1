// Fake data taken from initial-tweets.json
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

$(document).ready(() => {
  const $tweetForm = $("#tweet-form")
  $tweetForm.on("submit", function(event) {
  event.preventDefault();
  const tweetText = $(this).serialize();
  $.post("/tweets", tweetText);
  });


  const createTweetElement = function(tweet) {
    const name = tweet.user.name
    const avatars = tweet.user.avatars
    const handle = tweet.user.handle
    const text = tweet.content.text
    const timeAgo = tweet.created_at
    const htmlElement = `
    <article class="tweet">
      <header>
        <span>
          <img src=${avatars}>
          <span>${name}</span>
        </span>
        <span>${handle}</span>
     </header>
      <p>${text}</p>
      <footer>
        <span>${timeAgo}</span>
        <span>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </span>
      </footer>
    </article>
    `
    return htmlElement;
  }

  
  
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(`#tweets-container`).append($tweet);
  
    }
    
}
renderTweets(data);




















});

