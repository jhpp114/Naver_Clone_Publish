const STOCK_API_KEY = `bsgf0afrh5r8gpgm5png`;
// DOM Elements
const COMPANY_IMG = document.querySelector('.stock_name_img');
const COMPANY_TICKER = document.querySelector('.stock_ticker');
const COMPANY_STOCK_OPEN = document.querySelector('.stock_open');
const COMPANY_STOCK_CURRENT = document.querySelector('.stock_current');
const COMPANY_STOCK_HIGH = document.querySelector('.stock_high');
const COMPANY_STOCK_LOW = document.querySelector('.stock_low');

// function call
generate_stock_data();

// functions 
function getCompanyName() {
    const companies = [
        'IBM'
    ,   'BA'
    ,   'BAC'
    ,   'BABA'
    ,   'AAPL'
    ,   'AMZN'
    ];
    return companies;
};

async function generate_stock_data() {
    let company = getCompanyName();
    let index = 0;
    setInterval(async ()=>{
        try {
            const responses =  Promise.all([
                fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${company[index]}&token=${STOCK_API_KEY}`)
                .then(response => response.json())
            ,   fetch(`https://finnhub.io/api/v1/quote?symbol=${company[index]}&token=${STOCK_API_KEY}`)    
                .then(response => response.json())
            ]);
            let data = await responses;
            //console.log(data);
            let company_name = data[0].name;
            let company_logo = data[0].logo;
            let company_ticker = data[0].ticker;
            let stock_open_price = data[1].o;
            let stock_current_price = data[1].c;
            let stock_high_price = data[1].h.toString().substring(0,6);
            let stock_low_price = data[1].l.toString().substring(0,6);
            COMPANY_IMG.innerHTML = `<img src="${company_logo}" width="60px"> <p>Company: ${company_name} </p>`;
            COMPANY_TICKER.textContent = `Ticker: ${company_ticker}`;
            COMPANY_STOCK_OPEN.textContent = `Open Price at $${stock_open_price}`;
            COMPANY_STOCK_CURRENT.textContent = `Current Price at $${stock_current_price}`;
            COMPANY_STOCK_HIGH.textContent = `Today's Highest Price at $${stock_high_price}`;
            COMPANY_STOCK_LOW.textContent = `Today's Lowest Price at $${stock_low_price}`;
            if (index < company.length - 1) {
                index++;
            } else {
                index = 0;
            }
            // return responses;
            // return resultJson;
        } catch (error) {
            console.log(error);
        }
    }, 4000);
}
