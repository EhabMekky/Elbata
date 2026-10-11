(function () {
  const products = [
    { id: 1, name: "بطّة الاستحمام الكلاسيكية", description: "رفيقة مرحة بصفّارة صغيرة ولون أصفر لامع.", price: 85, category: "toys", categoryLabel: "ألعاب", image: "https://api.openverse.org/v1/images/c7904bc1-f4e3-4ae2-93c9-399ab0439ccc/thumb/", alt: "بطّات مطاطية صفراء", credit: { title: "Rubber Ducks with Sunglasses", creator: "DavidDennisPhotos.com", source: "https://www.flickr.com/photos/50852241@N00/70342823", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" } },
    { id: 2, name: "دمية بطّة قطنية", description: "قماش ناعم وحشو خفيف مناسب للحضن واللعب.", price: 240, category: "toys", categoryLabel: "ألعاب", image: "https://api.openverse.org/v1/images/d89e0fa9-1f04-4a60-a397-9352ff480c3d/thumb/", alt: "لعبة بطّة صفراء محشوة", credit: { title: "Squeaky yellow duck plush toy for dogs", creator: "DogLab", source: "https://www.flickr.com/photos/156497139@N02/32525592777", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" } },
    { id: 3, name: "كوب صباح البط", description: "كوب خزفي برسمة بطّة، يسع ٣٢٠ مل.", price: 175, category: "home", categoryLabel: "للمنزل", image: "https://api.openverse.org/v1/images/0d620f46-42cf-488a-b7e7-c793d4aecdd0/thumb/", alt: "مجسّم بطّة أبيض", credit: { title: "white duck toy (original)", creator: "g4ll4is", source: "https://www.flickr.com/photos/77281252@N02/7171888162", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" } },
    { id: 4, name: "مصباح البطة الليلي", description: "ضوء دافئ هادئ لغرفة النوم ومكتب المذاكرة.", price: 390, category: "home", categoryLabel: "للمنزل", image: "https://api.openverse.org/v1/images/1cd6f92b-03f1-4f7b-8a80-3c5598700ee3/thumb/", alt: "بطّة مطاطية صفراء", credit: { title: "Rubber Duck", creator: "Gastev", source: "https://www.flickr.com/photos/12148520@N00/2630867950", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" } },
    { id: 5, name: "طقم بطّات المزرعة", description: "ثلاث بطّات صغيرة بألوان مختلفة للّعب أو العرض.", price: 120, category: "toys", categoryLabel: "ألعاب", image: "https://api.openverse.org/v1/images/c2b70de9-b421-4dca-a87d-1827615bf07a/thumb/", alt: "أم بطّة تسبح مع فراخها", credit: { title: "Muscovy Mother and Her Ducklings", creator: "Charles Patrick Ewing", source: "https://www.flickr.com/photos/132033298@N04/30120599942", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" } },
    { id: 6, name: "حقيبة قماش بطّية", description: "حقيبة يومية خفيفة بطبعة بطّة مرحة.", price: 310, category: "gifts", categoryLabel: "هدايا", image: "https://api.openverse.org/v1/images/0183ac40-041a-4b52-a0d0-4ff8eed12754/thumb/", alt: "بطّة مطاطية كبيرة في بحيرة", credit: { title: "Rubber Duck in Seoul", creator: "travel oriented", source: "https://www.flickr.com/photos/99958070@N02/15347901968", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" } },
    { id: 7, name: "دفتر يوميات البطّة", description: "دفتر بغلاف ملوّن و٨٠ صفحة للخواطر والرسم.", price: 95, category: "gifts", categoryLabel: "هدايا", image: "https://api.openverse.org/v1/images/5990278a-baed-40da-b224-f9ad4cb74275/thumb/", alt: "فرخ بطّة صغير", credit: { title: "Duckling", creator: "Ben124.", source: "https://www.flickr.com/photos/9298216@N08/7160485639", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" } },
    { id: 8, name: "بروش ريشة صغيرة", description: "بروش معدني خفيف يضيف لمسة بطّية لطيفة.", price: 65, category: "gifts", categoryLabel: "هدايا", image: "https://api.openverse.org/v1/images/755e5214-8b28-4f16-8246-6f7fa386b3e2/thumb/", alt: "بطّة وبجوارها فرخ بطّة", credit: { title: "Duck and duckling", creator: "Ben124.", source: "https://www.flickr.com/photos/9298216@N08/7449127466", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" } }
  ];

  const cartKey = "duck-store-cart-v1";
  const orderKey = "duck-store-last-order-v1";
  const pendingOrderKey = "duck-store-pending-confirmation-v1";
  const money = new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 });

  try {
    window.localStorage.removeItem(orderKey);
  } catch {}

  function readLocal(key, fallback) {
    try {
      const serialized = window.localStorage.getItem(key);
      return serialized === null ? fallback : JSON.parse(serialized);
    } catch {
      return fallback;
    }
  }

  function writeLocal(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function readSession(key, fallback) {
    try {
      const serialized = window.sessionStorage.getItem(key);
      return serialized === null ? fallback : JSON.parse(serialized);
    } catch {
      return fallback;
    }
  }

  function writeSession(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function loadCart() {
    const stored = readLocal(cartKey, []);
    if (!Array.isArray(stored)) return new Map();

    return new Map(stored.filter((entry) => {
      if (!Array.isArray(entry) || entry.length !== 2) return false;
      const [productId, quantity] = entry;
      return products.some((product) => product.id === Number(productId)) && Number.isSafeInteger(quantity) && quantity > 0;
    }).map(([productId, quantity]) => [Number(productId), quantity]));
  }

  function saveCart(cart) {
    return writeLocal(cartKey, Array.from(cart.entries()));
  }

  function formatPrice(value) {
    return `${money.format(value)} ج.م`;
  }

  function cartItems(cart) {
    return Array.from(cart.entries()).flatMap(([productId, quantity]) => {
      const product = products.find((item) => item.id === productId);
      return product ? [{ id: product.id, name: product.name, price: product.price, quantity, lineTotal: product.price * quantity }] : [];
    });
  }

  function getSubtotal(cart) {
    return cartItems(cart).reduce((total, item) => total + item.lineTotal, 0);
  }

  function getDeliveryFee(subtotal, deliveryMethod) {
    return deliveryMethod === "pickup" || subtotal >= 500 || subtotal === 0 ? 0 : 50;
  }

  function createDemoOrder(customer) {
    const cart = loadCart();
    const items = cartItems(cart);
    if (items.length === 0) return null;

    const subtotal = getSubtotal(cart);
    const deliveryFee = getDeliveryFee(subtotal, customer.deliveryMethod);
    const order = {
      reference: `DUCK-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      customer,
      items,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee
    };

    if (!writeSession(orderKey, order)) return null;
    try {
      window.sessionStorage.setItem(pendingOrderKey, order.reference);
    } catch {
      window.sessionStorage.removeItem(orderKey);
      return null;
    }
    if (!writeLocal(cartKey, [])) {
      window.sessionStorage.removeItem(orderKey);
      window.sessionStorage.removeItem(pendingOrderKey);
      return null;
    }
    return order;
  }

  function consumeConfirmationOrder() {
    const order = readSession(orderKey, null);
    try {
      const pendingReference = window.sessionStorage.getItem(pendingOrderKey);
      window.sessionStorage.removeItem(pendingOrderKey);
      window.sessionStorage.removeItem(orderKey);
      return pendingReference === order?.reference ? order : null;
    } catch {
      return null;
    }
  }

  window.DuckStore = {
    products,
    formatPrice,
    loadCart,
    saveCart,
    cartItems,
    getSubtotal,
    getDeliveryFee,
    createDemoOrder,
    consumeConfirmationOrder
  };
})();