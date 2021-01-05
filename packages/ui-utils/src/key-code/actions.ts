const aliases: any = {
    'windows': 91,
    '⇧': 16,
    '⌥': 18,
    '⌃': 17,
    '⌘': 91,
    'ctl': 17,
    'control': 17,
    'option': 18,
    'pause': 19,
    'break': 19,
    'caps': 20,
    'return': 13,
    'escape': 27,
    'spc': 32,
    'spacebar': 32,
    'pgup': 33,
    'pgdn': 34,
    'ins': 45,
    'del': 46,
    'cmd': 91
}

function initData(aliases: any) {
    const codes: any = {
        'backspace': 8,
        'tab': 9,
        'enter': 13,
        'shift': 16,
        'ctrl': 17,
        'alt': 18,
        'pause/break': 19,
        'caps lock': 20,
        'esc': 27,
        'space': 32,
        'page up': 33,
        'page down': 34,
        'end': 35,
        'home': 36,
        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40,
        'insert': 45,
        'delete': 46,
        'command': 91,
        'left command': 91,
        'right command': 93,
        'numpad *': 106,
        'numpad +': 107,
        'numpad -': 109,
        'numpad .': 110,
        'numpad /': 111,
        'num lock': 144,
        'scroll lock': 145,
        'my computer': 182,
        'my calculator': 183,
        ';': 186,
        '=': 187,
        ',': 188,
        '-': 189,
        '.': 190,
        '/': 191,
        '`': 192,
        '[': 219,
        '\\': 220,
        ']': 221,
        "'": 222
    }
    const names: any = {};
    // lower case chars
    for (let i = 97; i < 123; i++) {codes[String.fromCharCode(i)] = i - 32}

    // numbers
    for (let i = 48; i < 58; i++) {codes[i - 48] = i}

    // function keys
    for (let i = 1; i < 13; i++) {codes['f' + i] = i + 111}

    // numpad keys
    for (let i = 0; i < 10; i++) {codes['numpad ' + i] = i + 96}

    // Create reverse mapping
    Object.keys(codes).map((i: any) => {
        names[codes[i]] = i
    })

    // Add aliases
    Object.keys(aliases).map((alias: any) => {
        codes[alias] = aliases[alias]
    })
    return {
        codes,
        names
    }
}

const {codes} = initData(aliases);
const {names} = initData(aliases);

export default aliases;
export {codes, names, aliases};

