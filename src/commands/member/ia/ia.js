// config.js
const PREFIX = '!'; // Substitua pelo seu prefixo desejado

module.exports = {
  PREFIX,
};

// gpt-openai.js
const { PREFIX } = require('./config');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: 'SUA_CHAVE_DE_API_OPENAI', // Substitua pela sua chave de API da OpenAI
});
const openai = new OpenAIApi(configuration);

module.exports = {
  name: 'ia', // Mudado para 'ia' conforme solicitado
  description: 'Comandos de inteligência artificial usando a API da OpenAI!',
  commands: ['ia', 'chatgpt', 'gpt'],
  usage: `${PREFIX}ia <sua pergunta>`,
  handle: async ({ sendSuccessReply, sendWaitReply, args }) => {
    const text = args.join(' '); // Permite frases com múltiplos argumentos

    if (!text) {
      throw new Error('Você precisa me dizer o que eu devo responder!');
    }

    await sendWaitReply();

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo', // Ou outro modelo disponível
        messages: [{ role: 'user', content: text }],
      });

      const responseText = response.data.choices[0].message.content;
      await sendSuccessReply(responseText);
    } catch (error) {
      console.error('Erro ao chamar a API da OpenAI:', error);
      await sendSuccessReply('Ocorreu um erro ao processar sua solicitação.');
    }
  },
};
