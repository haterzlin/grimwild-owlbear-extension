const BASE64_URL_PATTERN = /-/g;
const BASE64_URL_UNDERSCORE_PATTERN = /_/g;

const decodeBase64Unicode = encodedValue => {
  const normalized = encodedValue
    .replace(BASE64_URL_PATTERN, "+")
    .replace(BASE64_URL_UNDERSCORE_PATTERN, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binaryString = atob(padded);
  const bytes = Uint8Array.from(binaryString, character => character.charCodeAt(0));

  return new TextDecoder().decode(bytes);
};

export function parseObrReference(search = window.location.search) {
  const encodedReference = new URLSearchParams(search).get("obrref");
  if (!encodedReference) {
    return {
      origin: "",
      roomId: ""
    };
  }

  try {
    const decodedReference = decodeBase64Unicode(encodedReference);
    const [origin = "", roomId = ""] = decodedReference.split(" ");

    return {
      origin,
      roomId
    };
  } catch {
    return {
      origin: "",
      roomId: ""
    };
  }
}
