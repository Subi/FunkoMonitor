const webhook = require('webhook-discord');
const info = 'https://discordapp.com/api/webhooks/562782204707602478/3ACIc_H_cbrKmW1cCm1GPWT5GQKiCLUg6z7RHe04AsU-M7dBPWrasOa0fV3u9L8LIeFP';

const Notify = {};

Notify.discord = (name , url , img) =>{
    const Hook = new webhook.Webhook(info);
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