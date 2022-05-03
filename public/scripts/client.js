
$(document).ready(() => {
  const maxChars = 140;
  const $tweetForm = $("#tweet-form")
  $tweetForm.on("submit", function (event) {
    event.preventDefault();
    const $textArea = $(this).find("textarea")
    const tweetText = $textArea.val()
    const $counter = $(this).find("output")
    const escapedText = escape(tweetText);
    if (tweetText !== escapedText) {
      $(".error-message").text("Invalid Input");
      $(".error-line").slideDown(300).slideUp(3000);
      return;
    }
    if (tweetText === "") {
      $(".error-message").text("!!Error Tweet field empty!!");
      $(".error-line").slideDown(300).slideUp(3000);
      return;
      //return alert("Error");
    }
    if (tweetText.length > maxChars) {
      $(".error-message").text("Character Limit Exceeded");
      $(".error-line").slideDown(300).slideUp(3000);
      return;
      // return alert("Error")
    }
    const tweetSerialized = $(this).serialize();
    $.post("/tweets", tweetSerialized)
      .then(() => {
        loadTweets()
        $textArea.val("")
        $counter.val(maxChars)
      })
  });

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };



  const createTweetElement = function (tweet) {
    const name = tweet.user.name
    const avatars = tweet.user.avatars
    const handle = tweet.user.handle
    const text = tweet.content.text
    const timeAgo = timeago.format(tweet.created_at)
    const htmlElement = `
    <article class="tweet">
      <header>
        <span>
          <img src=${avatars}>
          <span>${name}</span>
        </span>
        <span>${handle}</span>
     </header>
      <p>${escape(text)}</p>
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




  const renderTweets = function (tweets) {
    const $tweetsContainer = $(`#tweets-container`)
    $tweetsContainer.html("")
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);

    }

  }

  const loadTweets = function () {
    $.get("/tweets")
      .then((data) => {
        renderTweets(data)
      })
  }

  loadTweets();


});

