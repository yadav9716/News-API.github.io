// https://dummyapi.io/data/v1/user?limit=10

let source = 'bbc-news';
let apiKey = 'f99a4e7d83aa4ccca60b6bc328283a00';
let newsAccordion = document.getElementById("newsAccordion");
let newsHTML = "";

// For timer
var now = new Date();
var timer = new Date(); 
timer.setHours(0);
timer.setMinutes(0);
timer.setSeconds(1000);
let storeTime = new Date();
let hours;
let minutes;
let seconds;

// For search news
let i = 0;
let time = setInterval(() => {
    timer.setSeconds(timer.getSeconds() - 1);
    // console.log(timer); 
    storeTime = `${timer.getHours()} : ${timer.getMinutes()} : ${timer.getSeconds()}`;
    if(timer.getHours() <= 9){
        hours = "0"+timer.getHours();
    }
    else{
        hours = timer.getHours();
    }
    if(timer.getMinutes() <= 9){
        minutes = "0"+timer.getMinutes();
    }
    else{
        minutes = timer.getMinutes();
    }
    if(timer.getSeconds() <= 9){
        seconds = "0"+timer.getSeconds();
    }
    else{
        seconds = timer.getSeconds();
    }
    countDown.innerHTML = `${hours} : ${minutes} : ${seconds}`
    setTimeout(() => {
        if(hours==0 && minutes==0 && seconds==0){
            // let value = confirm("Your break is over");
            if(confirm("Your break is over")){
                window.close();
            }
            else{
                location.reload();
            }
            // if(value=="reset time"){
                // window.on.reload();
            // }
            // alert("Your break is over.");
        }
    }, 1000);
}, 1000);

let countDown = document.getElementById("countDown");

function getData() {
    url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
    console.log("Started getData")
    fetch(url).then((response)=>{
        console.log("Inside first then");
        return response.json();
    }).then((data)=>{
        console.log("Inside second then");
        let articles = data.articles;
        articles.forEach(function(element, index) {
            let news = `
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="heading${index}">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                            <b>Breaking News ${index+1}: </b> ${element["title"]}
                            </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#newsAccordion">
                            <div class="accordion-body">
                            ${element["content"]}
                            <a href="${element["url"]}" target="_blank">Read more here</a>
                            </div>
                            </div>
                        </div>`
                        newsHTML += news
        })
        newsAccordion.innerHTML = newsHTML;
        // console.log(data.articles)
        // console.log(articles)
    })
}

getData()
