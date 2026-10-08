import React, { useState, useMemo } from 'react';
import {
  Search,
  Clock,
  MapPin,
  ShoppingBag,
  ArrowRight,
  ThumbsUp,
  Check,
  Utensils
} from 'lucide-react';
import {
  SINGAPORE_DISHES,
  SINGAPORE_SUPERMARKETS,
  HERO_IMAGE_URL,
  CulturalCategory,
  DishRecipe,
  IngredientItem,
  CommunityCookLog
} from './data/singaporeDishes';
import { ResilientDishImage } from './components/ResilientDishImage';
import { DishCookbookModal } from './components/DishCookbookModal';
import { BalancedMealMatcher } from './components/BalancedMealMatcher';
import { ShoppingBasketDrawer, BasketEntry } from './components/ShoppingBasketDrawer';

const CULTURAL_FILTERS: { label: string; value: CulturalCategory }[] = [
  { label: 'All Dishes', value: 'All' },
  { label: 'Halal', value: 'Halal' },
  { label: 'Vegetarian', value: 'Vegetarian' },
  { label: 'Chinese', value: 'Chinese' },
  { label: 'Malay', value: 'Malay' },
  { label: 'Indian', value: 'Indian' },
  { label: 'Peranakan', value: 'Peranakan' },
  { label: 'Kids’ Meals', value: 'Kids' },
  { label: 'Elders’ Menus', value: 'Elders' }
];

