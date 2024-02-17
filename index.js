const { Telegraf } = require('telegraf');
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const PRIVATE_GROUP_ID = process.env.PRIVATE_GROUP_ID;

const bot = new Telegraf(BOT_TOKEN);

// Handler for compressed photos
bot.on('photo', async (ctx) => {
  console.log('Handle compressed photo');
  const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
  const caption = ctx.message.caption ? `${ctx.message.caption}\n` : '';
  await ctx.telegram.sendPhoto(PRIVATE_GROUP_ID, fileId, {
    caption: `${caption}Photo from ${getUsername(ctx.from)}`,
  });
  await ctx.react('👍');
});

// Handler for non-compressed photos sent as documents
bot.on('document', async (ctx) => {
  console.log('Handle non-compressed photo');
  if (ctx.message.document && ctx.message.document.mime_type.startsWith('image/')) {
    const fileId = ctx.message.document.file_id;
    const caption = ctx.message.caption ? `${ctx.message.caption}\n` : '';
    await ctx.telegram.sendDocument(PRIVATE_GROUP_ID, fileId, {
      caption: `${caption}Non-compressed photo from ${getUsername(ctx.from)}`,
    });
    await ctx.react('👍');
  }
});

// Handler for videos
bot.on('video', async (ctx) => {
  console.log('Handle video');
  const fileId = ctx.message.video.file_id;
  const caption = ctx.message.caption ? `${ctx.message.caption}\n` : '';
  await ctx.telegram.sendVideo(PRIVATE_GROUP_ID, fileId, {
    caption: `${caption}Video from ${getUsername(ctx.from)}`,
  });
  await ctx.react('👍');
});

console.log('Bot launched');

bot.launch();

function getUsername(from) {
  const { username, first_name, last_name } = from || {};
  const result = `${first_name}${last_name ? ' ' + last_name : ''}${username ? ' (@' + username + ')' : ''}`;
  return result.trim();
}
