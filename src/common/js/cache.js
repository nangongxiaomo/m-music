import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const MAX_LENGTH = 15
const PLAY_KEY = '播放历史'
const PLAY_MAX_LENGTH = 200
function insertArr(arr, val, compareFunc, maxLen) {
  let index = arr.findIndex(compareFunc)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArr(arr, compareFunc) {
  let index = arr.findIndex(compareFunc)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArr(
    searches,
    query,
    item => {
      return item === query
    },
    MAX_LENGTH
  )
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArr(searches, item => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function savePlayHistory(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArr(
    songs,
    song,
    item => {
      return item.id === song.id
    },
    PLAY_MAX_LENGTH
  )
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlayHistory() {
  return storage.get(PLAY_KEY, [])
}
