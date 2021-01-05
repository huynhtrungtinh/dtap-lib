const cancelEvent = (event: any) => {
    event.preventDefault(); // stop it's effects here
    event.stopPropagation(); // stop it from bubbling up
}
export default cancelEvent;
export {cancelEvent};
