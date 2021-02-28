class TOUCHSWIPE{
  constructor(elem, slideElem, effectCallback){
    this._elem = elem;                        // The element to enable touchswipe on
    this._slideElem = slideElem || this.elem; // The element to slide, does not have to be the same element as the input
    this._startCoordinates = [0,0];           // Starting coordinates for the touch event
    this._currCoordinates = [0,0];            // Ending coordinates for the touch event
    this._moveDelta = 0;                      // The amount of movement between the start and current points
    this._enabled = true;                     // If the Touch Event is currently allowed
    this._moveHappened = false;               // A check to see if the touchmove event was triggered
    this._effectCallback = effectCallback;    // Callback function that is triggered when the swipe happens : Must Accept Object

    this.buildMobileSwipe();
  }

  buildMobileSwipe(){
    this.elem.addEventListener("touchstart", this.touchStartHandle.bind(this) );
    this.elem.addEventListener("touchmove", this.touchMoveHandle.bind(this) );
    this.elem.addEventListener("touchend",this.touchEndHandle.bind(this) );
  }

  touchStartHandle(e){
    if(debug) debug.debugLog("EVENT [touchstart] :: Start point = "+e.touches[0].clientX+" , "+e.touches[0].clientY);
    this.moveDelta = [0,0];
    this.startCoordinates = [e.touches[0].clientX,e.touches[0].clientY];
  }

  touchMoveHandle(e){
    this.moveHappened = true;
    this.currCoordinates = [e.touches[0].clientX , e.touches[0].clientY];
    this.moveDelta = this.calculateDelta(this.startCoordinates, this.currCoordinates);
    if(Math.abs(this.moveDelta[0]) >= 20) this.slide(this.moveDelta);
  }

  touchEndHandle(e){
    let previousClassList = this.slideElem.classList;
    if(debug) debug.debugLog("EVENT [touchend] :: Delta = "+this.moveDelta);
    if(this.moveHappened){ // This check has to be here to prevent a "click" as counting as a move
      if(Math.abs(this.moveDelta[0]) >= 50 ){ // The move window, how long it takes before it counts as a "swipe"
        if(this.moveDelta[0] > 0){
          this.effectCallback({direction: 'left'});
        } else{
          this.effectCallback({direction: 'right'});
        }
        this.slideElem.style.transform = "translateX(0px)";
      } else{
        this.slideElem.style.transform = "translateX(0px)";
      }
      this.moveHappened = false;
    }
  }

  calculateDelta(start, end){
    let delta = [end[0] - start[0], end[1] - start[1]];
    return delta;
  }

  slide(delta){
    if(Math.abs(delta[0]) <=50 )this.slideElem.style.transform = `translateX(${Math.ceil(delta[0]/2)}px)`;
  }

  
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  ::::::::::::::::::::  GETTERS                                                                ::::::::::::::::::::
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  
  get elem(){ return this._elem }
  get slideElem(){ return this._slideElem }
  get startCoordinates(){ return this._startCoordinates }
  get currCoordinates(){ return this._currCoordinates }
  get moveDelta(){ return this._moveDelta }
  get startX(){ return this._startCoordinates[0] }
  get startY(){ return this._startCoordinates[1] }
  get currX(){ return this._currCoordinates[0] }
  get currY(){ return this._currCoordinates[1] }
  get moveHappened(){ return this._moveHappened }
  get effectCallback(){ return this._effectCallback }

  
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  ::::::::::::::::::::  SETTERS                                                                ::::::::::::::::::::
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

  set startCoordinates( coords ) { this._startCoordinates = coords }
  set currCoordinates( coords ) { this._currCoordinates = coords }
  set moveDelta( delta ) { this._moveDelta = delta }
  set slideElem( newElem ) { this._slideElem = newElem }
  set moveHappened( bool ) { this._moveHappened = bool }
}