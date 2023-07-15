export const buttons = {
  start: '/start',
  help: '/help',
  subscribe: '/subscribe',
  description: '/description',
  location: 'Send Location',
};

export const sendMsg = {
  onStartMsg: `Welcome, I'm subscriber bot. If you need help type /help`,
  onHelpMsg: `Following bot commands`,
  onTimeMsg: `You have subscribed bot successfully.`,
  onSubscribeMsg: `If you want subscribe please send me a location`,
  onDescribeMsg: `Hello I am weather bot and I can give you daily forecast on time`,
  onLocationMsg: `Great, Now input a time (Format: HH:MM)`,
};

export const receivedMsg = {
  description: '/description',
  subscribe: '/subscribe',
  regExp: /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/,
};

export const randomMsgArr = [
  `I got no time to guess &#x1F620. \nSo say it, What is it you want from me?`,
  `Oh, Com'on &#x1F628`,
  `What the hell?! &#x1F631`,
  `If you can't speak leave me alone &#x1F620`,
  `I'm trying to be patient... \nI need to breath &#x1F624`,
  `Please... God help me &#x1F926`,
  `Fuck of &#x1F595 \nSorry &#x1F614 I lost my temper`,
  `I'm not here &#x1F910`,
  `Okay... &#x1F928, I give you one more chance`,
  `You bitch :(`,
];
