const mineflayer = require("mineflayer");
const Movements = require("mineflayer-pathfinder").Movements;
const { GoalNear } = require("mineflayer-pathfinder").goals;

const { prefix, master } = require("../../settings.json");
  const cooldown = [];

/**
 * @param {mineflayer.Bot} bot
 */

module.exports = (bot) => {
  bot.on('chat', function (username, message) {
    if (username === bot.username) return;
    if (!message.startsWith(prefix)) return;

    var args = message.split(' ');
    const cmd = args[0].substring(prefix.length);
    args = args.slice(1);

    if (cmd === 'kit') {
      // change this to whatever you want e.g kit. Usage would be !kit
      if (master.includes(username)) ;
      else if (cooldown.includes(username)) {
        bot.whisper(username, "You're on cooldown. Try again later.");
        return;
      };

    function isShulkerBox(block) {
        return block.name === "pink_shulker_box";
    }

    let block = bot.findBlock({
        matching: isShulkerBox,
        maxDistance: 50,
      });


    if (block) bot.dig(block, false);
    else {
	bot.whisper(username, 'We are out of stock. try again later');
        return;
	}

     bot.whisper(username, 'Please wait. I am getting your kit');

async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 5000)
  });

  let result = await promise; // wait until the promise resolves (*)

  bot.chat(`/tpa ${username}`);
      bot.whisper(username, 'Accept The Request!');
      bot.once('forcedMove', () => {
        bot.chat('/kill');
      });

      cooldown.push(username);
      setTimeout(() => {
        cooldown.splice(cooldown.indexOf(username), 1); // cooldown removed after 3600000ms (1 hour)
      }, 3600000); 

}

f();
    }
  });
};
