class SVGSTAGE{
  constructor(doodleNames, stageElem, labelElem){
    this._doodleNames = doodleNames;  // The list of doodle names
    this._currentSlideIndex = 0;      // The current doodle's index number
    this._stageElem = stageElem;      // The element the SVGs are drawn onto
    this._labelElm = labelElem;       // The element that the labels get put on to style things as you want
    this._doodleElem = this.buildDoodleElem();

    this.init();
  }

  /** INITIALIZE
   * ------------------------------------------------------------
   * The inital Function that runs after the constructor
   * ------------------------------------------------------------
   */
  init(){
    if(debug && debug.debugOn) debug.debugLog("Enabling SVG Stage...");
    this.stageElem.appendChild(this.doodleElem);
    this.switchSvg(this.doodleNames[0]);
  }

  /**
   * BUILD DOODLE ELEM
   * ------------------------------------------------------------
   * Builds the initial Doodle Element for the page
   * ------------------------------------------------------------
   */
  buildDoodleElem(){
    let doodleElem = document.createElement("div");
        doodleElem.classList.add("doodle");
        doodleElem.dataset.current = this.doodleNames[0];
        doodleElem.innerHTML = `<svg viewBox='0 0 1000 1000'>${svgData[this.doodleNames[0]]}</svg>`;

    return doodleElem;
  }

  /**
   * EVENT CALLBACK
   * ------------------------------------------------------------
   * Callback function - Takes in object and sets things up
   * ------------------------------------------------------------
   * @param {Object} callbackParams
   * ------------------------------------------------------------
   */
  eventCallback(callbackParams){
    let newDoodleIndex = 0;
    if(callbackParams.direction === "left"){
      newDoodleIndex = this.currentSlideIndex === 0 ? this.doodleNames.length-1 : this.currentSlideIndex-1;
    } else if(callbackParams.direction === "right"){
      newDoodleIndex = this.currentSlideIndex === this.doodleNames.length-1 ? 0 : this.currentSlideIndex+1;
    }
    this.switchSvg(this.doodleNames[newDoodleIndex]);
  }

  /**
   * SWITCH SVG
   * ------------------------------------------------------------
   * Switches out the SVG in the draw zone
   * ------------------------------------------------------------
   */
  switchSvg(doodleName){
    let obj = this;
    document.body.dataset.current = doodleName;
    let doodleElem = document.querySelector(".doodle");
        doodleElem.dataset.current = doodleName;
        doodleElem.innerHTML = `<svg viewBox='0 0 1000 1000'>${svgData[doodleName]}</svg>`;
    
    this.currentSlideIndex = this.doodleNames.indexOf(doodleName);

    let mobileSelector = document.querySelector(".doodle-selector .mobile-selector");

    mobileSelector.querySelector("button[data-status='selected']").dataset.status = "";
    mobileSelector.querySelectorAll("button")[this.currentSlideIndex].dataset.status = "selected";

    this.stageElem.appendChild(doodleElem);
  }

  get doodleNames(){ return this._doodleNames }

  get currentSlideIndex(){ return this._currentSlideIndex }
  set currentSlideIndex(index){ this._currentSlideIndex = index }

  get stageElem(){ return this._stageElem }
  set stageElem(newElem){ this._stageElem = newElem }

  get labelElem(){ return this._labelElem }
  set labelElem(newElem){ this._labelElem = newElem }

  get doodleElem(){ return this._doodleElem }
}