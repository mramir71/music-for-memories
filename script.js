let kick = new Tone.Player('https://teropa.info/ext-assets/drumkit/kick.mp3').toDestination()

document.getElementById("generate-music-btn").onclick = async () => {
    await Tone.start();
    kick.start();
}