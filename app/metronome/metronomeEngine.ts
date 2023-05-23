export default class MetronomeEngine {
	// private only to be used within class
	private audioContext: AudioContext | null;
	private setIntervalId: number | NodeJS.Timer | null;
	private animationCallback: (beat: number, secondsPerBeat: number) => void;
	private tapDifferenceArray: number[];
	private lookahead: number;
	private scheduleAheadTime: number;
	private nextNoteTime: number;
	private previousTap: number;
	// private attributes with additional validations in setter methods
	private _beatsPerMeasure: number;
	private _tempo: number;
	private _volume: number;
	private _pitch: number;
	private _subdivision: number;
	// private with only getter methods
	private _currentBeat: number;
	private _playing: boolean;

	constructor(
		animationCallback: (beat: number, secondsPerBeat: number) => void
	) {
		this.audioContext = null;
		this._currentBeat = 0;
		this._beatsPerMeasure = 4;
		this._tempo = 120;
		this.lookahead = 25.0; // how often to call scheduling function (in milliseconds)
		this.scheduleAheadTime = 0.1; // how far ahead to schedule audio (sec)
		this.nextNoteTime = 0.0; // time next note should play
		this._playing = false;
		this.setIntervalId = null;
		this._volume = 1.0;
		this._pitch = 1000;
		this._subdivision = 1;
		this.animationCallback = animationCallback;
		this.tapDifferenceArray = [];
		this.previousTap = 0;
	}

	private scheduler() {
		// continue scheduling notes as long as we are within the schedule ahead range
		while (
			this.nextNoteTime <
			this.audioContext!!.currentTime + this.scheduleAheadTime
		) {
			// find length of each subdivision
			let secondsPerBeat = 60.0 / this._tempo;
			let secondsPerSubdivision = secondsPerBeat / this._subdivision;
			// schedule a note for each subdivision of the beat
			for (let i = 0; i < this._subdivision; i++) {
				this.scheduleNote(
					this.currentBeat,
					this.nextNoteTime + secondsPerSubdivision * i,
					i === 0
				);
			}
			// move on to next beat
			this.nextBeat();
		}
	}

	private scheduleNote(beatNumber: number, time: number, onBeat: boolean) {
		// create sound source (try switching to buffer ?)
		const osc = this.audioContext!!.createOscillator();
		const envelope = this.audioContext!!.createGain();
		const gainNode = new GainNode(this.audioContext!!);

		gainNode.gain.value = this._volume;
		// assign higher frequency for downbeats only
		let pitch = beatNumber === 0 ? this._pitch * 1.2 : this._pitch;

		osc.frequency.value = onBeat ? pitch : this._pitch * 0.8;
		//beatNumber % this._beatsPerBar === 0 ? this._pitch : this._pitch * 0.8;
		envelope.gain.value = 1;
		envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
		envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

		osc.connect(envelope);
		envelope.connect(gainNode).connect(this.audioContext!!.destination);

		osc.start(time);
		osc.stop(time + 0.03);

		if (onBeat) {
			this.animationCallback(beatNumber, 60.0 / this._tempo);
		}
	}

	private nextBeat() {
		// move current note/time forward by a quarter note
		let secondsPerBeat = 60.0 / this._tempo;
		this.nextNoteTime += secondsPerBeat;
		// increment beat number, set to 0 if end of bar
		this._currentBeat++;
		if (this._currentBeat >= this._beatsPerMeasure) {
			this._currentBeat = 0;
		}
	}

	/*
	 	update method keeps tapDifferenceArray length at 5 and clears array if latest diff
		is 50% greater or less than the average. this allows the user to change tempo quickly
		without having to wait for the array to fill up again
	*/
	_updateTapDifferenceArray(diff: number) {
		const average =
			this.tapDifferenceArray.reduce((a, b) => a + b, 0) /
			this.tapDifferenceArray.length;
		if (average >= diff * 1.5 || average <= diff * 0.5) {
			this.tapDifferenceArray = [];
		}
		if (this.tapDifferenceArray.length >= 5) {
			this.tapDifferenceArray.shift();
		}
		this.tapDifferenceArray.push(diff);
		return average;
	}
	/*
		tapTempo method
		- uses audio context to find time passed between taps
		- stores time difference(diff) between taps in tapDifferenceArray
	*/
	tapTempo() {
		// if no audio context, create one
		if (this.audioContext === null) {
			this.audioContext = new window.AudioContext();
		}
		if (this.previousTap) {
			const diff = this.audioContext.currentTime - this.previousTap;
			const average = this._updateTapDifferenceArray(diff);
			this.tempo = Math.floor(60 / average);
		}
		this.previousTap = this.audioContext.currentTime;
	}

	_start() {
		if (this._playing) return;

		if (this.audioContext === null) {
			this.audioContext = new window.AudioContext();
		}

		this._playing = true;

		this._currentBeat = 0;
		this.nextNoteTime = this.audioContext.currentTime + 0.05;

		this.setIntervalId = setInterval(
			() => this.scheduler(),
			this.lookahead
		);
	}

	_stop() {
		this._playing = false;
		clearInterval(this.setIntervalId!!);
	}
	// surface level methods for use in the metronome react component
	startStop() {
		if (this._playing) {
			this._stop();
		} else {
			this._start();
		}
	}

	// setter and getter methods for private class attributes
	set beatsPerMeasure(value: number) {
		if (value < 1) {
			throw new Error("beatsPerMeasure must be greater than 0");
		}
		this._beatsPerMeasure = value;
	}

	set tempo(value: number) {
		if (value >= 40 && value <= 220) {
			this._tempo = value;
		}
	}
	get tempo() {
		return this._tempo;
	}

	set volume(value: number) {
		if (value > -1 && value < 3) {
			this._volume = value;
		}
	}
	get currentBeat() {
		return this._currentBeat;
	}
	get playing() {
		return this._playing;
	}
}
