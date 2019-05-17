const cheerio = require('cheerio');
const request = require('request-promise');
const Stock = require('.//src/classes/Stock');
const Product = require('./models/product');
const Notify  = require('.//src/classes/Notify');
const Config = require('./config.json');
const options = {
    url: Config.url,
    Headers:{
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
    }
}
async function f(){
    const stockData = await request(options);
    if (!stockData) return err;
    console.log('Getting current stock..');
    let items = getItems(stockData);
    for (x = 0; x < items.length; x++) {
        let funko = new Product({
            name: items[x].name,
            url: items[x].url,
            img: items[x].img
        });
        if (funko) {
            Product.findOne({ name: funko.name }, (err,foundProduct) => {
                if (!foundProduct) {
                    funko.save();
                    Notify.discord(funko.name, funko.url, funko.img);
                } else {
                    console.log("oooga");
                }
            })
        }
    }
}

 async function start() {
    on = setInterval(f ,Config.pollTime)
}

const getItems = (data) => {
    const $ = cheerio.load(data);
    const items = $('.product-tile').map((i , product) =>{
        const currentStock = [];
        const item = $(product).find('.name-link');
        const itemImg = $(product).find('.hover-image');
        let newItem = formatData(item , itemImg);
        currentStock.push(newItem);
        return currentStock;
    }).get();

    return items;
}

const formatData = (data , imgData) =>{
    let itemName = data.text();
    let name = itemName.trim();
    let url = data.attr('href');
    let img = imgData.attr('src');
    let stock = new Stock(name , url , img);
    return stock;
}

const stop =()=>{
    clearInterval(on);
}

module.exports = {start, stop};
 