class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error();
        }
        this.config = config;
        this.state = config.initial;
        this.states = config.states;
        this.arrStates = Object.keys(config.states);
        this.arrHistory = [];
        this.arrDeletedStates = [];
        this.addStepInHistory(this.state);
    }


    addStepInHistory(changeState) {
        if (changeState !== this.arrHistory[this.arrHistory.length - 1]) {
            this.arrHistory.push(changeState);
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.arrStates.includes(state)) {
            throw new Error();
        }
        this.state = state;
        this.addStepInHistory(state);
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.state = this.states[this.state].transitions[event];
        if (!this.state) {
            throw new Error;
        }
        this.addStepInHistory(this.state);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
        this.addStepInHistory(this.state);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
            return this.arrStates;
        } else if (event === "get_hungry") {
            return ["busy", "sleeping"];
        } else if (event === "study") {
            return ["normal"];
        } else if (event === "get_up") {
            return ["sleeping"];
        } else if (event === "eat") {
            return ["hungry"];
        } else if (event === "get_tired") {
            return ["busy"];
        } else {
            return [];
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (!this.arrHistory[this.arrHistory.length - 2]) {
            return false;
        } else {
            this.state = this.arrHistory[this.arrHistory.length - 2];
            if (this.arrHistory[this.arrHistory.length-1] !== this.arrDeletedStates[this.arrDeletedStates.length - 1]) {
            this.arrDeletedStates.push(this.arrHistory.pop());
            }
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.arrDeletedStates.length > 0) {
            this.arrHistory.push(this.arrDeletedStates[this.arrDeletedStates.length - 1]);
            this.state = this.arrHistory[this.arrHistory.length - 1];
            this.arrDeletedStates.pop();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.arrHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
    