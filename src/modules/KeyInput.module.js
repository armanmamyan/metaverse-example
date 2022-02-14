class KeyInput {
    constructor() {
        this.keys =  {};
        window.addEventListener('keydown', this.down);
        window.addEventListener('keyup', this.up);
    }

    isPressed = (keycode) => {
       return this.keys[keycode] ? this.keys[keycode] : false;
    }

    down = (e) => {
        if(this.keys[e.keyCode]) return;
        this.keys[e.keyCode] = true;
        console.log(e.type, e.key, e.keyCode);
    }
    
    up = (e) => {
        this.keys[e.keyCode] = false;
        console.log(e.type, e.key, e.keyCode);
    }
    
}

const keyInput = new KeyInput();


export default keyInput;