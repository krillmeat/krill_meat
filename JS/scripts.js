var debug, queryParams, drawZone, touchSwipe, doodleNames, productElems, productButtons;

window.onload = function(){
  init();
}

function init(){
  setupDebug();
  doodleNames = ["krill","worm","sunshine","smiles"];
  drawZone = document.querySelector(".draw-zone");
  touchSwipe = new TOUCHSWIPE(drawZone,drawZone.querySelector(".doodle"));
  svgStage = new SVGSTAGE(doodleNames,drawZone,document.body);

  document.querySelector("button.to-shop").addEventListener("click", gotoProducts);
  productElems = document.querySelectorAll(".product");
  productButtons = document.querySelectorAll(".product button");
  for(let product of productButtons){
    product.addEventListener("click",gotoProductInfo);
  }

}

function setupDebug(){
  debug = new DEBUGTOOL(false,null,[8,8,16]);
}

function gotoProducts(e){
  if(debug) debug.debugLog("EVENT [click] :: Go to Products...");
  document.body.dataset.state = "shop";
}

function gotoProductInfo(e){
  let productParent = e.currentTarget.parentElement.parentElement;
  if(debug) debug.debugLog("EVENT [click] :: Go to Product Info...");
  document.querySelector(".shop-zone").dataset.state='info';
  for(let product of productElems){ product.dataset.status='hidden'}
  productParent.dataset.status='active';
  productParent.style.height = productParent.querySelector(".height-wrapper").offsetHeight + "px";
}