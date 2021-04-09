import Song from "./Models/Song.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** Collection of Songs from search Results
   * @type {Song[]} */
  songs = []

  // REVIEW  @type is just for intellesense saying hey this an arra treat me like a an array.
  /**Collection of songs from the users Playlist
   * @type {Song[]} */
  playlist = []

  // REVIEW @type is just for intellesense saying hey this an object treat me like a single instance.
  /**Collection of songs from the users Playlist
 * @type {Song} */
  nowPlaying = null
}



export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
