// storage.js
// One place that handles all localStorage reading and writing
// Every other JS file will use these functions instead of
// touching localStorage directly

function storageSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function storageGet(key) {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

function storageRemove(key) {
  localStorage.removeItem(key)
}

function storageClear() {
  localStorage.clear()
}

// Add one item into an array stored under a key
function storageAppend(key, newItem) {
  const existing = storageGet(key) || []
  existing.push(newItem)
  storageSet(key, existing)
}

// Update one item inside a stored array by its id
function storageUpdate(key, id, updatedData) {
  const existing = storageGet(key) || []
  const index = existing.findIndex(function(item) {
    return item.id === id
  })
  if (index !== -1) {
    existing[index] = Object.assign({}, existing[index], updatedData)
    storageSet(key, existing)
  }
}

// Delete one item from a stored array by its id
function storageDelete(key, id) {
  const existing = storageGet(key) || []
  const filtered = existing.filter(function(item) {
    return item.id !== id
  })
  storageSet(key, filtered)
}