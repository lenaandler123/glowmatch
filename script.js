/* ============================================
   GlowMatch — логика приложения
   Автор: Булохова Елена
   ============================================ */

// --- 1. БАЗА ДАННЫХ ТОВАРОВ ---
// Реальные бренды из ассортимента «Новэкс»
const products = [
    // ==================== УХОД ЗА ЛИЦОМ ====================
    {
        name: "Vilsen Крем от морщин с секретом улитки",
        category: "face",
        problem: "wrinkles",
        description: "Борется с возрастными проявлениями. Секрет улитки и Центелла азиатская обеспечивают лифтинг и увлажнение.",
        available: true
    },
    {
        name: "Vilsen Сыворотка против пигментных пятен",
        category: "face",
        problem: "pigmentation",
        description: "Выравнивает тон кожи, осветляет пигментные пятна и следы постакне.",
        available: true
    },
    {
        name: "Vilsen Крем против следов постакне",
        category: "face",
        problem: "acne",
        description: "Уменьшает воспаления, помогает бороться со следами постакне. Успокаивает кожу.",
        available: false
    },
    {
        name: "Ichthyonella Крем-комплекс «Активный»",
        category: "face",
        problem: "acne",
        description: "Предназначен для ухода за проблемной кожей с воспалениями. Снимает покраснения.",
        available: true
    },
    {
        name: "Geltek Моделирующий гель для лица",
        category: "face",
        problem: "wrinkles",
        description: "Моделирует овал лица, подтягивает нижнюю треть. Эффект лифтинга.",
        available: true
    },
    {
        name: "Geltek Сыворотка для проблемной кожи",
        category: "face",
        problem: "oily",
        description: "Регулирует жирность, сужает поры, матирует.",
        available: false
    },
    {
        name: "Greenini Пилинг-скатка для лица",
        category: "face",
        problem: "blackheads",
        description: "Очищает и обновляет кожу, удаляет чёрные точки и ороговевшие клетки.",
        available: true
    },
    {
        name: "Noreva Крем для чувствительной кожи",
        category: "face",
        problem: "dryness",
        description: "Уход за проблемной и чувствительной кожей. Интенсивное увлажнение, снимает раздражение.",
        available: true
    },
    {
        name: "Teana Гель для кожи вокруг глаз «Экспресс-лифтинг»",
        category: "face",
        problem: "wrinkles",
        description: "Уход за областью вокруг глаз. Мгновенный эффект лифтинга, уменьшает отёчность.",
        available: true
    },

    // ==================== УХОД ЗА ВОЛОСАМИ ====================
    {
        name: "Luceria Укрепляющий шампунь Bio-Pure Bouquet",
        category: "hair",
        problem: "thin",
        description: "Укрепление тонких волос, уход за кожей головы.",
        available: true
    },
    {
        name: "Luceria Объёмный шампунь Bio-Madic Bouquet",
        category: "hair",
        problem: "thin",
        description: "Уход за тонкими и ослабленными волосами, повышение объёма.",
        available: true
    },
    {
        name: "Индекс Натуральности Бальзам-ополаскиватель «Экспресс-уход» с экстрактом пиона",
        category: "hair",
        problem: "dry_hair",
        description: "Питание, увлажнение, уменьшение ломкости, предотвращение секущихся кончиков.",
        available: true
    },
    {
        name: "Индекс Натуральности Маска-бальзам с биомиметическим кератином",
        category: "hair",
        problem: "damaged",
        description: "Восстановление структуры волос, питание, увлажнение. Подходит для окрашенных волос.",
        available: true
    },
    {
        name: "Витэкс (Fruit Therapy) Питательная маска 3 в 1 с бананом и маслом мурумуру",
        category: "hair",
        problem: "dry_hair",
        description: "Глубокое питание, разглаживание, повышение прочности и эластичности.",
        available: true
    },
    {
        name: "Mixit Восстанавливающий кондиционер с коллагеном и биотином",
        category: "hair",
        problem: "damaged",
        description: "Экстремальное восстановление, укрепление, предотвращение ломкости и секущихся кончиков.",
        available: true
    },
    {
        name: "Mixit Спрей-блеск с коллагеном",
        category: "hair",
        problem: "dull",
        description: "Мгновенное придание блеска, термозащита, антистатик, увлажнение.",
        available: false
    },
    {
        name: "TNL Масло-флюид Sexy Shine с маслом персиковой косточки",
        category: "hair",
        problem: "damaged",
        description: "Восстановление повреждённых участков, укрепление, защита от внешней среды, против секущихся кончиков.",
        available: true
    },
    {
        name: "Свежая Косметика Густое масло-какао",
        category: "hair",
        problem: "dry_hair",
        description: "Восстановление, питание.",
        available: true
    },
    {
        name: "Народные Рецепты Питательная репейная маска",
        category: "hair",
        problem: "hair_loss",
        description: "Питание, укрепление, против выпадения волос, устранение ломкости.",
        available: true
    },
    {
        name: "Clear Сыворотка «Энергия роста»",
        category: "hair",
        problem: "hair_loss",
        description: "Стимуляция роста волос, укрепление, придание блеска и объёма.",
        available: true
    },
    {
        name: "Золотой Шелк Несмываемый крем-спрей 15 в 1",
        category: "hair",
        problem: "damaged",
        description: "Восстановление, глубокое увлажнение, питание, укрепление, защита от термического воздействия.",
        available: true
    },
    {
        name: "Ollin Несмываемый крем-спрей Perfect Hair 15 в 1",
        category: "hair",
        problem: "damaged",
        description: "Восстановление, блеск, разглаживание, против секущихся кончиков, термозащита.",
        available: false
    },
    {
        name: "Ollin Спрей-фиксатор Perfect Hair Pro Volume",
        category: "hair",
        problem: "thin",
        description: "Создание объёма у корней. Подходит для тонких волос.",
        available: true
    },
    {
        name: "Тресемме Сыворотка-ламинатор Bondplex",
        category: "hair",
        problem: "dull",
        description: "Восстановление повреждённых и тусклых волос, гладкость, блеск.",
        available: true
    },
    {
        name: "Тресемме Бальзам-ополаскиватель Beauty-full Volume",
        category: "hair",
        problem: "thin",
        description: "Придание объёма, питание, очищение.",
        available: true
    },
    {
        name: "Garnier Fructis Сыворотка-спрей SOS «Восстановление Кератин»",
        category: "hair",
        problem: "damaged",
        description: "Восстановление повреждённых волос, против секущихся кончиков, термозащита.",
        available: true
    },

    // ==================== ПАРФЮМЕРИЯ ====================
    {
        name: "La Ville Ms. Passion Eclat",
        category: "perfume",
        problem: "floral",
        description: "Цветочный. Бергамот, красная смородина, груша. В сердце — роза, ландыш, гелиотроп. База: мускус. Воплощение женственности.",
        available: true
    },
    {
        name: "Dilis Lost Paradise Summer Vibes",
        category: "perfume",
        problem: "fruity",
        description: "Цветочно-фруктовый. Лимон, тропические фрукты, чёрная смородина, жасмин, малина. «Летние воспоминания».",
        available: true
    },
    {
        name: "La Ville Love Emotion",
        category: "perfume",
        problem: "gourmand",
        description: "Восточный гурманский. Сахар, лимон, ром, цветы апельсина, ваниль. Вдохновлён лимонным кексом.",
        available: true
    },
    {
        name: "La Ville Aqua di Laguna",
        category: "perfume",
        problem: "fresh",
        description: "Цветочно-водный. «Мятная волна», тропический, влажный. Завершение из кедра и сахара.",
        available: false
    },
    {
        name: "La Ville Bouquet Iris and Neroli",
        category: "perfume",
        problem: "floral",
        description: "Восточно-цветочный. Чёрная смородина, груша, ирис, жасмин, нероли. База: ваниль, пралине, пачули.",
        available: true
    },
    {
        name: "Vegan Love Studio Sweet Fruit",
        category: "perfume",
        problem: "gourmand",
        description: "Сладкий, фруктовый, гурманский. Киви, личи, айва, белый шоколад, пирожное, орхидея. База: мускус, древесина.",
        available: true
    },
    {
        name: "PRONICHE Lavender, Vanilla, White Flowers",
        category: "perfume",
        problem: "floral",
        description: "Цветочный. Бергамот, лаванда. «Нежность и утончённая чувственность» с успокаивающим оттенком.",
        available: true
    },
    {
        name: "Emper Milestone Cerise Rouge",
        category: "perfume",
        problem: "fruity",
        description: "Фруктовый, унисекс. Ноты черешни и «сладкий сироп макисон». Загадочный и соблазнительный.",
        available: true
    },
    {
        name: "Парфюмерия XXI века Nostalgie Act #1",
        category: "perfume",
        problem: "chypre",
        description: "Шипрово-фруктовый. Сладкий апельсин, груша, орхидея. База: пачули и конфеты Ирис.",
        available: true
    },
    {
        name: "Speransky&Pozen Black Vanilla",
        category: "perfume",
        problem: "gourmand",
        description: "Гурманский, унисекс. Ваниль, мускус. Пахнет «экстрактом ванили для выпечки».",
        available: true
    },
    {
        name: "Speransky&Pozen Rosemary, Neroli, Lemon",
        category: "perfume",
        problem: "citrus",
        description: "Цитрусовый, унисекс. Розмарин, лимон, нероли. Освежающий, слегка пряный.",
        available: false
    },
    {
        name: "Parfume Emporium Step 1",
        category: "perfume",
        problem: "woody",
        description: "Древесно-пряный. Грейпфрут, лимон, мята, имбирь, герань. База: кедр, ветивер. Мужской.",
        available: true
    },
    {
        name: "Brocard Gangster Noir",
        category: "perfume",
        problem: "woody",
        description: "Мужская туалетная вода. Древесный, строгий аромат для деловых встреч.",
        available: true
    },
    {
        name: "Delta Parfum Formula Sexy N3",
        category: "perfume",
        problem: "fruity",
        description: "Цветочно-фруктовый, с феромонами. Чёрная смородина, клубника, яблоко, жасмин, роза. База: сандал, амбра, мускус.",
        available: true
    },
    {
        name: "Arabian Night Hypnotique (набор масел)",
        category: "perfume",
        problem: "oriental",
        description: "Восточный. Набор из 5 масел без спирта. Аналоги Baccarat Rouge, Montale Vanille Absolu, Escada Taj Sunset и др.",
        available: true
    }
];