export default function App() {
  // Filter states for recipe catalog
  const [selectedCategory, setSelectedCategory] = useState<CulturalCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxCookTimeFilter, setMaxCookTimeFilter] = useState<number>(10);

  // Kids & Elders spotlight toggle
  const [generationFocus, setGenerationFocus] = useState<'kids' | 'elders'>('kids');

  // Supermarket district filter
  const [selectedArea, setSelectedArea] = useState<string>('All Areas');

  // Active Dish Modal state
  const [activeDish, setActiveDish] = useState<DishRecipe | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<
    'steps' | 'heritage' | 'generations' | 'clinic'
  >('steps');

  // Shopping Basket state
  const [basketOpen, setBasketOpen] = useState<boolean>(false);
  const [basketEntries, setBasketEntries] = useState<BasketEntry[]>([
    {
      key: 'init-hc-1',
      ingredient: SINGAPORE_DISHES[0].ingredients[0],
      dishTitle: SINGAPORE_DISHES[0].title,
      servings: 2,
      checked: false
    },
    {
      key: 'init-hc-3',
      ingredient: SINGAPORE_DISHES[0].ingredients[2],
      dishTitle: SINGAPORE_DISHES[0].title,
      servings: 2,
      checked: false
    }
  ]);

  // Community Cook Logs per dish
  const [cookLogsByDish, setCookLogsByDish] = useState<Record<string, CommunityCookLog[]>>(() => {
    const map: Record<string, CommunityCookLog[]> = {};
    SINGAPORE_DISHES.forEach((d) => {
      map[d.id] = [...d.initialLogs];
    });
    return map;
  });

  // Standalone Clinic quick-selector state
  const [clinicDishId, setClinicDishId] = useState<string>(SINGAPORE_DISHES[0].id);
  const [clinicDiagId, setClinicDiagId] = useState<string>(
    SINGAPORE_DISHES[0].diagnostics[0].id
  );
  const [quickReviewName, setQuickReviewName] = useState('');
  const [quickReviewArea, setQuickReviewArea] = useState('Tiong Bahru');
  const [quickReviewOutcome, setQuickReviewOutcome] = useState('Turned out Shiok!');
  const [quickReviewComment, setQuickReviewComment] = useState('');
  const [quickReviewSuggestion, setQuickReviewSuggestion] = useState('');
  const [quickReviewSaved, setQuickReviewSaved] = useState(false);

  const handleOpenDish = (
    dish: DishRecipe,
    tab: 'steps' | 'heritage' | 'generations' | 'clinic' = 'steps'
  ) => {
    setActiveDish(dish);
    setActiveModalTab(tab);
  };

  const handleAddIngredientsToBasket = (
    items: IngredientItem[],
    dishTitle: string,
    servings: number
  ) => {
    setBasketEntries((prev) => {
      const additions: BasketEntry[] = items.map((ing) => ({
        key: `${ing.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        ingredient: ing,
        dishTitle,
        servings,
        checked: false
      }));
      return [...prev, ...additions];
    });
  };

  const handleToggleBasketChecked = (key: string) => {
    setBasketEntries((prev) =>
      prev.map((entry) =>
        entry.key === key ? { ...entry, checked: !entry.checked } : entry
      )
    );
  };

  const handleRemoveBasketEntry = (key: string) => {
    setBasketEntries((prev) => prev.filter((entry) => entry.key !== key));
  };

  const handleClearBasket = () => {
    setBasketEntries([]);
  };

  const handleAddCookLog = (dishId: string, log: CommunityCookLog) => {
    setCookLogsByDish((prev) => ({
      ...prev,
      [dishId]: [log, ...(prev[dishId] || [])]
    }));
  };

  const handleUpvoteLog = (dishId: string, logId: string) => {
    setCookLogsByDish((prev) => ({
      ...prev,
      [dishId]: (prev[dishId] || []).map((l) =>
        l.id === logId ? { ...l, helpfulCount: l.helpfulCount + 1 } : l
      )
    }));
  };

  const filteredDishes = useMemo(() => {
    return SINGAPORE_DISHES.filter((dish) => {
      const matchesCat =
        selectedCategory === 'All' || dish.categories.includes(selectedCategory);
      const matchesTime = dish.totalTimeMins <= maxCookTimeFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        dish.title.toLowerCase().includes(q) ||
        dish.localName.toLowerCase().includes(q) ||
        dish.culturalOrigin.toLowerCase().includes(q) ||
        dish.tagline.toLowerCase().includes(q) ||
        dish.ingredients.some((i) => i.name.toLowerCase().includes(q));
      return matchesCat && matchesTime && matchesQuery;
    });
  }, [selectedCategory, maxCookTimeFilter, searchQuery]);

  const filteredSupermarkets = useMemo(() => {
    if (selectedArea === 'All Areas') return SINGAPORE_SUPERMARKETS;
    return SINGAPORE_SUPERMARKETS.filter((s) => s.area === selectedArea);
  }, [selectedArea]);

  const selectedClinicDish =
    SINGAPORE_DISHES.find((d) => d.id === clinicDishId) || SINGAPORE_DISHES[0];
  const selectedClinicDiag =
    selectedClinicDish.diagnostics.find((d) => d.id === clinicDiagId) ||
    selectedClinicDish.diagnostics[0];

  const handleQuickClinicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickReviewComment.trim() && !quickReviewSuggestion.trim()) return;
    const newLog: CommunityCookLog = {
      id: `log-quick-${Date.now()}`,
      userName: quickReviewName.trim() || 'Home Cook SG',
      neighbourhood: quickReviewArea,
      cookTimeActualMins: selectedClinicDish.totalTimeMins,
      outcomeTag: quickReviewOutcome,
      rating: 5,
      comment:
        quickReviewComment.trim() ||
        'Cooked this on a weeknight and loved the step-by-step timing.',
      userSuggestion:
        quickReviewSuggestion.trim() ||
        'Prep the aromatics first so everything goes into the pan smoothly.',
      helpfulCount: 1,
      timestamp: 'Just now'
    };
    handleAddCookLog(selectedClinicDish.id, newLog);
    setQuickReviewName('');
    setQuickReviewComment('');
    setQuickReviewSuggestion('');
    setQuickReviewSaved(true);
    setTimeout(() => setQuickReviewSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-xs border-b border-[#E6E1D8] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap"
          >
            Shiok in 10
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]">
            <a
              href="#recipes"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Recipes
            </a>
            <a
              href="#balanced-matcher"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Balanced Matcher
            </a>
            <a
              href="#kids-elders"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Kids & Elders
            </a>
            <a
              href="#supermarkets"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Supermarkets
            </a>
            <a
              href="#clinic"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Chef’s Clinic
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBasketOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1C1917] rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="font-mono tabular-nums">
                Fresh Basket ({basketEntries.length})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="top" className="flex-1">
        {/* Section 1: Storefront / Editorial Culinary Hero */}
        <section className="border-b border-[#E6E1D8] py-10 sm:py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs text-[#B9381E] font-semibold">
                Singapore Quick Heritage Kitchen · 5 to 10 Minute Authentic Local Meals
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#1C1917] leading-[1.12] tracking-tight">
                Cook Singapore’s Beloved Local Dishes in Under 10 Minutes.
              </h1>
              <p className="text-base text-[#57534E] leading-relaxed max-w-xl">
                Built for busy professionals, parents, seniors, and food lovers. Explore Halal Malay, Hakka Vegetarian, Hainanese, South Indian, and Peranakan recipes—complete with cultural history, step-by-step timers, nearby supermarket guides, and personalised balanced meal matching.
              </p>

              {/* Single Primary CTA + Secondary Route */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#recipes"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-[#B9381E] hover:bg-[#9E2E17] transition-colors whitespace-nowrap"
                >
                  <span>Explore 5–10 Min Dishes</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#balanced-matcher"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-[#1C1917] bg-[#F2EFE9] hover:bg-stone-300/70 transition-colors whitespace-nowrap"
                >
                  <span>Match My Balanced Meal</span>
                </a>
              </div>

              {/* Claim-to-Proof Adjacency Metrics */}
              <div className="pt-6 border-t border-[#E6E1D8] grid grid-cols-3 gap-6">
                <div>
                  <div className="font-mono tabular-nums text-xl font-semibold text-[#1C1917]">
                    6–10 mins
                  </div>
                  <div className="text-xs text-[#57534E] mt-0.5">
                    Verified prep-to-plate time using local supermarket shortcuts
                  </div>
                </div>
                <div>
                  <div className="font-mono tabular-nums text-xl font-semibold text-[#1C1917]">
                    6 Cultures
                  </div>
                  <div className="text-xs text-[#57534E] mt-0.5">
                    Halal Malay, Vegetarian Hakka, Chinese, Indian, Nyonya & Mamak
                  </div>
                </div>
                <div>
                  <div className="font-mono tabular-nums text-xl font-semibold text-[#1C1917]">
                    3 Generations
                  </div>
                  <div className="text-xs text-[#57534E] mt-0.5">
                    Every dish includes Kid-friendly & Senior low-sodium adaptations
                  </div>
                </div>
              </div>
            </div>

            {/* Hero 16:9 Visual Anchor */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xl overflow-hidden border border-[#E6E1D8] bg-[#F2EFE9] aspect-16/9 shadow-sm">
                <ResilientDishImage
                  src={HERO_IMAGE_URL}
                  alt="Vibrant Singaporean home-cooked table spread featuring Hainanese chicken rice, Nyonya laksa, and fresh herbs"
                  fallbackTitle="Singapore Heritage Table Spread"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-5 sm:p-6">
                  <div className="text-xs text-stone-200 font-mono tabular-nums">
                    Featured Heritage Table · Purvis St, Kampong Gelam, Joo Chiat & Serangoon Rd
                  </div>
                  <p className="font-display text-lg sm:text-xl font-semibold text-white mt-0.5">
                    Real hawker flavour after a 7pm MRT commute—using one pan and fresh neighbourhood groceries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Featured 5-10 Min Cultural Dish Collection */}
        <section id="recipes" className="py-14 sm:py-16 px-6 border-b border-[#E6E1D8]">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="text-xs text-[#B9381E] font-semibold mb-1">
                  01. Multi-Cultural 5–10 Minute Recipe Archive
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                  Singapore’s Quick Local Dishes with Origins & Live Timers
                </h2>
              </div>
              <p className="text-sm text-[#57534E] max-w-md">
                Click any dish to launch the interactive step timer, read its Singapore street history and fun facts, or log how your cook turned out.
              </p>
            </div>

            {/* Filter Bar: Cultural Segmented Controls + Search + Max Time */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
              <div className="flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg overflow-x-auto">
                {CULTURAL_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setSelectedCategory(f.value)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      selectedCategory === f.value
                        ? 'bg-white text-[#1C1917] shadow-xs'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-[#57534E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dish, ginger, fish, tofu..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#E6E1D8] bg-white focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div className="flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg">
                  {[
                    { label: 'All ≤10m', val: 10 },
                    { label: '≤8m', val: 8 },
                    { label: '≤7m', val: 7 }
                  ].map((t) => (
                    <button
                      key={t.val}
                      onClick={() => setMaxCookTimeFilter(t.val)}
                      className={`px-2.5 py-1 text-xs font-mono tabular-nums font-semibold rounded-md transition-colors whitespace-nowrap ${
                        maxCookTimeFilter === t.val
                          ? 'bg-white text-[#1C1917] shadow-xs'
                          : 'text-[#57534E] hover:text-[#1C1917]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3-Column Recipe Grid */}
            {filteredDishes.length === 0 ? (
              <div className="p-12 text-center rounded-xl bg-white border border-[#E6E1D8] space-y-3">
                <p className="font-display text-lg font-semibold text-[#1C1917]">
                  No dishes matched that filter combination
                </p>
                <p className="text-xs text-[#57534E]">
                  Try resetting your time filter to ≤10m or selecting "All Dishes".
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setMaxCookTimeFilter(10);
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#1C1917]"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredDishes.map((dish) => {
                  const dishLogs = cookLogsByDish[dish.id] || [];
                  const basketCost = dish.ingredients.reduce(
                    (s, i) => s + i.estimatedSgd,
                    0
                  );

                  return (
                    <article
                      key={dish.id}
                      className="group rounded-xl bg-white border border-[#E6E1D8] overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5"
                    >
                      {/* 4:3 Image Slot */}
                      <div
                        onClick={() => handleOpenDish(dish, 'steps')}
                        className="aspect-4/3 w-full bg-[#F2EFE9] overflow-hidden cursor-pointer relative"
                      >
                        <ResilientDishImage
                          src={dish.imageUrl}
                          alt={dish.title}
                          fallbackTitle={dish.title}
                          fallbackAccent={dish.fallbackAccent}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-3.5 flex items-center justify-between text-xs text-white">
                          <span className="font-mono tabular-nums font-semibold">
                            {dish.totalTimeMins} mins ({dish.prepTimeMins}m prep + {dish.cookTimeMins}m cook)
                          </span>
                          <span className="font-mono tabular-nums">
                            Est. S${basketCost.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Card Body — Zero-Pill Unboxed Metadata */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#57534E]">
                            <span className="font-semibold text-[#B9381E]">
                              {dish.culturalOrigin}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">{dish.calories} kcal</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">{dish.proteinG}g protein</span>
                          </div>

                          <h3
                            onClick={() => handleOpenDish(dish, 'steps')}
                            className="font-display text-lg font-semibold text-[#1C1917] group-hover:text-[#B9381E] transition-colors cursor-pointer"
                          >
                            {dish.title}
                          </h3>

                          <p className="text-xs text-[#57534E] leading-relaxed">
                            {dish.tagline}
                          </p>

                          {/* Historical Origin & Fun Fact Snippet */}
                          <div className="pt-2 border-t border-[#E6E1D8] text-xs space-y-1">
                            <div className="text-[#1C1917] font-semibold">
                              Origin: {dish.originEra}
                            </div>
                            <p className="text-[#57534E] line-clamp-2">
                              Fun fact: {dish.funFacts[0]}
                            </p>
                          </div>

                          {/* Dietary & Generation Unboxed Text Line */}
                          <div className="text-xs text-[#156147] pt-1">
                            {dish.dietaryHighlights.join(' · ')}
                          </div>
                        </div>

                        {/* Interactive Card Footer Controls */}
                        <div className="pt-3 border-t border-[#E6E1D8] space-y-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenDish(dish, 'steps')}
                              className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-[#1C1917] hover:bg-stone-800 transition-colors whitespace-nowrap"
                            >
                              Cook & Start Timer
                            </button>
                            <button
                              onClick={() => handleOpenDish(dish, 'heritage')}
                              className="py-2 px-3 rounded-lg text-xs font-semibold text-[#1C1917] bg-[#F2EFE9] hover:bg-stone-300/70 transition-colors whitespace-nowrap"
                            >
                              History
                            </button>
                            <button
                              onClick={() => handleOpenDish(dish, 'clinic')}
                              className="py-2 px-3 rounded-lg text-xs font-semibold text-[#B9381E] bg-[#F2EFE9] hover:bg-stone-300/70 transition-colors whitespace-nowrap font-mono tabular-nums"
                            >
                              Reviews ({dishLogs.length})
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Personalised Balanced Meal Matcher */}
        <section
          id="balanced-matcher"
          className="py-14 sm:py-16 px-6 bg-[#F2EFE9]/60 border-b border-[#E6E1D8]"
        >
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs text-[#156147] font-semibold">
                02. Individual Balanced Meal Architect (HPB Quarter-Quarter-Half)
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                Find Your Best-Suited Balanced Meal in Seconds
              </h2>
              <p className="text-sm text-[#57534E]">
                Input your diner group, cultural dietary requirement, and nutritional priority to receive a custom-proportioned Singapore local plate with exact macros and preparation tweaks.
              </p>
            </div>

            <BalancedMealMatcher
              dishes={SINGAPORE_DISHES}
              onSelectDish={handleOpenDish}
              onAddIngredientsToBasket={handleAddIngredientsToBasket}
            />
          </div>
        </section>

        {/* Section 4: Kids' Meals for Busy Parents & Elders' Restorative Menus */}
        <section id="kids-elders" className="py-14 sm:py-16 px-6 border-b border-[#E6E1D8]">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="text-xs text-[#B9381E] font-semibold mb-1">
                  03. Multi-Generational Family Kitchen
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                  Quick Kids’ Meals for Busy Parents & Menus for Elders
                </h2>
              </div>

              {/* Segmented Toggle between Kids Focus and Elders Focus */}
              <div className="flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg self-start">
                <button
                  onClick={() => setGenerationFocus('kids')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    generationFocus === 'kids'
                      ? 'bg-white text-[#1C1917] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  Kids’ Meals (Busy Parents)
                </button>
                <button
                  onClick={() => setGenerationFocus('elders')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    generationFocus === 'elders'
                      ? 'bg-white text-[#1C1917] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  Elders’ Restorative Menus (65+)
                </button>
              </div>
            </div>

            {generationFocus === 'kids' ? (
              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-[#F2EFE9] border border-[#E6E1D8] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                      The Busy Singapore Parent’s "One-Pan, Split-Before-Chili" Strategy
                    </h3>
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      Every recipe below hides finely grated or confetti-diced vegetables inside child-friendly textures (silky egg custard, cheesy Roti John toast soldiers, sweet soy chicken rice balls) while letting parents enjoy full adult flavours from the exact same pan.
                    </p>
                  </div>
                  <div className="text-xs font-mono tabular-nums text-[#B9381E] font-semibold shrink-0">
                    Zero Chili · Boneless Proteins · Recess Box Ready
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {SINGAPORE_DISHES.filter((d) => d.categories.includes('Kids')).map((dish) => (
                    <div
                      key={dish.id}
                      className="p-5 rounded-xl bg-white border border-[#E6E1D8] flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className="text-xs text-[#B9381E] font-semibold">
                          {dish.kidMealAdaptation.ageGroup} · {dish.totalTimeMins} mins
                        </div>
                        <h4 className="font-display text-base font-semibold text-[#1C1917]">
                          {dish.kidMealAdaptation.title}
                        </h4>
                        <p className="text-xs text-[#57534E]">
                          Based on: {dish.title}
                        </p>
                        <p className="text-xs text-[#1C1917] leading-relaxed pt-2 border-t border-[#E6E1D8]">
                          {dish.kidMealAdaptation.modification}
                        </p>
                        <p className="text-xs text-[#156147]">
                          Recess / Lunchbox tip: {dish.kidMealAdaptation.lunchboxTip}
                        </p>
                      </div>
                      <button
                        onClick={() => handleOpenDish(dish, 'generations')}
                        className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-[#1C1917] bg-[#F2EFE9] hover:bg-stone-300/70 transition-colors whitespace-nowrap"
                      >
                        Open Kid & Parent Guide
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-[#F2EFE9] border border-[#E6E1D8] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                      Pioneer & Merdeka Generation Menus: Soft Bite, Low Sodium & Joint-Warming
                    </h3>
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      Designed for seniors who value nostalgic Teochew, Cantonese, Hainanese, Hakka, and Malay flavours but need gentle chewing textures, reduced sodium (&lt;350mg), and high digestible protein to prevent sarcopenia (muscle loss).
                    </p>
                  </div>
                  <div className="text-xs font-mono tabular-nums text-[#156147] font-semibold shrink-0">
                    270–350mg Sodium · Denture-Friendly · Old Ginger Warmth
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {SINGAPORE_DISHES.filter((d) => d.categories.includes('Elders')).map((dish) => (
                    <div
                      key={dish.id}
                      className="p-5 rounded-xl bg-white border border-[#E6E1D8] flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className="text-xs text-[#156147] font-semibold font-mono tabular-nums">
                          {dish.sodiumMg}mg Sodium · {dish.proteinG}g Protein · {dish.totalTimeMins}m
                        </div>
                        <h4 className="font-display text-base font-semibold text-[#1C1917]">
                          {dish.elderMenuAdaptation.title}
                        </h4>
                        <p className="text-xs text-[#B9381E] font-medium">
                          Focus: {dish.elderMenuAdaptation.healthFocus}
                        </p>
                        <p className="text-xs text-[#1C1917] leading-relaxed pt-2 border-t border-[#E6E1D8]">
                          {dish.elderMenuAdaptation.textureAndSodiumTip}
                        </p>
                        <p className="text-xs text-[#57534E]">
                          Digestion note: {dish.elderMenuAdaptation.digestionNote}
                        </p>
                      </div>
                      <button
                        onClick={() => handleOpenDish(dish, 'generations')}
                        className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-[#1C1917] bg-[#F2EFE9] hover:bg-stone-300/70 transition-colors whitespace-nowrap"
                      >
                        Open Senior Menu Guide
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 5: Supermarkets Near You to Get Fresh Ingredients */}
        <section
          id="supermarkets"
          className="py-14 sm:py-16 px-6 bg-[#F2EFE9]/50 border-b border-[#E6E1D8]"
        >
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="text-xs text-[#156147] font-semibold mb-1">
                  04. Islandwide Fresh Ingredient Sourcing
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                  Supermarkets & Wet Market Hubs Near You
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-[#57534E] whitespace-nowrap">
                  Filter by MRT / District:
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="px-3 py-2 text-xs font-semibold rounded-lg border border-[#E6E1D8] bg-white text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                >
                  <option>All Areas</option>
                  <option>Central / Tiong Bahru</option>
                  <option>East / Tampines & Bedok</option>
                  <option>Central / Little India</option>
                  <option>East / Joo Chiat & Katong</option>
                  <option>Heartland / Toa Payoh</option>
                  <option>West / Jurong East</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSupermarkets.map((store) => {
                const matchingDishes = SINGAPORE_DISHES.filter((d) =>
                  d.recommendedSupermarketIds.includes(store.id)
                );

                return (
                  <div
                    key={store.id}
                    className="p-6 rounded-xl bg-white border border-[#E6E1D8] flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#57534E]">
                        <span className="font-semibold text-[#B9381E]">{store.chain}</span>
                        <span>{store.hours}</span>
                      </div>

                      <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                        {store.name}
                      </h3>

                      <div className="flex items-start gap-1.5 text-xs text-[#57534E]">
                        <MapPin className="w-3.5 h-3.5 text-[#156147] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#1C1917]">{store.nearestMrt}</div>
                          <div>{store.address}</div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E6E1D8] space-y-2 text-xs">
                        <div>
                          <span className="font-semibold text-[#1C1917]">
                            Fresh Produce & Fish Counter:{' '}
                          </span>
                          <span className="text-[#57534E]">{store.freshSpecialty}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#156147]">
                            Halal & Cultural Section:{' '}
                          </span>
                          <span className="text-[#57534E]">{store.halalCounterStrength}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#B9381E]">
                            5–10 Min Shortcut Item:{' '}
                          </span>
                          <span className="text-[#57534E]">{store.featuredPasteOrShortcut}</span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#F2EFE9] text-[#1C1917]">
                          <strong>Neighbourhood Tip:</strong> {store.wetMarketInsiderTip}
                        </div>
                      </div>
                    </div>

                    {/* Linked Dishes for this Supermarket */}
                    <div className="pt-3 border-t border-[#E6E1D8] space-y-2">
                      <span className="text-xs font-semibold text-[#57534E] block">
                        Quick Dishes to Shop Here:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {matchingDishes.map((d) => (
                          <button
                            key={d.id}
                            onClick={() => handleOpenDish(d, 'steps')}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F2EFE9] text-[#1C1917] hover:bg-stone-300/70 transition-colors text-left truncate max-w-full"
                          >
                            {d.localName.split(' ')[0]} · {d.totalTimeMins}m
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 6: Interactive Wok Check & Community Kitchen Clinic */}
        <section id="clinic" className="py-14 sm:py-16 px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs text-[#B9381E] font-semibold">
                05. Interactive Cook Feedback & Improvement Clinic
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                How Did Your Dish Turn Out? Get Instant Rescue Tips & Share Your Tweak
              </h2>
              <p className="text-sm text-[#57534E]">
                Cooking in 5–10 minutes over high heat is all about timing. Select a dish below to troubleshoot texture or seasoning, or share your own improvement tip with fellow Singapore home cooks.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Interactive Troubleshooter */}
              <div className="lg:col-span-6 p-6 rounded-xl bg-white border border-[#E6E1D8] space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#57534E] mb-1.5">
                    Select the Dish You Cooked:
                  </label>
                  <select
                    value={clinicDishId}
                    onChange={(e) => {
                      const newId = e.target.value;
                      setClinicDishId(newId);
                      const found = SINGAPORE_DISHES.find((d) => d.id === newId);
                      if (found && found.diagnostics[0]) {
                        setClinicDiagId(found.diagnostics[0].id);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 text-sm font-semibold rounded-lg border border-[#E6E1D8] bg-[#FAF8F5] text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  >
                    {SINGAPORE_DISHES.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.title} ({d.totalTimeMins} mins)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <span className="block text-xs font-semibold text-[#57534E]">
                    What happened in your pan?
                  </span>
                  <div className="flex flex-col gap-2">
                    {selectedClinicDish.diagnostics.map((diag) => (
                      <button
                        key={diag.id}
                        onClick={() => setClinicDiagId(diag.id)}
                        className={`text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold border transition-colors ${
                          selectedClinicDiag?.id === diag.id
                            ? 'bg-[#1C1917] text-white border-[#1C1917]'
                            : 'bg-[#FAF8F5] text-[#1C1917] border-[#E6E1D8] hover:border-stone-400'
                        }`}
                      >
                        {diag.outcomeLabel}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedClinicDiag && (
                  <div className="p-4 rounded-lg bg-[#F2EFE9] border border-[#E6E1D8] space-y-3 text-sm">
                    <div>
                      <span className="text-xs font-semibold text-[#57534E] block">
                        Culinary Science Diagnosis:
                      </span>
                      <p className="text-[#1C1917]">{selectedClinicDiag.whyItHappened}</p>
                    </div>
                    <div className="pt-2 border-t border-[#E6E1D8]">
                      <span className="text-xs font-semibold text-[#B9381E] block">
                        Immediate Pan Fix (Do This Right Now):
                      </span>
                      <p className="text-[#1C1917] font-medium">
                        {selectedClinicDiag.instantRescue}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#E6E1D8]">
                      <span className="text-xs font-semibold text-[#156147] block">
                        Next-Time Improvement:
                      </span>
                      <p className="text-[#57534E]">{selectedClinicDiag.nextTimeUpgrade}</p>
                    </div>
                  </div>
                )}

                {/* Form to Submit User Cook Experience */}
                <form
                  onSubmit={handleQuickClinicSubmit}
                  className="pt-4 border-t border-[#E6E1D8] space-y-3"
                >
                  <h4 className="font-display text-base font-semibold text-[#1C1917]">
                    Share How Your Dish Went & Offer a Suggestion
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <input
                      type="text"
                      value={quickReviewName}
                      onChange={(e) => setQuickReviewName(e.target.value)}
                      placeholder="Your name"
                      className="px-3 py-2 text-xs rounded-lg border border-[#E6E1D8] bg-[#FAF8F5]"
                    />
                    <select
                      value={quickReviewArea}
                      onChange={(e) => setQuickReviewArea(e.target.value)}
                      className="px-3 py-2 text-xs rounded-lg border border-[#E6E1D8] bg-[#FAF8F5]"
                    >
                      <option>Tiong Bahru</option>
                      <option>Tampines</option>
                      <option>Toa Payoh</option>
                      <option>Jurong East</option>
                      <option>Joo Chiat</option>
                      <option>Little India</option>
                      <option>Bedok</option>
                    </select>
                    <select
                      value={quickReviewOutcome}
                      onChange={(e) => setQuickReviewOutcome(e.target.value)}
                      className="px-3 py-2 text-xs rounded-lg border border-[#E6E1D8] bg-[#FAF8F5]"
                    >
                      <option>Turned out Shiok!</option>
                      <option>Kids Loved It</option>
                      <option>Elder-Approved Soft</option>
                      <option>Modified Spice/Salt</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    value={quickReviewComment}
                    onChange={(e) => setQuickReviewComment(e.target.value)}
                    placeholder="How did your dish turn out? (e.g. Finished in 8 mins flat, fish stayed super flaky)"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6E1D8] bg-[#FAF8F5]"
                  />

                  <input
                    type="text"
                    value={quickReviewSuggestion}
                    onChange={(e) => setQuickReviewSuggestion(e.target.value)}
                    placeholder="Your suggestion to improve the dish (e.g. Add 2 bruised pandan leaves or swap in firm tofu)"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E6E1D8] bg-[#FAF8F5]"
                  />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[#156147] font-semibold">
                      {quickReviewSaved ? 'Posted to Community Kitchen Feed!' : ''}
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#B9381E] hover:bg-[#9E2E17] transition-colors whitespace-nowrap"
                    >
                      Submit Cook Feedback & Tip
                    </button>
                  </div>
                </form>
              </div>

              {/* Live Community Cook Logs Feed */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                    Recent Home Cook Notes for {selectedClinicDish.localName.split(' ')[0]}
                  </h3>
                  <span className="text-xs font-mono tabular-nums text-[#57534E]">
                    {(cookLogsByDish[selectedClinicDish.id] || []).length} verified entries
                  </span>
                </div>

                <div className="space-y-3">
                  {(cookLogsByDish[selectedClinicDish.id] || []).map((log) => (
                    <div
                      key={log.id}
                      className="p-5 rounded-xl bg-white border border-[#E6E1D8] space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-xs text-[#57534E]">
                        <div>
                          <span className="font-semibold text-[#1C1917]">{log.userName}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{log.neighbourhood}</span>
                          <span aria-hidden="true"> · </span>
                          <span className="font-mono tabular-nums text-[#B9381E] font-semibold">
                            {log.cookTimeActualMins} mins cook time
                          </span>
                        </div>
                        <span>{log.timestamp}</span>
                      </div>

                      <div className="text-xs font-semibold text-[#156147]">
                        Result: {log.outcomeTag}
                      </div>

                      <p className="text-sm text-[#1C1917] leading-relaxed">{log.comment}</p>

                      <div className="p-3.5 rounded-lg bg-[#F2EFE9] text-xs">
                        <strong className="text-[#1C1917]">
                          Cook’s Input to Improve This Dish:{' '}
                        </strong>
                        <span className="text-[#57534E]">{log.userSuggestion}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => handleOpenDish(selectedClinicDish, 'steps')}
                          className="text-xs font-semibold text-[#B9381E] hover:underline"
                        >
                          View {selectedClinicDish.totalTimeMins}-Min Recipe →
                        </button>
                        <button
                          onClick={() => handleUpvoteLog(selectedClinicDish.id, log.id)}
                          className="inline-flex items-center gap-1.5 text-xs text-[#57534E] hover:text-[#1C1917] transition-colors"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span className="font-mono tabular-nums">
                            Helpful ({log.helpfulCount})
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E6E1D8] bg-[#F2EFE9]/70 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#57534E]">
          <div>
            <span className="font-display font-semibold text-[#1C1917]">Shiok in 10</span> · Singapore’s 5–10 Minute Multi-Cultural Heritage Kitchen for Busy People, Parents & Elders.
          </div>
          <div className="flex items-center gap-5">
            <a href="#recipes" className="hover:text-[#1C1917]">
              Recipes
            </a>
            <a href="#balanced-matcher" className="hover:text-[#1C1917]">
              Balanced Matcher
            </a>
            <a href="#kids-elders" className="hover:text-[#1C1917]">
              Kids & Elders
            </a>
            <a href="#supermarkets" className="hover:text-[#1C1917]">
              Supermarkets
            </a>
            <button onClick={() => setBasketOpen(true)} className="hover:text-[#1C1917]">
              Shopping Basket ({basketEntries.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Dish Detail & Cooking Timer Modal */}
      {activeDish && (
        <DishCookbookModal
          dish={activeDish}
          onClose={() => setActiveDish(null)}
          onAddIngredientsToBasket={handleAddIngredientsToBasket}
          customLogs={cookLogsByDish[activeDish.id] || []}
          onAddCookLog={handleAddCookLog}
          onUpvoteLog={handleUpvoteLog}
          initialTab={activeModalTab}
        />
      )}

      {/* Interactive Supermarket Shopping Basket Drawer */}
      <ShoppingBasketDrawer
        isOpen={basketOpen}
        onClose={() => setBasketOpen(false)}
        entries={basketEntries}
        onToggleChecked={handleToggleBasketChecked}
        onRemoveEntry={handleRemoveBasketEntry}
        onClearAll={handleClearBasket}
      />
    </div>
  );
}
