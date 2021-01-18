const CHANGING_INTERVAL_MS = 5000;
const CONTAINER = document.querySelector('.background');

changeImg(getImgURL());

async function main() {
  const url = await downloadImg();
  changeImg(url);
  toggleZoom();
  setTimeout(() => {
    main();
  }, CHANGING_INTERVAL_MS);
}

main();

function changeImg(url) {
  CONTAINER.style.backgroundImage = `url(${url})`;
}

function toggleZoom() {
  CONTAINER.classList.toggle('zoom');
}

async function downloadImg() {
  const img = await (await fetch(getImgURL())).blob();
  const url = URL.createObjectURL(img);
  return url;
}

function getContainerSize() {
  const { height, width } = CONTAINER.getBoundingClientRect();
  return `${width.toFixed(0)}x${height.toFixed(0)}`;
}

function getImgURL() {
  return `https://source.unsplash.com/random/${getContainerSize()}`;
}
