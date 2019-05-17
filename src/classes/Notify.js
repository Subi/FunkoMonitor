const webhook = require('webhook-discord');
const Config = require('./../../Config.json');

const Notify = {};

Notify.discord = (name , url , img ,) =>{
    const Hook = new webhook.Webhook(Config.discord.webhook_url);
    let msg = Notify.create(name, url , img);
    Hook.send(msg);
}

Notify.create = (name , url , img) =>{
    const msg = new webhook.MessageBuilder();
    msg.setName('CrimStock');
    msg.setColor("#000");
    msg.addField(name);
    msg.addField(url);
    msg.setImage(img);
    return msg;
}

Notify.discord();

module.exports = Notify;
