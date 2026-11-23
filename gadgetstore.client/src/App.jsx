import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";
import Registration, { AccountSummary } from "./Registration";

const PRODUCTS = [
    { id: 1, image: "/products/logitech-g-pro-x-superlight.png", name: "Logitech G Pro X Superlight", brand: "Logitech", price: 45000, category: "Мыши", description: "Ультралёгкая киберспортивная мышь с сенсором HERO 25K.", type: "mouse", stores: ["TechStore", "Sulpak", "MechKeyboard KZ"] },
    { id: 2, image: "/products/logitech-g915-lightspeed.png", name: "Logitech G915 Lightspeed", brand: "Logitech", price: 78000, category: "Клавиатуры", description: "Беспроводная низкопрофильная механическая клавиатура с RGB.", type: "keyboard", stores: ["Technodom", "MechKeyboard KZ"] },
    { id: 3, image: "/products/razer-viper-v3-pro.png", name: "Razer Viper V3 Pro", brand: "Razer", price: 52000, category: "Мыши", description: "Симметричная мышь для соревновательного гейминга.", type: "mouse", stores: ["Sulpak", "MechKeyboard KZ"] },
    { id: 4, image: "/products/razer-blackwidow-v4-pro.png", name: "Razer BlackWidow V4 Pro", brand: "Razer", price: 85000, category: "Клавиатуры", description: "Механическая клавиатура с командным колесом и Razer Chroma.", type: "keyboard", stores: ["Technodom", "Sulpak"] },
    { id: 5, image: "/products/steelseries-apex-pro.png", name: "SteelSeries Apex Pro", brand: "SteelSeries", price: 67000, category: "Клавиатуры", description: "Клавиатура с регулируемой точкой срабатывания клавиш.", type: "keyboard", stores: ["TechStore", "Sulpak"] },
    { id: 6, image: "/products/steelseries-arctis-nova-pro.png", name: "SteelSeries Arctis Nova Pro", brand: "SteelSeries", price: 95000, category: "Наушники", description: "Игровая гарнитура с активным шумоподавлением.", type: "headset", stores: ["Technodom", "MechKeyboard KZ"] },
    { id: 7, image: "/products/hyperx-alloy-origins.png", name: "HyperX Alloy Origins", brand: "HyperX", price: 38000, category: "Клавиатуры", description: "Прочный алюминиевый корпус и фирменные механические свитчи.", type: "keyboard", stores: ["Sulpak", "TechStore"] },
    { id: 8, image: "/products/hyperx-cloud-alpha-wireless.png", name: "HyperX Cloud Alpha Wireless", brand: "HyperX", price: 59000, category: "Наушники", description: "Беспроводная игровая гарнитура с длительным временем работы.", type: "headset", stores: ["Technodom", "Sulpak"] },
    { id: 9, image: "/products/logitech-g502-x.png", name: "Logitech G502 X", brand: "Logitech", price: 34990, category: "Мыши", description: "Универсальная игровая мышь с точным сенсором и программируемыми кнопками.", type: "mouse", stores: ["Sulpak", "Technodom"] },
    { id: 10, image: "/products/logitech-g305.png", name: "Logitech G305 Lightspeed", brand: "Logitech", price: 21990, category: "Мыши", description: "Компактная беспроводная мышь с низкой задержкой.", type: "mouse", stores: ["Sulpak", "TechStore"] },
    { id: 11, image: "/products/logitech-g733.png", name: "Logitech G733 Lightspeed", brand: "Logitech", price: 49990, category: "Наушники", description: "Лёгкая беспроводная гарнитура с объёмным звуком.", type: "headset", stores: ["Technodom", "Sulpak"] },
    { id: 12, image: "/products/logitech-g pro keyboard.png", name: "Logitech G Pro X TKL", brand: "Logitech", price: 62990, category: "Клавиатуры", description: "Компактная механическая клавиатура для соревновательных игр.", type: "keyboard", stores: ["TechStore"] },
    { id: 13, image: "/products/razer-deathadder-v3.png", name: "Razer DeathAdder V3", brand: "Razer", price: 39990, category: "Мыши", description: "Эргономичная мышь с быстрым оптическим сенсором.", type: "mouse", stores: ["Sulpak", "Technodom"] },
    { id: 14, image: "/products/razer-basilisk-v3.png", name: "Razer Basilisk V3", brand: "Razer", price: 32990, category: "Мыши", description: "Настраиваемая мышь с колёсиком HyperScroll и RGB.", type: "mouse", stores: ["Sulpak"] },
    { id: 15, image: "/products/razer-huntsman-mini.png", name: "Razer Huntsman Mini", brand: "Razer", price: 45990, category: "Клавиатуры", description: "Компактная оптическая клавиатура формата 60%.", type: "keyboard", stores: ["Technodom"] },
    { id: 16, image: "/products/razer-blackshark-v2.png", name: "Razer BlackShark V2", brand: "Razer", price: 31990, category: "Наушники", description: "Гарнитура с чистым позиционным звуком и удобными амбушюрами.", type: "headset", stores: ["Sulpak", "TechStore"] },
    { id: 17, image: "/products/steelseries-rival-5.png", name: "SteelSeries Rival 5", brand: "SteelSeries", price: 28990, category: "Мыши", description: "Многофункциональная игровая мышь с дополнительными кнопками.", type: "mouse", stores: ["Technodom"] },
    { id: 18, image: "/products/steelseries-prime.png", name: "SteelSeries Prime", brand: "SteelSeries", price: 25990, category: "Мыши", description: "Лёгкая мышь с оптическими магнитными переключателями.", type: "mouse", stores: ["TechStore"] },
    { id: 19, image: "/products/steelseries-apex-7.png", name: "SteelSeries Apex 7", brand: "SteelSeries", price: 54990, category: "Клавиатуры", description: "Механическая клавиатура с OLED-дисплеем и упором для рук.", type: "keyboard", stores: ["Sulpak"] },
    { id: 20, image: "/products/steelseries-arctis-7.png", name: "SteelSeries Arctis 7+", brand: "SteelSeries", price: 64990, category: "Наушники", description: "Беспроводная гарнитура с качественным микрофоном.", type: "headset", stores: ["Technodom"] },
    { id: 21, image: "/products/hyperx-pulsefire-haste.png", name: "HyperX Pulsefire Haste 2", brand: "HyperX", price: 27990, category: "Мыши", description: "Лёгкая скоростная мышь с точным сенсором.", type: "mouse", stores: ["Sulpak", "TechStore"] },
    { id: 22, image: "/products/hyperx-alloy-origins-core.png", name: "HyperX Alloy Origins Core", brand: "HyperX", price: 32990, category: "Клавиатуры", description: "Надёжная компактная механическая клавиатура без цифрового блока.", type: "keyboard", stores: ["Technodom"] },
    { id: 23, image: "/products/hyperx-cloud-iii.png", name: "HyperX Cloud III", brand: "HyperX", price: 42990, category: "Наушники", description: "Комфортная гарнитура с объёмным звуком и съёмным микрофоном.", type: "headset", stores: ["Sulpak"] },
    { id: 24, image: "/products/corsair-k70.png", name: "Corsair K70 RGB Pro", brand: "Corsair", price: 69990, category: "Клавиатуры", description: "Полноразмерная механическая клавиатура с RGB-подсветкой.", type: "keyboard", stores: ["TechStore", "Technodom"] },
    { id: 25, image: "/products/corsair-dark-core.png", name: "Corsair Dark Core RGB Pro", brand: "Corsair", price: 45990, category: "Мыши", description: "Беспроводная мышь с настраиваемыми боковыми накладками.", type: "mouse", stores: ["Sulpak"] },
    { id: 26, image: "/products/corsair-void.png", name: "Corsair HS80 RGB Wireless", brand: "Corsair", price: 57990, category: "Наушники", description: "Беспроводная гарнитура с пространственным аудио.", type: "headset", stores: ["Technodom"] },
    { id: 27, image: "/products/asus-rog-keris.png", name: "ASUS ROG Keris II Ace", brand: "ASUS", price: 59990, category: "Мыши", description: "Лёгкая беспроводная игровая мышь для точного управления.", type: "mouse", stores: ["TechStore"] },
    { id: 28, image: "/products/asus-rog-strix-scope.png", name: "ASUS ROG Strix Scope II", brand: "ASUS", price: 64990, category: "Клавиатуры", description: "Игровая клавиатура с горячей заменой переключателей.", type: "keyboard", stores: ["Technodom"] },
    { id: 29, image: "/products/steelseries-qck.png", name: "SteelSeries QcK Large", brand: "SteelSeries", price: 8990, category: "Коврики", description: "Большой тканевый коврик с нескользящей резиновой основой.", type: "mousepad", stores: ["Sulpak", "TechStore"] },
    { id: 30, image: "/products/logitech-blue-yeti.png", name: "Logitech Blue Yeti", brand: "Logitech", price: 49990, category: "Микрофоны", description: "USB-микрофон для стримов, подкастов и голосового чата.", type: "mic", stores: ["Technodom"] },
    { id: 31, image: "/products/elgato-wave-3.png", name: "Elgato Wave:3", brand: "Elgato", price: 69990, category: "Микрофоны", description: "Конденсаторный USB-микрофон с удобным управлением уровнями.", type: "mic", stores: ["TechStore"] },
    { id: 32, image: "/products/logitech-c920.png", name: "Logitech C920 HD Pro", brand: "Logitech", price: 29990, category: "Веб-камеры", description: "Веб-камера Full HD для стримов, встреч и онлайн-игр.", type: "camera", stores: ["Sulpak"] },
    { id: 33, image: "/products/elgato-stream-deck.png", name: "Elgato Stream Deck MK.2", brand: "Elgato", price: 79990, category: "Стриминг", description: "Панель управления сценами, приложениями и действиями стримера.", type: "streaming", stores: ["TechStore"] },
    { id: 34, image: "/products/razer-seiren-mini.png", name: "Razer Seiren Mini", brand: "Razer", price: 21990, category: "Микрофоны", description: "Компактный микрофон для чистого голоса на стримах.", type: "mic", stores: ["Sulpak"] },
    { id: 35, image: "/products/logitech-g240.png", name: "Logitech G240", brand: "Logitech", price: 6990, category: "Коврики", description: "Тонкий тканевый коврик с ровной поверхностью для сенсора.", type: "mousepad", stores: ["Technodom"] },
    { id: 36, image: "/products/razer-kiyo.png", name: "Razer Kiyo", brand: "Razer", price: 39990, category: "Веб-камеры", description: "Веб-камера для стриминга со встроенной подсветкой.", type: "camera", stores: ["TechStore"] }
];


