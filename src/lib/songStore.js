import { writable } from "svelte/store";

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const api_url = import.meta.env.VITE_SPOTIFY_API_URL;

const base_client = btoa(`${client_id}:${client_secret}`);
export const access_token = writable("");

function getCookieToken() {
  return document.cookie.split(";")[0]?.split("=")[1]
}

function isExpired() {
  const expire = parseInt(document.cookie.split(";")[1]?.split("=")[1])
  return (expire - (new Date().getHours())) !== 0
}


export async function getAccessToken() {

  // if (!isExpired()) {
  //   if (getCookieToken() !== null) {
  //     access_token.set(getCookieToken());
  //   }
  // } else {

    console.log("Requesting access token......")
    const data = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base_client}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    }).then((res) => res.json());
    document.cookie = `expire=${new Date().getHours()};  SameSite=Strict; Secure`;
    document.cookie = `token=${data.access_token};  SameSite=Strict; Secure`;
    access_token.set(data.access_token);
}