// --- 2. СПИСОК ПРОБЛЕМ ПО КАТЕГОРИЯМ ---
const problems = {
    face: [
        { id: "wrinkles", label: "Морщины и возрастные изменения" },
        { id: "pigmentation", label: "Пигментные пятна" },
        { id: "acne", label: "Акне и воспаления" },
        { id: "blackheads", label: "Чёрные точки" },
        { id: "oily", label: "Жирный блеск" },
        { id: "dryness", label: "Сухость и чувствительность" }
    ],
    hair: [
        { id: "hair_loss", label: "Выпадение волос" },
        { id: "dandruff", label: "Перхоть" },
        { id: "damaged", label: "Повреждённые волосы" },
        { id: "dry_hair", label: "Сухие волосы" },
        { id: "thin", label: "Тонкие волосы" },
        { id: "dull", label: "Тусклые волосы" }
    ],
    perfume: [
        { id: "floral", label: "Цветочные" },
        { id: "fruity", label: "Фруктовые" },
        { id: "gourmand", label: "Гурманские (сладкие)" },
        { id: "fresh", label: "Свежие" },
        { id: "citrus", label: "Цитрусовые" },
        { id: "woody", label: "Древесные" },
        { id: "oriental", label: "Восточные" },
        { id: "chypre", label: "Шипровые" }
    ]
};

