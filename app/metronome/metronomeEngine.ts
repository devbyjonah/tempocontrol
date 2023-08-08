export default class MetronomeEngine {
	// private only to be used within class (doesn't need _ prefix)
	private audioContext?: AudioContext;
	private setIntervalId?: number | NodeJS.Timer;
	private tapDifferenceArray: number[];
	private lookahead: number;
	private scheduleAheadTime: number;
	private nextNoteTime: number;
	private previousTap: number;
	// private attributes with additional getter/setter methods
	// _ prefix to avoid naming conflicts with methods
	private _beatsPerMeasure: number;
	private _tempo: number;
	private _volume: number = 1.0;
	private _pitch: number = 1000;
	private _subdivision: number;
	private _currentBeat: number;
	private _playing: boolean;
	private _animationCallback?: (beat: number, secondsPerBeat: number) => void;

	constructor(
		tempo: number = 120,
		beatsPerMeasure: number = 4,
		volume: number = 50,
		pitch: number = 50,
		subdivision: number = 1,
	) {
		this._beatsPerMeasure = beatsPerMeasure;
		this._tempo = tempo;
		this._subdivision = subdivision;
		// assign through setters for range conversion
		this.volume = volume;
		this.pitch = pitch;

		this._currentBeat = 0;
		this.lookahead = 25.0; // how often to call scheduling function (in milliseconds)
		this.scheduleAheadTime = 0.1; // how far ahead to schedule audio (sec)
		this.nextNoteTime = 0.0; // time next note should play
		this._playing = false;
		this.tapDifferenceArray = [];
		this.previousTap = 0;
	}
	/*
	The scheduler, scheduleNote, and nextBeat methods are based on Chris Wilson's metronome implementation.
	You can find his article on Web Audio Scheduling here: https://www.html5rocks.com/en/tutorials/audio/scheduling/
	*/

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
					i === 0,
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
		// this._volume is set from 0-100 for ease of use
		// gainNode.gain.value is set from -1.5 - 2.5
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

		if (onBeat && this._animationCallback) {
			this._animationCallback(beatNumber, 60.0 / this._tempo);
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
	private updateTapDifferenceArray(diff: number) {
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
	public tapTempo() {
		// if no audio context, create one
		if (this.audioContext === undefined) {
			this.audioContext = new window.AudioContext();
		}
		if (this.previousTap) {
			const diff = this.audioContext.currentTime - this.previousTap;
			const average = this.updateTapDifferenceArray(diff);
			this.tempo = Math.floor(60 / average);
		}
		this.previousTap = this.audioContext.currentTime;
	}

	private start() {
		if (this._playing) return;

		if (this.audioContext === undefined) {
			this.audioContext = new window.AudioContext();
		}

		this._playing = true;

		this._currentBeat = 0;
		this.nextNoteTime = this.audioContext.currentTime + 0.05;

		this.setIntervalId = setInterval(
			() => this.scheduler(),
			this.lookahead,
		);
	}

	private stop() {
		this._playing = false;
		clearInterval(this.setIntervalId!!);
	}
	// surface level method for use in the metronome react component
	public startStop() {
		if (this.playing) {
			this.stop();
		} else {
			this.start();
		}
	}

	public cleanup() {
		this.audioContext?.close();
		this.audioContext = undefined;
		if (this.setIntervalId) {
			clearInterval(this.setIntervalId);
			this.setIntervalId = undefined;
		}
	}

	// setter and getter methods for private class attributes
	set beatsPerMeasure(value: number) {
		if (value > 0 && value < 13) {
			this._beatsPerMeasure = value;
		}
	}

	get beatsPerMeasure() {
		return this._beatsPerMeasure;
	}

	set subdivision(value: number) {
		if (value > 0 && value < 5) {
			this._subdivision = value;
		}
	}

	get subdivision() {
		return this._subdivision;
	}

	set tempo(value: number) {
		if (value >= 40 && value <= 220) {
			this._tempo = value;
		}
	}
	get tempo() {
		return this._tempo;
	}
	/* 
	volume setter and getter exposes range of 0 to 100
	to simplify usage in metronome component

	the underlying range goes from 0 to 1.5
		
	 */
	set volume(value: number) {
		if (value >= 0 && value <= 100) {
			this._volume = (value / 100) * 1.5;
		}
	}

	get volume() {
		return (this._volume / 1.5) * 100;
	}
	// convert pitch range from 0 to 100 to 100 to 2000
	set pitch(value: number) {
		if (value >= 0 && value <= 100) {
			this._pitch = (value / 100) * 2000 + 100;
		}
	}

	get pitch() {
		return ((this._pitch - 100) / 2000) * 100;
	}

	get currentBeat() {
		return this._currentBeat;
	}
	get playing() {
		return this._playing;
	}
	set animationCallback(
		callback: (beat: number, secondsPerBeat: number) => void,
	) {
		this._animationCallback = callback;
	}
}