const DEMO_REVIEWS = {
    mouse: [
        { name: "aimKZ", game: "Valorant", rating: 5, text: "Лёгкая, удобно контролировать при резких фликах. Для моего хвата подошла отлично.", pro: true },
        { name: "pixelRush", game: "CS2", rating: 4, text: "Хорошее ощущение сенсора и быстрый отклик. Хотелось бы чуть больше боковых кнопок.", pro: true }
    ],
    keyboard: [
        { name: "NeoFrag", game: "Counter-Strike 2", rating: 5, text: "Комфортно нажимать клавиши в напряжённых раундах, корпус ощущается надёжным.", pro: true },
        { name: "LunaGG", game: "Valorant", rating: 4, text: "Приятный ход клавиш и удобно настраивать под себя. К раскладке привыкла быстро.", pro: true }
    ],
    headset: [
        { name: "SoundClutch", game: "Apex Legends", rating: 5, text: "Шаги и направления звука различимы хорошо, микрофон подходит для командной связи.", pro: true },
        { name: "RiftKZ", game: "Dota 2", rating: 4, text: "Комфортно сидеть несколько часов. Звук приятный, посадку лучше проверить под свою голову.", pro: true }
    ],
    mousepad: [
        { name: "aimKZ", game: "Valorant", rating: 5, text: "Ровная поверхность и предсказуемое скольжение. Хороший вариант для низкой чувствительности.", pro: true }
    ],
    mic: [
        { name: "StreamFox", game: "Стриминг", rating: 5, text: "Голос звучит чисто, настройки понятные. Для качественного результата важно правильно выставить уровень.", pro: true }
    ],
    camera: [
        { name: "StreamFox", game: "Стриминг", rating: 4, text: "Для трансляций и общения качество хорошее при нормальном освещении.", pro: true }
    ],
    streaming: [
        { name: "StreamFox", game: "Стриминг", rating: 5, text: "Удобно назначить быстрые действия и переключать сцены во время эфира.", pro: true }
    ]
};

