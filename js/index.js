async function handleRequest(request) {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const uniqueId = pathParts[1];  // The random ID from the URL

  if (!uniqueId) {
    return new Response("Missing unique identifier.", { status: 400 });
  }

  try {
    // Check if the key already exists in KV storage
    const storedData = await KEY_STORE.get(uniqueId, "json");

    if (storedData) {
      const currentTime = new Date().getTime();

      // If the key has expired, delete it and let the user know
      if (currentTime >= storedData.expirationTime) {
        await KEY_STORE.delete(uniqueId);  // Delete expired key
        return new Response("This key has expired and is no longer valid.", { status: 410 });
      }

      // If the key is still valid, return it
      return new Response(JSON.stringify({ key: storedData.key }), { status: 200 });
    }

    // If no key exists, generate a new one (only once per unique ID)
    const newKey = generateRandomKey();
    const expirationTime = new Date().getTime() + 86400000;  // 24 hours in milliseconds

    const keyData = {
      key: newKey,
      expirationTime: expirationTime
    };

    // Store the new key data in KV storage (first time only)
    await KEY_STORE.put(uniqueId, JSON.stringify(keyData));

    return new Response(JSON.stringify({ key: newKey }), { status: 200 });
  } catch (err) {
    return new Response(`Error processing request: ${err.message}`, { status: 500 });
  }
}
