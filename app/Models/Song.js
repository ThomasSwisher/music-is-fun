export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  // Thomas REVIEW the capitolized variable is for refernce that tha variable is "fake"
  // manufactured and used for visual effects.
  get NowPlayingTemplate() {
    if (this.album == undefined) {
      this.album = "Unavailable"
    }
    return `
    <button onclick="app.songsController.addSong('${this._id}')"class="btn btn-success"><i class="fas fa-plus"></i></button>
      <img src="${this.albumArt}" alt="Itunes Song">
      <h1>${this.artist} - ${this.title}</h1>
      <h3>Album: ${this.album} | Buy Now: $${this.price}</h3>
      <audio  controls src="${this.preview}"></audio>
        `;
  }

  get PlaylistTemplate() {
    return `
    <div class="bg-white">
        <button class="btn btn-danger" onclick="app.songsController.removeSong('${this._id}')"><i class="fas fa-times"></i></button>
        <p>${this.artist}</p>
        <p>${this.title}</p>
    </div>
        `;
  }
}