const PICKUP_POINTS = [
    { id: "astana-turan", city: "Астана", address: "пр. Туран, 24" },
    { id: "astana-kabanbay", city: "Астана", address: "пр. Кабанбай батыра, 40" },
    { id: "almaty-dostyk", city: "Алматы", address: "ул. Достык, 10" },
    { id: "almaty-abay", city: "Алматы", address: "пр. Абая, 109" },
    { id: "shymkent-tauke", city: "Шымкент", address: "ул. Тауке хана, 5" },
    { id: "kostanay-farab", city: "Костанай", address: "ул. Аль-Фараби, 65" }
];

const money = (n) => `${Number(n).toLocaleString("ru-RU")} ₸`;
const readStorage = (key, fallback) => {
    try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
    catch { return fallback; }
};

function ProductImage({ product, large = false }) {
    const [failed, setFailed] = useState(false);
    return (
        <div className={`product-image ${large ? "product-image-large" : ""}`}>
            {!failed ? (
                <img src={product.image} alt={product.name} loading="lazy" onError={() => setFailed(true)} />
            ) : (
                <div className="image-placeholder">
                    <span>{product.type === "mouse" ? "🖱️" : product.type === "keyboard" ? "⌨️" : product.type === "headset" ? "🎧" : product.type === "mousepad" ? "▧" : product.type === "mic" ? "🎙️" : product.type === "camera" ? "📷" : product.type === "streaming" ? "🎛️" : "🎮"}</span>
                    <small>Добавьте PNG товара<br />в public/products</small>
                </div>
            )}
        </div>
    );
}

