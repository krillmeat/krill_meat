class SVGSTAGE{
  constructor(doodleNames, stageElem, labelElem){
    this._doodleNames = doodleNames;  // The list of doodle names
    this._currentSlideIndex = 0;      // The current doodle's index number
    this._stageElem = stageElem;      // The element the SVGs are drawn onto
    this._labelElm = labelElem;       // The element that the labels get put on to style things as you want

    this.init();
  }

  init(){
    if(debug && debug.debugOn) debug.debugLog("Enabling SVG Stage...");
    this.switchSvg(this.doodleNames[0]);
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
    let doodleElem = document.createElement("div");
        doodleElem.classList.add("doodle");
        doodleElem.dataset.current = doodleName;
        doodleElem.innerHTML = `<svg viewBox='0 0 1000 1000'>${svgData[doodleName]}</svg>`;
    
    this.currentSlideIndex = this.doodleNames.indexOf(doodleName);

    let mobileSelector = document.querySelector(".doodle-selector .mobile-selector");

    mobileSelector.querySelector("button[data-status='selected']").dataset.status = "";
    mobileSelector.querySelectorAll("button")[this.currentSlideIndex].dataset.status = "selected";

    if(this.stageElem.querySelectorAll(".doodle").length > 0) this.stageElem.removeChild(this.stageElem.querySelector(".doodle"))

    this.stageElem.appendChild(doodleElem);

    // CALL TO SLIDE CLASS (BAD IDEA...)
    touchSwipe.slideElem = doodleElem;
  }

  get doodleNames(){ return this._doodleNames }

  get currentSlideIndex(){ return this._currentSlideIndex }
  set currentSlideIndex(index){ this._currentSlideIndex = index }

  get stageElem(){ return this._stageElem }
  set stageElem(newElem){ this._stageElem = newElem }

  get labelElem(){ return this._labelElem }
  set labelElem(newElem){ this._labelElem = newElem }
}