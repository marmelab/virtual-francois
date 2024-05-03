import fetch, {Response} from 'node-fetch';

const payloadDefault = {
  "tts_provider": "GOOGLE_TTS",
  "selected_model": "Wav2Lip",
  "input_face": "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/940a034c-0891-11ef-9fa0-02420a0001f3/React%20admin%20in%20Next%20js%20cut.mp4",
};

const payloadElvenLabs = {
    "tts_provider": "ELEVEN_LABS",
    "elevenlabs_voice_id": "aRbnx8H4l6WrxHI6iBBS",
    "elevenlabs_api_key": process.env["ELEVEN_LABS_API_KEY"],
    "elevenlabs_model": "eleven_multilingual_v2",
  };

export async function gooeyAPI(text : string): Promise<{video?: unknown, error?: string | Response}> {
const mode  = process.env["USE_ELEVEN_LABS"] === 'true' && process.env["ELEVEN_LABS_API_KEY"] ? 'ELEVEN_LABS' : 'DEFAULT';

try {
const response = await fetch("https://api.gooey.ai/v2/LipsyncTTS/", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env["GOOEY_API_KEY"],
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        ...payloadDefault, 
        ...(mode === 'ELEVEN_LABS' ? payloadElvenLabs : {}),
        text_prompt: text
    }),
  });

  if (!response.ok) {
    console.error('API answered with error');
    console.log(response.status, response.statusText);
    const result = await response.json();
    console.log(result);
    return {error: 'API_REJECT_ERROR', video:result };
  }

  const result = await response.json();
  console.log(response.status, result);
  return {video: result};
}   catch (error: unknown) {
    console.error(error);
    if ((error as { code: string}).code === 'ENOTFOUND') {

        return {error: 'ADRESS_NOT_FOUND'}
    }
    else {
        return {error: 'SERVER_ERROR'};
    }
}
}
