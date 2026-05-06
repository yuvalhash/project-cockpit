const productGrid = document.getElementById("product-grid");
const spreadChart = document.getElementById("spread-chart");
const reactionList = document.getElementById("reaction-list");
const comparisonBody = document.getElementById("comparison-body");

const formatPrice = (value) => `EUR ${value}`;

const withComputedMetrics = trackerData.products.map((product) => {
  const prices = product.offers.map((offer) => offer.price);
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  return {
    ...product,
    lowest,
    highest,
    gap: highest - lowest,
  };
});

const topSpread = Math.max(...withComputedMetrics.map((product) => product.gap));
const topPrice = Math.max(...withComputedMetrics.map((product) => product.highest));

document.getElementById("hero-products").textContent =
  `${withComputedMetrics.length} premium products`;
document.getElementById("hero-retailers").textContent =
  `${trackerData.retailers.length} sources`;
document.getElementById("hero-spread").textContent = formatPrice(topSpread);

withComputedMetrics
  .slice()
  .sort((left, right) => right.highest - left.highest)
  .forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageLink = document.createElement("a");
    imageLink.className = "product-image-link";
    imageLink.href = product.offers[0].url;
    imageLink.target = "_blank";
    imageLink.rel = "noreferrer";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.imageUrl;
    image.alt = product.name;
    image.loading = "lazy";
    imageLink.appendChild(image);

    const meta = document.createElement("p");
    meta.className = "product-meta";
    meta.textContent = `${product.category} · ${product.priceBand}`;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = `${formatPrice(product.highest)} highest tracked`;

    const subline = document.createElement("p");
    subline.className = "product-subline";
    subline.textContent = `${formatPrice(product.lowest)} low · ${formatPrice(product.gap)} gap`;

    const offerList = document.createElement("ol");
    offerList.className = "offer-rank-list";

    product.offers
      .slice()
      .sort((left, right) => left.price - right.price)
      .forEach((offer) => {
        const item = document.createElement("li");
        item.className = "offer-rank-item";
        item.innerHTML = `
          <span class="offer-rank-retailer">${offer.retailer}</span>
          <span class="offer-rank-price">${formatPrice(offer.price)}</span>
          <a href="${offer.url}" target="_blank" rel="noreferrer">Open</a>
        `;
        offerList.appendChild(item);
      });

    card.append(imageLink, meta, title, price, subline, offerList);
    productGrid.appendChild(card);
  });

withComputedMetrics
  .slice()
  .sort((left, right) => right.gap - left.gap)
  .forEach((product) => {
    const row = document.createElement("div");
    row.className = "chart-row";

    const label = document.createElement("div");
    label.className = "chart-label";
    label.textContent = product.name;

    const barTrack = document.createElement("div");
    barTrack.className = "bar-track";

    const bar = document.createElement("div");
    bar.className = "bar-fill";
    bar.style.width = `${(product.gap / topSpread) * 100}%`;
    barTrack.appendChild(bar);

    const value = document.createElement("div");
    value.className = "chart-value";
    value.textContent = `${formatPrice(product.gap)} spread`;

    row.append(label, barTrack, value);
    spreadChart.appendChild(row);
  });

trackerData.reactions.forEach((reaction) => {
  const item = document.createElement("article");
  item.className = "reaction-item";

  const title = document.createElement("h3");
  title.textContent = reaction.title;

  const detail = document.createElement("p");
  detail.textContent = reaction.detail;

  item.append(title, detail);
  reactionList.appendChild(item);
});

withComputedMetrics
  .slice()
  .sort((left, right) => right.highest - left.highest)
  .forEach((product) => {
    const block = document.createElement("article");
    block.className = "comparison-card";
    const offersMarkup = product.offers
      .slice()
      .sort((left, right) => left.price - right.price)
      .map(
        (offer, index) => `
          <li class="comparison-offer">
            <span class="comparison-rank">${index + 1}</span>
            <span class="comparison-retailer">${offer.retailer}</span>
            <span class="comparison-price">${formatPrice(offer.price)}</span>
            <a href="${offer.url}" target="_blank" rel="noreferrer">Visit site</a>
          </li>
        `
      )
      .join("");

    block.innerHTML = `
      <div class="comparison-header">
        <img class="comparison-image" src="${product.imageUrl}" alt="${product.name}" loading="lazy" />
        <div>
          <p class="comparison-kicker">${product.category} · ${product.priceBand}</p>
          <h3>${product.name}</h3>
          <p class="comparison-summary">
            Lowest ${formatPrice(product.lowest)} · Highest ${formatPrice(product.highest)} · Gap ${formatPrice(product.gap)}
          </p>
        </div>
      </div>
      <ol class="comparison-offers">
        ${offersMarkup}
      </ol>
    `;
    comparisonBody.appendChild(block);
  });
