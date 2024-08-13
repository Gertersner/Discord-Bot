const { SlashCommandBuilder } = require('discord.js');
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  StreamType,
} = require('@discordjs/voice');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ffxiv-spooky')
    .setDescription('something dosn\'t feel right'),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply('You need to be in a voice channel to use this command.');
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const audioPlayer = createAudioPlayer();
    connection.subscribe(audioPlayer);

    const mp3FilePath = path.join(__dirname, 'spooky-ffxiv.mp3'); // insert file

    const readStream = fs.createReadStream(mp3FilePath);
    const resource = createAudioResource(readStream, { inputType: StreamType.Arbitrary });

    audioPlayer.play(resource);

    audioPlayer.on('stateChange', (oldState, newState) => {
      if (newState.status === 'idle') {
        connection.destroy();
      }
    });

    audioPlayer.on('error', (error) => {
      console.error('Audio player error:', error);
      connection.destroy();
    });

    interaction.reply('Ugh fine i\'ll play it');
  },
};
