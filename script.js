// let kick = new Tone.Player('https://teropa.info/ext-assets/drumkit/kick.mp3').toDestination()
// // let sampleSong = new Tone.Player('/Sample-Im-A-Believer.mid').toDestination()
player = new mm.Player()
soundFontPlayer = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus')

// // uses melody_rnn ("A 128-class onehot MelodyRNN model.")
// let melodyrnn = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn')
// let melodyrnnLoaded = melodyrnn.initialize()
// // const noteSeqSample = mm.urlToNoteSequence()
// // const noteSeqSample = tf.data.TFRecordDataset(['/tmp/notesequences.tfrecord'])
// // const qns = mm.sequences.quantizeNoteSequence(noteSeqSample, 4)
// // const qns2 = {
// //     qns,
// //     notes: noteSeqSample.notes
// // }
// // const unquantizedSeq = mm.unquantizeSequence(noteSeqSample)


// document.getElementById("generate-music-btn").onclick = async () => {
//     // await Tone.start();
//     // kick.start();

//     const player2 = new core.Player();
//     //...
//     const mvae = new music_vae.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small');
//     mvae.initialize().then(() => {
//         model.sample(1).then((samples) => player2.start(samples[0]));
//     });

//     // await noteSeqSample;
//     // console.log(noteSeqSample);
//     // soundFontPlayer.start(noteSeqSample);
//     // soundFontPlayer.stop();

// //     await noteSeqSample;
// //     let notesOnly = noteSeqSample.then(function(result) {
// //         return result.notes;
// //     });
// //     await notesOnly;
// //     console.log(notesOnly);

// //     let seed = {
// //         notes: notesOnly,
// //         totalQuantizedSteps: 4,
// //         quantizationInfo: { stepsPerQuarter: 4 }
// //     };
// //     let steps = 28;
// //     let temperature = 1.2;
// // //     // await unquantizedSeq;
// // //     // await modelLoaded;

// // //     // let startingSequence = Tone.urlToNoteSequence('/Sample-Im-A-Believer.mid');

// // // //   music_rnn
// // // //   .continueSequence(qns, rnn_steps, rnn_temperature)
// // // //   .then((sample) => rnnPlayer.start(sample));
// //     await qns;
// //     let result = await melodyrnn.continueSequence(seed, steps, temperature);
// //     console.log(result);

// }

//load in the model with the checkpoint
const improvCheckpoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv'
const improvRNN = new mm.MusicRNN(improvCheckpoint)
let improvRNNLoaded = improvRNN.initialize()


//sequence to initialize model with
const sequence = {
  ticksPerQuarter: 220,
  totalTime: 28.5,
  timeSignatures: [
    {
      time: 0,
      numerator: 4,
      denominator: 4
    }
  ],
  tempos: [
    {
      time: 0,
      qpm: 120
    }
  ],
  notes: [
    { pitch: Tone.Frequency('Gb4').toMidi(), startTime: 0, endTime: 1 },
    { pitch: Tone.Frequency('F4').toMidi(), startTime: 1, endTime: 3.5 },
    { pitch: Tone.Frequency('Ab4').toMidi(), startTime: 3.5, endTime: 4 },
    { pitch: Tone.Frequency('C5').toMidi(), startTime: 4, endTime: 4.5 },
    // { pitch: 'Eb5', startTime: 4.5, endTime: 5 },
    // { pitch: 'Gb5', startTime: 5, endTime: 6 },
    // { pitch: 'F5', startTime: 6, endTime: 7 },
    // { pitch: 'E5', startTime: 7, endTime: 8 },
    // { pitch: 'Eb5', startTime: 8, endTime: 8.5 },
    // { pitch: 'C5', startTime: 8.5, endTime: 9 },
    // { pitch: 'G4', startTime: 9, endTime: 11.5 },
    // { pitch: 'F4', startTime: 11.5, endTime: 12 },
    // { pitch: 'Ab4', startTime: 12, endTime: 12.5 },
    // { pitch: 'C5', startTime: 12.5, endTime: 13 },
    // { pitch: 'Eb5', startTime: 13, endTime: 14 },
    // { pitch: 'D5', startTime: 14, endTime: 15 },
    // { pitch: 'Db5', startTime: 15, endTime: 16 },
    // { pitch: 'C5', startTime: 16, endTime: 16.5 },
    // { pitch: 'F5', startTime: 16.5, endTime: 17 },
    // { pitch: 'F4', startTime: 17, endTime: 19.5 },
    // { pitch: 'G4', startTime: 19.5, endTime: 20 },
    // { pitch: 'Ab4', startTime: 20, endTime: 20.5 },
    // { pitch: 'C5', startTime: 20.5, endTime: 21 },
    // { pitch: 'Eb5', startTime: 21, endTime: 21.5 },
    // { pitch: 'C5', startTime: 21.5, endTime: 22 },
    // { pitch: 'Eb5', startTime: 22, endTime: 22.5 },
    // { pitch: 'C5', startTime: 22.5, endTime: 24.5 },
    // { pitch: 'Eb5', startTime: 24.5, endTime: 25.5 },
    // { pitch: 'G4', startTime: 25.5, endTime: 28.5 }
  ]
}

//
const quantizedSequence = mm.sequences.quantizeNoteSequence(sequence, 1)

const synth = new Tone.Synth().toDestination()

const startProgram = async () => {
  try {
    await improvRNNLoaded;

    const playGeneratedMelody = () => {
      improvRNN
        .continueSequence(quantizedSequence, 60, 1.1, ['Bm', 'Bbm', 'Gb7', 'F7', 'Ab', 'Ab7', 'G7', 'Gb7', 'F7', 'Bb7', 'Eb7', 'AM7'])
        .then((sample) => {
          soundFontPlayer.start(sample);
        });
    }

    const generatedMelodyButton = document.getElementById('generate-music-btn')
    generatedMelodyButton.onclick = () => {
      playGeneratedMelody()
    }

    const stopMelodyButton = document.getElementById('stop-playing')
    stopMelodyButton.onclick = () => {
      soundFontPlayer.stop();
    }

  } catch (error) {
    console.error(error)
  }
}

startProgram();