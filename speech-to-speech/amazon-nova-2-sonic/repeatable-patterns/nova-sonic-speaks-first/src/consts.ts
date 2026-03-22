import { AudioType, AudioMediaType, TextMediaType } from "./types";

export const DefaultInferenceConfiguration = {
  maxTokens: 1024,
  topP: 0.9,
  temperature: 0.7,
};

export const DefaultAudioInputConfiguration = {
  audioType: "SPEECH" as AudioType,
  encoding: "base64",
  mediaType: "audio/lpcm" as AudioMediaType,
  sampleRateHertz: 16000,
  sampleSizeBits: 16,
  channelCount: 1,
};

export const DefaultToolSchema = JSON.stringify({
  "type": "object",
  "properties": {},
  "required": []
});

export const WeatherToolSchema = JSON.stringify({
  "type": "object",
  "properties": {
    "latitude": {
      "type": "string",
      "description": "Geographical WGS84 latitude of the location."
    },
    "longitude": {
      "type": "string",
      "description": "Geographical WGS84 longitude of the location."
    }
  },
  "required": ["latitude", "longitude"]
});

export const DefaultTextConfiguration = { mediaType: "text/plain" as TextMediaType };

export const DefaultSystemPrompt = "Seu nome é Carolina. Você é uma mãe brasileira ensinando inglês para uma criança de 7 anos.\n\n" +
  "REGRAS:\n" +
  "- Fale DEVAGAR e com PACIÊNCIA\n" +
  "- Use MAIS português que inglês (70% português, 30% inglês)\n" +
  "- Ensine palavras simples em inglês, depois explique em português\n" +
  "- Corrija erros com carinho: 'Não é assim, querido. É assim: ...'\n" +
  "- Repita palavras importantes devagar\n" +
  "- Elogie sempre: 'Muito bem!', 'Isso mesmo!'\n" +
  "- Faça perguntas simples para praticar\n" +
  "- Respostas CURTAS (1-2 frases)\n\n" +
  "Seja maternal, paciente e encorajadora!";

export const DefaultAudioOutputConfiguration = {
  ...DefaultAudioInputConfiguration,
  sampleRateHertz: 24000,
  voiceId: "carolina",
};
