
const quoteContainer = document.getElementById('quote-generator');
const quoteText = document.getElementById('quote');
const AuthorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuteBtn = document.getElementById('mnew-quote');
const loader = document.getElementById('loader');




let apiQuotes = [];


// show loading

function loadings (){

    loader.hidden = false;

    quoteContainer.hidden = true;
}


// hide loading

function complete (){
    quoteContainer.hidden = false;
    loader.hidden = true;

}

// show new qute

function newQuote()

{
    loadings()
    
    //  pick a random quote from apiQuotes array

    const quote = apiQuotes [Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);
    // check if author is blank and replace with "unknown"

    if (!quote.author) {
        AuthorText.textContent = 'Unknown'
    } else
    {
        AuthorText.textContent = quote.author;
    }

    // check the quote lenght to determine styling

    if ( quote.text.length > 50 )
    {
        quoteText.classList.add ('long-quote');
    }
    else
    {
        quoteText.classList.remove ('long-quote');
    }

    // set quote, hide loader
    
    quoteText.textContent = quote.text;

    complete ();
    
}

// Get Quotes from API

async function getQuotes() {

    loadings ();
    
    const apiUrl = 'https://type.fit/api/quotes';

    try {

        const response = await fetch (apiUrl);
        // ta zmienna nie bedzie fetchowana dopoki nie bedzie danych w api

        apiQuotes = await response.json();
        // bierzemy z bazy danych dane i sa one w stringu, dlatego trzeba je odebrac jako jason object
        // console.log(apiQuotes);

        newQuote();

        

    }

    catch (error){

        alert ("error");
        // catch error here
    }
}

//  tweet quote

function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${AuthorText.textContent}`;

    window.open(twitterUrl, '_blank');
}

// Event listeners

newQuteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load

getQuotes();


