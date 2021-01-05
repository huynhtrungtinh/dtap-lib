import {aliases, codes, names} from './actions';
function keycode(searchInput: any) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    const hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) {searchInput = hasKeyCode}
  }

  // Numbers
  if ('number' === typeof searchInput) {return names[searchInput];}

  // Everything else (cast to string)
  const search = String(searchInput)

  // check codes
  const foundNamedKeyCodes = codes[search.toLowerCase()]
  if (foundNamedKeyCodes) {return foundNamedKeyCodes}

  // check aliases
  const foundNamedKeyAliases = aliases[search.toLowerCase()];
  if (foundNamedKeyAliases) {return foundNamedKeyAliases;}

  // weird character?
  if (search.length === 1) {return search.charCodeAt(0);}

  return undefined
}

function isEventKey(event: any, nameOrCode: any) {
  if (event && 'object' === typeof event) {
    const keyCode = event.which || event.keyCode || event.charCode
    if (keyCode === null || keyCode === undefined) {return false;}
    if (typeof nameOrCode === 'string') {
      // check codes
      const foundNamedKeyCodes = codes[nameOrCode.toLowerCase()]
      if (foundNamedKeyCodes) {return foundNamedKeyCodes === keyCode;}
      // check aliases
      const foundNamedKeyAliases = aliases[nameOrCode.toLowerCase()]
      if (foundNamedKeyAliases) {return foundNamedKeyAliases === keyCode;}
    } else if (typeof nameOrCode === 'number') {
      return nameOrCode === keyCode;
    }
  }
  return false;
}
export default keycode;
export {keycode, isEventKey};