function Modal({ title, onClose, children, wide = false, fullscreen = false }) {
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);
    return (
        <div className={`modal-backdrop ${fullscreen ? "modal-backdrop-fullscreen" : ""}`} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <section className={`modal ${wide ? "modal-wide" : ""} ${fullscreen ? "modal-fullscreen" : ""}`} role="dialog" aria-modal="true" aria-label={title}>
                <div className="modal-heading"><div><p className="eyebrow">NEXUSGEAR</p><h2>{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Закрыть">✕</button></div>
                {children}
            </section>
        </div>
    );
}

export default function App() {
    const [search, setSearch] = useState("");
    const [brand, setBrand] = useState("Все бренды");
    const [category, setCategory] = useState("Все категории");
    const [sort, setSort] = useState("recommended");
    const [favoritesOnly, setFavoritesOnly] = useState(false);
    const [favorites, setFavorites] = useState(() => readStorage("ng-favorites", []));
    const [cart, setCart] = useState(() => readStorage("ng-cart", []));
    const [orders, setOrders] = useState(() => readStorage("ng-orders", []));
    const [profile, setProfile] = useState(() => readStorage("ng-profile", { name: "", email: "", phone: "", pickupId: "astana-turan", pickupAddress: "", pickupCarrier: "Ozon", pickupCity: "Астана" }));
    const [account, setAccount] = useState(() => readStorage("ng-account", null));
    const [activeProduct, setActiveProduct] = useState(null);
    const [panel, setPanel] = useState("");
    const [notice, setNotice] = useState("");
    const [orderLookup, setOrderLookup] = useState("");
    const [reviews, setReviews] = useState(() => readStorage("ng-reviews", {}));
    const [reviewName, setReviewName] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewText, setReviewText] = useState("");

    useEffect(() => localStorage.setItem("ng-favorites", JSON.stringify(favorites)), [favorites]);
    useEffect(() => localStorage.setItem("ng-cart", JSON.stringify(cart)), [cart]);
    useEffect(() => localStorage.setItem("ng-orders", JSON.stringify(orders)), [orders]);
    useEffect(() => localStorage.setItem("ng-profile", JSON.stringify(profile)), [profile]);
    useEffect(() => localStorage.setItem("ng-account", JSON.stringify(account)), [account]);
    useEffect(() => localStorage.setItem("ng-reviews", JSON.stringify(reviews)), [reviews]);
    useEffect(() => {
        if (!notice) return;
        const timer = setTimeout(() => setNotice(""), 2800);
        return () => clearTimeout(timer);
    }, [notice]);

    const filtered = useMemo(() => PRODUCTS
        .filter(p => brand === "Все бренды" || p.brand === brand)
        .filter(p => category === "Все категории" || p.category === category)
        .filter(p => !favoritesOnly || favorites.includes(p.id))
        .filter(p => `${p.name} ${p.brand} ${p.description}`.toLowerCase().includes(search.trim().toLowerCase()))
        .sort((a, b) => sort === "cheap" ? a.price - b.price : sort === "expensive" ? b.price - a.price : sort === "name" ? a.name.localeCompare(b.name, "ru") : a.id - b.id),
        [brand, category, favoritesOnly, favorites, search, sort]);

    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const presetPickup = PICKUP_POINTS.find(p => p.id === profile.pickupId) || PICKUP_POINTS[0];
    const pickup = profile.pickupAddress?.trim() ? { city: profile.pickupCity || presetPickup.city, address: profile.pickupAddress.trim() } : presetPickup;
    const mapQuery = `${profile.pickupCarrier || "Ozon"} пункт выдачи ${profile.pickupCity || pickup.city}`;
    const googleMapsSearch = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

    function submitReview(e) {
        e.preventDefault();
        if (!activeProduct || !reviewName.trim() || !reviewText.trim()) return;
        const review = { name: reviewName.trim(), rating: Number(reviewRating), text: reviewText.trim(), game: "Покупатель", pro: false, date: new Date().toLocaleDateString("ru-RU") };
        setReviews(prev => ({ ...prev, [activeProduct.id]: [review, ...(prev[activeProduct.id] || [])] }));
        setReviewName("");
        setReviewRating(5);
        setReviewText("");
        setNotice("Спасибо! Ваш отзыв добавлен");
    }

    function addToCart(product) {
        setCart(prev => {
            const found = prev.find(item => item.id === product.id);
            return found ? prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...prev, { ...product, qty: 1 }];
        });
        setNotice(`${product.name} добавлен в корзину`);
    }
    function changeQty(id, amount) {
        setCart(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + amount } : item).filter(item => item.qty > 0));
    }
    function registerAccount(acc) {
        setAccount(acc);
        setProfile(p => ({ ...p, name: acc.name, email: acc.email, phone: acc.phone, pickupCity: acc.city, pickupAddress: "" }));
        setPanel("");
        setNotice(acc.role === "seller" ? `Магазин «${acc.shop.name}» создан` : "Регистрация завершена");
    }
    function logout() {
        setAccount(null);
        setNotice("Вы вышли из аккаунта");
    }
    function checkout() {
        if (!cart.length) return;
        if (!profile.name.trim() || !profile.phone.trim()) {
            setPanel("profile");
            setNotice("Заполните имя и телефон в профиле перед оформлением заказа");
            return;
        }
        const order = {
            id: String(Date.now()).slice(-8),
            date: new Date().toLocaleDateString("ru-RU"),
            status: "Принят",
            items: cart.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
            total: cartTotal,
            pickup: `${pickup.city}, ${pickup.address}`
        };
        setOrders(prev => [order, ...prev]);
        setCart([]);
        setPanel("orders");
        setNotice(`Заказ №${order.id} оформлен`);
    }

    return (
        <div className="app-shell">
            <header className="topbar">
                <a className="logo" href="#" onClick={e => { e.preventDefault(); setBrand("Все бренды"); setFavoritesOnly(false); }}>NEXUS<span>GEAR</span></a>
                <div className="top-search"><span>⌕</span><input aria-label="Поиск" placeholder="Найти мышь, клавиатуру, гарнитуру..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                <nav className="top-actions">
                    <button className={`nav-button ${favoritesOnly ? "nav-active" : ""}`} onClick={() => setFavoritesOnly(v => !v)}>♡ <span>Избранное</span><b>{favorites.length}</b></button>
                    <button className="nav-button" onClick={() => setPanel("orders")}>▤ <span>Заказы</span></button>
                    {!account && <button className="nav-button" onClick={() => setPanel("register")}>✚ <span>Регистрация</span></button>}
                    <button className="nav-button" onClick={() => setPanel("profile")}>♙ <span>Профиль</span></button>
                    <button className="cart-button" onClick={() => setPanel("cart")}>Корзина <b>{cartCount}</b></button>
                </nav>
            </header>

            <main className="page">
                <section className="hero">
                    <div><p className="eyebrow">ПЕРИФЕРИЯ ДЛЯ ПОБЕД</p><h1>Твой сетап.<br /><span>Твои правила.</span></h1><p className="hero-copy">Игровые устройства, которые помогают играть точнее, быстрее и комфортнее.</p><button className="primary-button" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>Перейти в каталог <span>↘</span></button></div>
                    <div className="hero-art" aria-hidden="true"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-device">⌨</div><div className="hero-chip chip-one">LOW LATENCY</div><div className="hero-chip chip-two">PRO GEAR</div></div>
                </section>

                <section className="delivery-strip">
                    <div className="delivery-icon">⌖</div><div className="delivery-text"><strong>Самовывоз из пункта выдачи</strong><span>{pickup.city}, {pickup.address}</span></div><button className="text-button" onClick={() => setPanel("profile")}>Изменить ПВЗ ↗</button>
                    <div className="delivery-separator" /><div className="delivery-icon">✓</div><div className="delivery-text"><strong>Твой заказ под контролем</strong><span>История и статусы в личном кабинете</span></div><button className="text-button" onClick={() => setPanel("orders")}>Мои заказы ↗</button>
                </section>

                <section id="catalog" className="catalog-section">
                    <div className="section-head"><div><p className="eyebrow">ВЫБИРАЙ СВОЁ</p><h2>Каталог устройств</h2></div><span className="result-count">{filtered.length} товаров</span></div>
                    <div className="filters">
                        <div className="brand-pills">{["Все бренды", ...new Set(PRODUCTS.map(p => p.brand))].map(item => <button key={item} className={`pill ${brand === item ? "pill-selected" : ""}`} onClick={() => setBrand(item)}>{item}</button>)}</div>
                        <div className="filter-controls">
                            <select aria-label="Категория" value={category} onChange={e => setCategory(e.target.value)}><option>Все категории</option>{[...new Set(PRODUCTS.map(p => p.category))].map(item => <option key={item}>{item}</option>)}</select>
                            <select aria-label="Сортировка" value={sort} onChange={e => setSort(e.target.value)}><option value="recommended">Рекомендуемые</option><option value="cheap">Сначала дешевле</option><option value="expensive">Сначала дороже</option><option value="name">По названию</option></select>
                            <button className="reset-button" onClick={() => { setSearch(""); setBrand("Все бренды"); setCategory("Все категории"); setSort("recommended"); setFavoritesOnly(false); }}>Сбросить</button>
                        </div>
                    </div>

                    {filtered.length ? <div className="product-grid">{filtered.map(product => <article className="product-card" key={product.id}>
                        <div className="product-visual" onClick={() => setActiveProduct(product)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setActiveProduct(product)}>
                            <span className="brand-tag">{product.brand}</span><span className="product-stock">В наличии</span>
                            <button className={`favorite-toggle ${favorites.includes(product.id) ? "is-favorite" : ""}`} aria-label="Добавить в избранное" onClick={e => { e.stopPropagation(); setFavorites(prev => prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]); }}> {favorites.includes(product.id) ? "♥" : "♡"} </button>
                            <ProductImage product={product} />
                        </div>
                        <div className="product-info"><span className="product-category">{product.category}</span><div className="product-rating"><span>★★★★★</span><small> 4.{(product.id % 3) + 7} · выбор геймеров</small></div><h3>{product.name}</h3><p>{product.description}</p><div className="product-bottom"><strong>{money(product.price)}</strong><button className="add-button" onClick={() => addToCart(product)} aria-label={`Добавить ${product.name} в корзину`}>＋</button></div><button className="details-link" onClick={() => setActiveProduct(product)}>Подробнее о товаре <span>↗</span></button></div>
                    </article>)}</div> : <div className="empty-state"><span>⌕</span><h3>Ничего не найдено</h3><p>Попробуйте изменить запрос или фильтры.</p></div>}
                </section>
                <footer className="footer"><a className="logo" href="#">NEXUS<span>GEAR</span></a><span>Играй на своём уровне.</span><span>© {new Date().getFullYear()} NEXUSGEAR · Демонстрационный магазин</span></footer>
            </main>

            {notice && <div className="toast" role="status">{notice}</div>}

            {activeProduct && <Modal title="О товаре" onClose={() => setActiveProduct(null)} wide fullscreen>
                <div className="detail-layout"><ProductImage product={activeProduct} large /><div className="detail-copy">
                    <span className="product-category">{activeProduct.brand} / {activeProduct.category}</span><h3>{activeProduct.name}</h3><p>{activeProduct.description}</p>
                    <strong className="detail-price">{money(activeProduct.price)}</strong>
                    <div className="detail-block"><h4>Где можно купить</h4><div className="store-tags">{activeProduct.stores.map(s => <span key={s}>{s}</span>)}</div></div>
                    <div className="detail-block"><h4>Пункт выдачи</h4><p>{pickup.city}, {pickup.address}</p><button className="text-button" onClick={() => { setActiveProduct(null); setPanel("profile"); }}>Изменить ПВЗ ↗</button></div>
                    <button className="primary-button full-button" onClick={() => { addToCart(activeProduct); setActiveProduct(null); }}>Добавить в корзину — {money(activeProduct.price)}</button>
                </div></div>
                <section className="reviews-section">
                    <div className="reviews-heading"><div><p className="eyebrow">ОПЫТ ИСПОЛЬЗОВАНИЯ</p><h3>Отзывы покупателей</h3></div><span className="reviews-average">★ {(4.6 + (activeProduct.id % 4) * 0.1).toFixed(1)} <small>/ 5</small></span></div>
                    <p className="reviews-disclaimer">Демонстрационные примеры для оформления. Это не подтверждённые отзывы реальных киберспортсменов.</p>
                    <div className="review-list">
                        {[...(DEMO_REVIEWS[activeProduct.type] || DEMO_REVIEWS.mouse), ...(reviews[activeProduct.id] || [])].map((r, i) => <article className="review-card" key={`${r.name}-${i}`}>
                            <div className="review-top"><div className="review-avatar">{r.name.charAt(0).toUpperCase()}</div><div className="review-author"><strong>{r.name}</strong><span>{r.game || "Покупатель"}{r.pro ? " · пример мнения игрока" : " · покупатель"}</span></div><span className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span></div>
                            <p>{r.text}</p>{r.date && <small className="review-date">{r.date}</small>}
                        </article>)}
                    </div>
                    <form className="review-form" onSubmit={submitReview}><h4>Оставить свой отзыв</h4>
                        <label>Ваше имя<input required value={reviewName} onChange={e => setReviewName(e.target.value)} placeholder="Например, PlayerKZ" maxLength={40} /></label>
                        <label>Оценка<select value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))}><option value={5}>★★★★★ — Отлично</option><option value={4}>★★★★☆ — Хорошо</option><option value={3}>★★★☆☆ — Нормально</option><option value={2}>★★☆☆☆ — Плохо</option><option value={1}>★☆☆☆☆ — Очень плохо</option></select></label>
                        <label>Комментарий<textarea required value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Что понравилось или что можно улучшить?" maxLength={500} rows={3} /></label>
                        <button className="primary-button" type="submit">Опубликовать отзыв ↗</button>
                    </form>
                </section>
            </Modal>}

            {panel === "register" && <Registration onClose={() => setPanel("")} onComplete={registerAccount} />}

            {panel === "profile" && <section className="account-page" aria-label="Личный кабинет">
                <div className="account-top"><button className="secondary-button" onClick={() => setPanel("")}>← Вернуться в магазин</button><span className="eyebrow">NEXUSGEAR · ЛИЧНЫЙ КАБИНЕТ</span></div>
                <div className="account-heading"><div className="account-avatar">{profile.name.trim() ? profile.name.trim().charAt(0).toUpperCase() : "♙"}</div><div><p className="eyebrow">РАДЫ ВАС ВИДЕТЬ</p><h1>{profile.name.trim() || "Мой профиль"}</h1><p>Управляйте личными данными, доставкой и заказами в одном месте.</p></div></div>
                <div className="account-layout"><aside className="account-menu"><button className="account-menu-item selected">♙ <span>Личные данные</span></button><button className="account-menu-item" onClick={() => setPanel("orders")}>▤ <span>Мои заказы</span><b>{orders.length}</b></button><button className="account-menu-item" onClick={() => { setPanel(""); setNotice("Избранное можно открыть в верхнем меню магазина"); }}>♡ <span>Избранное</span><b>{favorites.length}</b></button><button className="account-menu-item" onClick={() => setPanel("cart")}>🛒 <span>Корзина</span><b>{cartCount}</b></button></aside>
                    <div className="account-main">
                        <AccountSummary account={account} onRegister={() => setPanel("register")} onLogout={logout} />
                        <div className="account-card"><div className="account-card-heading"><div><p className="eyebrow">ВАША УЧЁТНАЯ ЗАПИСЬ</p><h2>Личные данные</h2><p>Измените данные и сохраните их — они будут использоваться при оформлении заказа.</p></div><span className="account-status">● Локальный профиль</span></div>
                            <form className="form-stack account-form" onSubmit={e => { e.preventDefault(); setNotice("Изменения профиля сохранены"); }}>
                                <div className="account-fields"><label>Имя и фамилия<input required value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Как к вам обращаться" /></label><label>Email<input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="name@example.com" /></label><label>Телефон<input required value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="+7 ___ ___ __ __" /></label></div>
                                <div className="account-divider" /><div className="account-card-heading pickup-heading"><div><p className="eyebrow">ДОСТАВКА</p><h2>Мой пункт выдачи</h2><p>Выберите удобный пункт для получения заказов.</p></div><span className="pickup-big-icon">⌖</span></div>
                                <div className="pickup-map-tools">
                                    <div className="pickup-controls">
                                        <label>Город<select value={profile.pickupCity || pickup.city} onChange={e => setProfile({ ...profile, pickupCity: e.target.value, pickupAddress: "" })}><option>Астана</option><option>Алматы</option><option>Шымкент</option><option>Караганда</option><option>Актобе</option><option>Костанай</option><option>Павлодар</option><option>Усть-Каменогорск</option><option>Семей</option><option>Тараз</option><option>Кызылорда</option><option>Атырау</option><option>Актау</option><option>Петропавловск</option><option>Кокшетау</option><option>Талдыкорган</option><option>Туркестан</option></select></label>
                                        <label>Служба доставки<select value={profile.pickupCarrier || "Ozon"} onChange={e => setProfile({ ...profile, pickupCarrier: e.target.value })}><option>Ozon</option><option>Wildberries</option><option>Ozon и Wildberries</option></select></label>
                                    </div>
                                    <div className="pickup-map-actions"><a className="secondary-button" href={googleMapsSearch(mapQuery)} target="_blank" rel="noreferrer">Открыть ПВЗ на Google Maps ↗</a><a className="map-link" href={googleMapsSearch(`Ozon пункт выдачи ${profile.pickupCity || pickup.city}`)} target="_blank" rel="noreferrer">Ozon</a><a className="map-link" href={googleMapsSearch(`Wildberries пункт выдачи ${profile.pickupCity || pickup.city}`)} target="_blank" rel="noreferrer">Wildberries</a></div>
                                    <iframe className="pickup-map-frame" title="Карта пунктов выдачи" loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`} referrerPolicy="no-referrer-when-downgrade" />
                                    <p className="pickup-map-hint">На карте показаны результаты поиска Google. Чтобы выбрать конкретный ПВЗ, откройте карту, нажмите на нужную точку и скопируйте адрес в поле ниже. Автоматически передать выбранную точку из Google Maps на сайт без Google Maps API нельзя.</p>
                                    <label>Адрес выбранного ПВЗ<input value={profile.pickupAddress || ""} onChange={e => setProfile({ ...profile, pickupAddress: e.target.value, pickupId: "" })} placeholder="Например: улица и номер дома" /></label>
                                    <label>Или выбрать пример из списка<select value={profile.pickupId || ""} onChange={e => { const p = PICKUP_POINTS.find(item => item.id === e.target.value); setProfile({ ...profile, pickupId: e.target.value, pickupAddress: "", pickupCity: p?.city || profile.pickupCity }); }}><option value="">Выберу адрес на карте</option>{PICKUP_POINTS.map(p => <option key={p.id} value={p.id}>{p.city} — {p.address} (пример)</option>)}</select></label>
                                </div>
                                <div className="pickup-preview"><span>⌖</span><div><strong>{pickup.city} · {profile.pickupCarrier || "Ozon"}</strong><p>{pickup.address || "Адрес ещё не выбран"}</p><small>Выбранный адрес сохранится в профиле и будет указан в заказе.</small></div></div>
                                <div className="account-save-row"><span>Изменения сохраняются в этом браузере.</span><button className="primary-button" type="submit">Сохранить изменения ↗</button></div>
                            </form></div>
                        <div className="account-mini-cards"><button className="account-mini-card" onClick={() => setPanel("orders")}><span>▤</span><div><strong>Мои заказы</strong><small>{orders.length ? `${orders.length} оформлено` : "История заказов пока пуста"}</small></div><b>↗</b></button><button className="account-mini-card" onClick={() => setPanel("cart")}><span>🛒</span><div><strong>Корзина</strong><small>{cartCount ? `${cartCount} товаров · ${money(cartTotal)}` : "Нет товаров в корзине"}</small></div><b>↗</b></button></div>
                    </div>
                </div>
            </section>}

            {panel === "cart" && <Modal title={`Корзина · ${cartCount}`} onClose={() => setPanel("")} wide><div className="cart-content">{cart.length ? <><div className="cart-list">{cart.map(item => <div className="cart-row" key={item.id}><div className="cart-thumb"><ProductImage product={item} /></div><div className="cart-product-name"><strong>{item.name}</strong><span>{money(item.price)}</span></div><div className="quantity"><button onClick={() => changeQty(item.id, -1)} aria-label="Уменьшить">−</button><span>{item.qty}</span><button onClick={() => changeQty(item.id, 1)} aria-label="Увеличить">＋</button></div><strong className="cart-line-total">{money(item.price * item.qty)}</strong><button className="remove-button" onClick={() => setCart(prev => prev.filter(p => p.id !== item.id))} aria-label="Удалить товар">✕</button></div>)}</div><div className="cart-summary"><div><span>Итого</span><strong>{money(cartTotal)}</strong></div><p>ПВЗ: {pickup.city}, {pickup.address}</p><button className="primary-button full-button" onClick={checkout}>Оформить заказ <span>↗</span></button></div></> : <div className="empty-state compact"><span>🛒</span><h3>Корзина пока пуста</h3><p>Добавьте товары из каталога — они появятся здесь.</p><button className="primary-button" onClick={() => setPanel("")}>Вернуться в каталог</button></div>}</div></Modal>}

            {panel === "orders" && <Modal title="Мои заказы" onClose={() => setPanel("")} wide><div className="orders-content">{orders.length ? <><div className="orders-summary"><span>Всего заказов</span><strong>{orders.length}</strong></div>{orders.map(order => <article className="order-card" key={order.id}><div className="order-card-head"><div><span className="product-category">ЗАКАЗ №{order.id}</span><h3>{order.date}</h3></div><span className="status-badge">{order.status}</span></div><div className="order-items">{order.items.map(item => <div key={item.id}><span>{item.name} × {item.qty}</span><strong>{money(item.price * item.qty)}</strong></div>)}</div><div className="order-foot"><span>⌖ {order.pickup}</span><strong>{money(order.total)}</strong></div></article>)}</> : <div className="empty-state compact"><span>▤</span><h3>Заказов пока нет</h3><p>После оформления заказа его состав и статус появятся здесь.</p><button className="primary-button" onClick={() => setPanel("")}>Перейти в каталог</button></div>}<div className="order-lookup"><label>Проверить номер заказа<input value={orderLookup} onChange={e => setOrderLookup(e.target.value)} placeholder="Введите номер заказа" /></label><button className="secondary-button" onClick={() => { const found = orders.find(o => o.id === orderLookup.trim()); setNotice(found ? `Заказ №${found.id}: ${found.status}` : "Заказ с таким номером не найден"); }}>Проверить статус</button></div></div></Modal>}
        </div>
    );
}
