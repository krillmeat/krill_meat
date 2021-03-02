var debug, queryParams, drawZone, touchSwipe, doodleNames, productElems, productButtons;

window.onload = function(){
  init();
}

/** 
 * INITIALIZE
 * ----------------------------------------------------------------------
 * The inital Function that runs after the constructor
 * ----------------------------------------------------------------------
 */
function init(){
  setupDebug();
  setupClasses();
  setupEventListeners();
}

/**
 * SETUP EVENT LISTENERS
 * ----------------------------------------------------------------------
 * Attaches all Event Listeners to Elements
 * ----------------------------------------------------------------------
 */
function setupEventListeners(){
  document.querySelector("button.to-shop").addEventListener("click", gotoProducts);
  
  // Product Buttons
  productElems = document.querySelectorAll(".product");
  productButtons = document.querySelectorAll(".product button.product-image");
  for(let product of productElems){
    let productButton = product.querySelector("button.product-image");
    if(productButton){
      productButton.addEventListener("click",gotoProductInfo);
      product.querySelector("button.back").addEventListener("click",backtoProducts)
    } 
  }
}

/**
 * SETUP CLASSES
 * ----------------------------------------------------------------------
 * Sets up all Params and creates Class instances
 * ----------------------------------------------------------------------
 */
function setupClasses(){
  // Gather Variables to Pass to Classes
  doodleNames = ["krill","worm","sunshine","smiles"];
  drawZone = document.querySelector(".draw-zone");

  // Declare Classes
  svgLoader = new SVGLOADER(document.querySelectorAll("svg[data-type='svg']"),svgData);
  svgStage = new SVGSTAGE(doodleNames,drawZone,document.body);
  touchSwipe = new TOUCHSWIPE(drawZone,drawZone.querySelector(".doodle"),svgStage.eventCallback.bind(svgStage));
}

/**
 * SETUP DEBUG
 * ----------------------------------------------------------------------
 * Creates an instance of the Debug Class
 * ----------------------------------------------------------------------
 */
function setupDebug(){
  debug = new DEBUGTOOL(false,null,[8,8,16]);
}

/**
 * GO TO PRODUCTS
 * ----------------------------------------------------------------------
 * Switches the page status to the Shop view
 * ----------------------------------------------------------------------
 * @param {Event} e Event
 * ----------------------------------------------------------------------
 */
function gotoProducts(e){
  debug?.debugLog("EVENT [click] :: Go to Products...");
  document.body.dataset.state = "shop";
}

/**
 * BACK TO PRODUCTS
 * ----------------------------------------------------------------------
 * Goes back to the Shop view from a specific Product Info view
 * ----------------------------------------------------------------------
 * @param {Event} e Event
 * ----------------------------------------------------------------------
 */
function backtoProducts(e){
  document.querySelector(".shop-zone").dataset.state='shop';
  for(let product of document.querySelectorAll(".shop-zone .product")){
    product.style="";
    product.dataset.status = 'inactive';
  }
}

/**
 * BACK TO PRODUCT INFO
 * ----------------------------------------------------------------------
 * Switches the page status to the Product Info view
 * ----------------------------------------------------------------------
 * @param {Event} e Event
 * ----------------------------------------------------------------------
 */
function gotoProductInfo(e){
  debug?.debugLog("EVENT [click] :: Go to Product Info...");

  let productParent = e.currentTarget.parentElement.parentElement;
  document.querySelector(".shop-zone").dataset.state='info';
  for(let product of productElems){ product.dataset.status='hidden'}
  productParent.dataset.status='active';
  productParent.style.height = productParent.querySelector(".height-wrapper").offsetHeight + "px";
}