function PressH(){

  const event = new KeyboardEvent("keydown", {
    key: "h",
    code: "KeyH",
    keyCode: 72,
    which: 72,
    bubbles: true
  });

  document.dispatchEvent(event);

}