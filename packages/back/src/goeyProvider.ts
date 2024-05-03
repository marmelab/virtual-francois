import fetch, {Response} from 'node-fetch';

const defaultPrompt = "Salut les nuls. !";

const payloadDefault = {
  "text_prompt": defaultPrompt,
  "tts_provider": "GOOGLE_TTS",
  "selected_model": "Wav2Lip",
  "input_face": "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/940a034c-0891-11ef-9fa0-02420a0001f3/React%20admin%20in%20Next%20js%20cut.mp4",
};

const payloadElvenLabs = {
    "text_prompt": defaultPrompt,
    "tts_provider": "ELEVEN_LABS",
    "selected_model": "Wav2Lip",
    "elevenlabs_voice_id": "aRbnx8H4l6WrxHI6iBBS",
    "elevenlabs_api_key": process.env["ELEVEN_LABS_API_KEY"],
    "elevenlabs_model": "eleven_multilingual_v2",
    "input_face": "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/940a034c-0891-11ef-9fa0-02420a0001f3/React%20admin%20in%20Next%20js%20cut.mp4",
  };

export async function gooeyAPI(text : string): Promise<{video?: unknown, error?: string | Response}> {
try {
  const response = await fetch("https://api.gooey.ai/v2/LipsyncTTS/", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env["GOOEY_API_KEY"],
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        ...(process.env["USE_ELEVEN_LABS"] && process.env["ELEVEN_LABS_API_KEY"] 
            ? payloadElvenLabs 
            : payloadDefault
        ), 
        text_prompt: text
    }),
  });

  if (!response.ok) {
    console.error('API answered with error');
    return {error: 'API_REJECT_ERROR',...response };
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
