async function handleRequest(request) {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const uniqueId = pathParts[1];  // The unique ID from the URL

  if (!uniqueId) {
    return new Response("Unique ID is missing.", { status: 400 });
  }

  try {
    // Check if the key exists in KV storage
    const storedData = await KEY_STORE.get(uniqueId, "json");

    if (storedData) {
      // Return the existing key if found
      return new Response(JSON.stringify({ key: storedData.key }), { status: 200 });
    }

    // Generate a new key if no key exists for the ID
    const newKey = generateRandomKey();
    const expirationTime = new Date().getTime() + 86400000;  // 24 hours

    const keyData = {
      key: newKey,
      expirationTime: expirationTime
    };

    // Store the new key in KV storage
    await KEY_STORE.put(uniqueId, JSON.stringify(keyData));

    return new Response(JSON.stringify({ key: newKey }), { status: 200 });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}

function generateRandomKey() {
  return Math.random().toString(36).substring(2, 15);
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
