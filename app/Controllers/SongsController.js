import { ProxyState } from "../AppState.js";
import songsService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
// Thomas REVIEW template += is used because the forEach need to iterate over each element
// and needs to added it to the TEMPLATE so we can see the whole COLLECTION.
// The += makes sure that it doesn't overwrite the other itereations.
function _drawResults() {
  let results = ProxyState.songs
  let template = ''
  // REVIEW just not that ('${song._Id}', '${song.album}') had to be done because we need to pass both
  // id to the function that used the ids to select single track.
  results.forEach(song => {
    template += /*html*/`
    <div class="row bg-white justify-content-around py-2 my-2" onClick="app.songsController.playSong('${song._id}')">
        <div class="col-4">
            <img class="img-fluid" src="${song.albumArt}" alt="Album Cover">
        </div>
        <div class="col-8">
            <p>${song.artist}</p>
            <p>${song.title}</p>
        </div>
    </div>
    `
  })
  // Thomas REVIEW at this point you will draw to the page in some form.
  document.getElementById('results').innerHTML = template
}

// REVIEW First need to set a watcher for data coming back.
function _drawNowPlaying() {
  // Thomas REVIEW at this point you will draw to the page in some form. We use ProxyState.nowPlaying.NowPlayingTemplate
  // Now playing is proxystate and is the name of the template NowPlayingTemplate
  document.getElementById('now-playing').innerHTML = ProxyState.nowPlaying.NowPlayingTemplate
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let playlist = ProxyState.playlist
  let template = ''
  playlist.forEach(song => {
    template += song.PlaylistTemplate
  })
  // Thomas REVIEW at this point you will draw to the page in some form.
  document.getElementById('playlist').innerHTML = template
  console.log()
}

//Public
export default class SongsController {
  constructor() {
    ProxyState.on('songs', _drawResults)
    ProxyState.on('nowPlaying', _drawNowPlaying)
    ProxyState.on('playlist', _drawPlaylist)

    // REVIEW this loads the songs from server into your playlist then drawn to your page.
    this.getMySongs()
    //TODO Don't forget to register your listeners and get your data
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songsService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  async getMySongs() {
    try {
      songsService.getMySongs()
    } catch (error) {
      console.error(error)
    }
  }

  // REVIEW here we are setting up an onClick function in draw results HTML this just passes 
  // the id to the services. Get this id from the proxystate.songs to see what is passed.
  playSong(id) {
    songsService.playSong(id)
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong(id) {
    try {
      await songsService.addSong(id)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async removeSong(id) {
    try {
      await songsService.removeSong(id)
    } catch (error) {
      console.error(error)
    }

  }
}
