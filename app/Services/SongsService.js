import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    let res = await sandBoxApi.get()
    ProxyState.playlist = res.data.map(song => new Song(song))
    //TODO What are you going to do with this result
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */


  async addSong(id) {
    ProxyState.nowPlaying._id = null
    let res = await sandBoxApi.post('', ProxyState.nowPlaying)
    ProxyState.playlist = [...ProxyState.playlist, new Song(res.data)]

    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */

  // REVIEW here we look through the song list for the id that matches.
  async removeSong(id) {
    await sandBoxApi.delete(id)
    ProxyState.playlist = ProxyState.playlist.filter(s => s._id != id)
    //TODO Send the id to be deleted from the server then update the store
  }

  // REVIEW the button function passed here so we can fint the track using trackid and colection name 
  // assigning it back to the proper appstate.
  playSong(id) {
    let playingSong = ProxyState.songs.find(s => s._id == id)
    ProxyState.nowPlaying = playingSong
  }
}

const service = new SongsService();
export default service;
