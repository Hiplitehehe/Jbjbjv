addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const pathParts = url.pathname.split('/')
  const uniqueId = pathParts[1]  // The random ID from the URL, e.g., "abc123xyz"

  if (!uniqueId) {
    return new Response("Missing unique identifier.", { status: 400 })
  }

  const storedData = await KEY_STORE.get(uniqueId, "json")

  if (storedData) {
    const currentTime = new Date().getTime()
    
    if (currentTime >= storedData.expirationTime) {
      // Key expired
      await KEY_STORE.delete(uniqueId)
      return new Response("This key has expired and is no longer valid.", { status: 410 })
    }

    // If the key exists and is still valid, return it
    return new Response(`Your key is: ${storedData.key}`, { status: 200 })
  }

  // If no key exists, generate a new one (but only once)
  const newKey = generateRandomKey()
  const expirationTime = new Date().getTime() + 86400000  // 24 hours in milliseconds

  const keyData = {
    key: newKey,
    expirationTime: expirationTime
  }

  // Store the new key data in KV storage (first time only)
  await KEY_STORE.put(uniqueId, JSON.stringify(keyData))

  return new Response(`Your unique key is: ${newKey}. It will expire in 24 hours.`, { status: 200 })
}

function generateRandomKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const keyLength = 16

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}
