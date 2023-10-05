import { default as axios } from "axios";

const VALIDATE_URL = 'https://lens-pwa-api.veryfi.com/rest/validate_partner';
const CLIENT_ID = 'vrfrscMd4ICwS1fwmSUT18Vgp3cDHc3OAi9K6ZP';


async function getSession(request, response) {
    const session = await getVeryfiSession(CLIENT_ID);
    response.send(session);
  }
  
  async function getVeryfiSession(clientId) {
    return await axios.post(
      VALIDATE_URL,
      {},
      {
        headers: {
          'CLIENT-ID': clientId,
        },
      }).then((response) => {
        return {
          session: response.data.session
        }
      }).catch((error) => error);
  }
  