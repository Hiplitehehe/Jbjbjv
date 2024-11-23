addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const pathParts = url.pathname.split('/')

  // Extract the unique identifier (e.g., '298292929')
  const uniqueId = pathParts[1]

  if (!uniqueId) {
    return new Response("Missing unique identifier.", { status: 400 })
  }

  // Check if the key exists in the KV store
  const storedData = await KEY_STORE.get(uniqueId, "json")

  // If data exists, check if the key is expired
  if (storedData) {
    const currentTime = new Date().getTime()

    // If key has expired, delete it and inform the user
    if (currentTime >= storedData.expirationTime) {
      await KEY_STORE.delete(uniqueId)
      return new Response("This key has expired and is no longer valid.", { status: 410 })
    }

    // Return the key to the user, as it is still valid
    return new Response(`Your key is: ${storedData.key}`, { status: 200 })
  }

  // If no data exists, generate a new key and store it with expiration time (24 hours)
  const newKey = generateRandomKey()
  const expirationTime = new Date().getTime() + 86400000  // 24 hours from now

  const keyData = {
    key: newKey,
    expirationTime: expirationTime
  }

  // Store the key with its expiration time in KV
  await KEY_STORE.put(uniqueId, JSON.stringify(keyData))

  // Return the newly generated key to the user
  return new Response(`New key generated: ${newKey}`, { status: 200 })
}

// Function to generate a random alphanumeric key
function generateRandomKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const keyLength = 16  // Length of the random key

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}
