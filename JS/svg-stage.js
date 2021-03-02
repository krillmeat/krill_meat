/**
 * SVG STAGE
 * ----------------------------------------------------------------------
 * This is a rather specific JS Object. It's used on my KRILL MEAT site,
 * to handle drawing different SVGs on a "Stage"
 * ----------------------------------------------------------------------
 * @param {Array} doodleNames Array of Strings of the Names of each SVG
 * @param {Node}  stageElem   Element that SVGs are drawn onto
 * @param {Node}  labelElem   Element that works as a wrapper with a state/label to control styling
 * ----------------------------------------------------------------------
 */
class SVGSTAGE{
  constructor(doodleNames, stageElem, labelElem){
    this._doodleNames = doodleNames;            // List of doodle names
    this._currentSlideIndex = 0;                // Current doodle's index number
    this._stageElem = stageElem;                // Element the SVGs are drawn onto
    this._labelElm = labelElem;                 // Element that the labels get put on to style things as you want
    this._doodleElem = this.buildDoodleElem();  // Element that holds the Doodles (SVGs)

    this.init();
  }

  /** INITIALIZE
   * ----------------------------------------------------------------------
   * The inital Function that runs after the constructor
   * ----------------------------------------------------------------------
   */
  init(){
    if(debug && debug.debugOn) debug.debugLog("Enabling SVG Stage...");
    
    // Append the Doodle Element to the Stage and set the Doodle to the first one in the list
    this.stageElem.appendChild(this.doodleElem);
    this.switchSvg(this.doodleNames[0]);
  }

  /**
   * BUILD DOODLE ELEM
   * ----------------------------------------------------------------------
   * Builds the initial Doodle Element for the page
   * ----------------------------------------------------------------------
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
   * ----------------------------------------------------------------------
   * Callback function - Allows Event-based JS to control the switch function
   * ----------------------------------------------------------------------
   * @param {Object} callbackParams An object that contains various settings from the event handler
   * ----------------------------------------------------------------------
   */
  eventCallback(callbackParams){
    // Expect callbackParams to include 'direction' of 'left', 'right', or 'none
    let newDoodleIndex = 0;
    if(callbackParams.direction === "left"){
      newDoodleIndex = this.currentSlideIndex === 0 ? this.doodleNames.length-1 : this.currentSlideIndex-1;
    } else if(callbackParams.direction === "right"){
      newDoodleIndex = this.currentSlideIndex === this.doodleNames.length-1 ? 0 : this.currentSlideIndex+1;
    }
    this.doodleElem.style.transform = "translateX(0px)"; // No matter what, reset the position of the Doodle Element
    this.switchSvg(this.doodleNames[newDoodleIndex]);
  }

  /**
   * SWITCH SVG
   * ----------------------------------------------------------------------
   * Switches out the SVG in the draw zone
   * ----------------------------------------------------------------------
   * @param {String} doodleName The name of the Doodle from the Doodle Names List
   * ----------------------------------------------------------------------
   */
  switchSvg(doodleName){
    document.body.dataset.current = doodleName; // Set the Body State to the correct Doodle
    
    // Reset Doodle Elem to the new SVG
    let doodleElem = document.querySelector(".doodle");
        doodleElem.dataset.current = doodleName;
        doodleElem.innerHTML = `<svg viewBox='0 0 1000 1000'>${svgData[doodleName]}</svg>`;
    
    this.currentSlideIndex = this.doodleNames.indexOf(doodleName);

    // Change the Mobile Selector Dots to show the correctly selected Doodle
    let mobileSelector = document.querySelector(".doodle-selector .mobile-selector");
        mobileSelector.querySelector("button[data-status='selected']").dataset.status = "";
        mobileSelector.querySelectorAll("button")[this.currentSlideIndex].dataset.status = "selected";

    this.stageElem.appendChild(doodleElem);
  }


  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  ::::::::::::::::::::                                                                         ::::::::::::::::::::
  ::::::::::::::::::::  GETTERS & SETTERS                                                      ::::::::::::::::::::
  ::::::::::::::::::::                                                                         ::::::::::::::::::::
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

  get doodleNames(){ return this._doodleNames }

  get currentSlideIndex(){ return this._currentSlideIndex }
  set currentSlideIndex(index){ this._currentSlideIndex = index }

  get stageElem(){ return this._stageElem }
  set stageElem(newElem){ this._stageElem = newElem }

  get labelElem(){ return this._labelElem }
  set labelElem(newElem){ this._labelElem = newElem }

  get doodleElem(){ return this._doodleElem }
}