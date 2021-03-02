/**
 * TOUCH SWIPE
 * ----------------------------------------------------------------------
 * A very low-weight Class that creates a Swipe Event Handler on an HTML Element
 * ----------------------------------------------------------------------
 * @param {Node}      elem            Element that listens for the Swipe Functionality
 * @param {Node}      slideElem       Element that slides when the Event is Triggered
 * @param {Function}  effectCallback  Function passed in that handles what happens when a swipe occurs
 * ----------------------------------------------------------------------
 */
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

  /**
   * BUILD MOBILE SWIPE
   * ----------------------------------------------------------------------
   * Sets up the Mobile Swipe Events (touchstart, touchmove, and touchend)
   * ----------------------------------------------------------------------
   */
  buildMobileSwipe(){
    this.elem.addEventListener("touchstart", this.touchStartHandle.bind(this) );
    this.elem.addEventListener("touchmove", this.touchMoveHandle.bind(this) );
    this.elem.addEventListener("touchend",this.touchEndHandle.bind(this) );
  }

  /**
   * TOUCH START HANDLE
   * ----------------------------------------------------------------------
   * Handles the effects of the Touch Start Event
   * ----------------------------------------------------------------------
   * @param {Event} e Event object 
   * ----------------------------------------------------------------------
   */
  touchStartHandle(e){
    debug?.debugLog("EVENT [touchstart] :: Start point = "+e.touches[0].clientX+" , "+e.touches[0].clientY);

    // Clear existing Deltas and Set the Starting Point
    this.moveDelta = [0,0];
    this.startCoordinates = [e.touches[0].clientX,e.touches[0].clientY];
  }

  /**
   * TOUCH MOVE HANDLE
   * ----------------------------------------------------------------------
   * Handles the effects of the Touch Move Event
   * ----------------------------------------------------------------------
   * @param {Event} e Event object 
   * ----------------------------------------------------------------------
   */
  touchMoveHandle(e){
    this.moveHappened = true; // While true, a moving has happened (prevents a Click from counting as a Move on second interaction)

    // Get the current coordinates and set the Deltas based on difference to Start Points
    this.currCoordinates = [e.touches[0].clientX , e.touches[0].clientY];
    this.moveDelta = this.calculateDelta(this.startCoordinates, this.currCoordinates);
    
    // If the Delta is past a certain point, animate the Slide Elem slightly for visual feedback
    // TODO - Allow for more varieties of effect, not just subtle slide
    if(Math.abs(this.moveDelta[0]) >= 20) this.slide(this.moveDelta);
  }

  /**
   * TOUCH END HANDLE
   * ----------------------------------------------------------------------
   * Handles the effects of the Touch End Event
   * ----------------------------------------------------------------------
   * @param {Event} e Event object 
   * ----------------------------------------------------------------------
   */
  touchEndHandle(e){
    debug?.debugLog("EVENT [touchend] :: Delta = "+this.moveDelta);

    // If the Delta is past a certain number, check which direction from the start the end coordinates are, then send the direction to the Callback Function
    if(this.moveHappened){  // This check has to be here to prevent a "click" as counting as a move
      if(Math.abs(this.moveDelta[0]) >= 50 ){ // The move window, how long it takes before it counts as a "swipe" | TODO - Set this value through Param
        if(this.moveDelta[0] > 0){
          this.effectCallback({direction: 'left'});
        } else{
          this.effectCallback({direction: 'right'});
        }
      } else{ // If you don't meet the delta requirement to trigger the event, just send no direction to the callback
        this.effectCallback({direction: 'none'});
      }
      this.moveHappened = false;  // Reset the Move Happened check to prevent "Click swiping"
    }
  }

  /**
   * CALCULATE DELTA
   * ----------------------------------------------------------------------
   * Takes Start and End Coordinates and returns the differences between them
   * ----------------------------------------------------------------------
   * @param {Array} start The X and Y position at the start of the Touch Event
   * @param {Array} end   The X and Y position at the end of the Touch Event\
   * @returns An Array of the Deltas between the Start and End points
   * ----------------------------------------------------------------------
   */
  calculateDelta(start, end){
    return [end[0] - start[0], end[1] - start[1]];
  }

  /**
   * SLIDE
   * ----------------------------------------------------------------------
   * Allows the Slide Element to Slightly Move when dragging
   * TODO - Allow Y movement as well
   * ----------------------------------------------------------------------
   * @param {Array} delta Array of Deltas between the Start and End points
   * ----------------------------------------------------------------------
   */
  slide(delta){
    if(Math.abs(delta[0]) <=50 )this.slideElem.style.transform = `translateX(${Math.ceil(delta[0]/2)}px)`;
  }

  
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  ::::::::::::::::::::                                                                         ::::::::::::::::::::
  ::::::::::::::::::::  GETTERS & SETTERS                                                      ::::::::::::::::::::
  ::::::::::::::::::::                                                                         ::::::::::::::::::::
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  
  get elem(){ return this._elem }
  
  get slideElem(){ return this._slideElem }
  set slideElem( newElem ) { this._slideElem = newElem }
  
  get startCoordinates(){ return this._startCoordinates }
  set startCoordinates( coords ) { this._startCoordinates = coords }

  get currCoordinates(){ return this._currCoordinates }
  set currCoordinates( coords ) { this._currCoordinates = coords }
  
  get moveDelta(){ return this._moveDelta }
  set moveDelta( delta ) { this._moveDelta = delta }
  
  get startX(){ return this._startCoordinates[0] }
  
  get startY(){ return this._startCoordinates[1] }
  
  get currX(){ return this._currCoordinates[0] }
  
  get currY(){ return this._currCoordinates[1] }
  
  get moveHappened(){ return this._moveHappened }
  set moveHappened( bool ) { this._moveHappened = bool }
  
  get effectCallback(){ return this._effectCallback }
}