// --- 3. ПЕРЕМЕННЫЕ СОСТОЯНИЯ ---
let currentCategory = null;
let currentProblem = null;

// --- 4. ПОИСК ЭЛЕМЕНТОВ НА СТРАНИЦЕ ---
const screenCategory = document.getElementById("screen-category");
const screenProblem = document.getElementById("screen-problem");
const screenResults = document.getElementById("screen-results");
const problemList = document.getElementById("problem-list");
const resultsList = document.getElementById("results-list");
const problemTitle = document.getElementById("problem-title");
const resultsTitle = document.getElementById("results-title");

// --- 5. ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ ---
function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
    window.scrollTo(0, 0);
}

// --- 6. ОБРАБОТКА ВЫБОРА КАТЕГОРИИ ---
document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentCategory = btn.dataset.category;
        renderProblems(currentCategory);
        showScreen(screenProblem);
    });
});

// --- 7. ОТРИСОВКА СПИСКА ПРОБЛЕМ ---
function renderProblems(category) {
    problemList.innerHTML = "";
    
    const titles = {
        face: "Проблема кожи",
        hair: "Проблема волос",
        perfume: "Предпочтения в аромате"
    };
    problemTitle.textContent = titles[category];

    problems[category].forEach(problem => {
        const btn = document.createElement("button");
        btn.className = "problem-btn";
        btn.textContent = problem.label;
        btn.addEventListener("click", () => {
            currentProblem = problem.id;
            renderResults();
            showScreen(screenResults);
        });
        problemList.appendChild(btn);
    });
}

// --- 8. ОТРИСОВКА РЕЗУЛЬТАТОВ ---
function renderResults() {
    resultsList.innerHTML = "";

    // Фильтрую товары по категории и проблеме
    const filtered = products.filter(
        p => p.category === currentCategory && p.problem === currentProblem
    );

    // Заголовок с названием проблемы
    const problemLabel = problems[currentCategory]
        .find(p => p.id === currentProblem).label;
    resultsTitle.textContent = `Подходящие средства: ${problemLabel}`;

    // Если ничего не найдено
    if (filtered.length === 0) {
        resultsList.innerHTML = "<p style='text-align:center; color:#b08890;'>К сожалению, подходящих товаров не найдено.</p>";
        return;
    }

    // Создаю карточки товаров
    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const statusClass = product.available ? "available" : "unavailable";
        const statusText = product.available 
            ? "✓ В наличии" 
            : "✗ Нет в наличии";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <span class="status ${statusClass}">${statusText}</span>
        `;

        resultsList.appendChild(card);
    });
}

// --- 9. КНОПКИ "НАЗАД" ---
document.getElementById("back-to-category").addEventListener("click", () => {
    showScreen(screenCategory);
});

document.getElementById("back-to-problem").addEventListener("click", () => {
    showScreen(screenProblem);
});