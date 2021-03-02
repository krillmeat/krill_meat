/**
 * SVG LOADER
 * ----------------------------------------------------------------------
 * Used for when you want to include SVGs inline on a page, without cluttering
 * the HTML. Injects SVG Strings into tagged SVG Elements
 * ----------------------------------------------------------------------
 * @param {Nodelist} elems Nodelist of SVG Tag Elements
 * ----------------------------------------------------------------------
 */
class SVGLOADER{
  constructor(elems, svgDataObject){
    this._svgs = elems;                   // Nodelist of SVG Elements
    this._svgDataObject = svgDataObject;  // Object containing SVG Strings

    this.paintAllSVGs(this.svgs);
  }

  /**
   * PAINT ALL SVGs
   * ----------------------------------------------------------------------
   * Goes through all of the Elements and gathers the proper Data from them
   * ----------------------------------------------------------------------
   * @param {Nodelist} svgs Nodelist of SVG Elements to draw onto
   * ----------------------------------------------------------------------
   */
  paintAllSVGs(svgs){
    for(let svg of svgs){
      let svgLink = svg.dataset.link;
      svg.innerHTML = this._svgDataObject[svgLink];
    }
  }

  get svgs(){ return this._svgs }
  set svgs(newSvgs){ this._svgs = newSvgs }
}