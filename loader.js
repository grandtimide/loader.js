const { readdirSync } = require("fs");

const loadCommands = (client, dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const file of commands) {
      const getFileName = require(`../${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);

      console.log(`✅ Commande chargée: ${getFileName.help.name} ! Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);
    };
  });
};


const loadEvents = (client, dir = "./events/") => {
  readdirSync(dir).forEach(dirs => {
    const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
    console.log(events);

    for (const event of events) {
      const evt = require(`../${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];

      client.on(evtName, evt.bind(null, client));
      console.log(`✅ Event chargé!: ${evtName}`);
    };
  });
};

module.exports = {
  loadCommands,
  loadEvents,
}
