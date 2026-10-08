export type CulturalCategory =
  | 'All'
  | 'Halal'
  | 'Vegetarian'
  | 'Chinese'
  | 'Malay'
  | 'Indian'
  | 'Peranakan'
  | 'Kids'
  | 'Elders';

export interface IngredientItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  notes: string;
  aisle: string;
  estimatedSgd: number;
  freshTip: string;
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  instruction: string;
  durationSec: number;
  heatLevel: 'High Wok Heat' | 'Gentle Simmer' | 'Medium Skillet' | 'Steam / No-Fire';
  sensoryCue: string;
}

export interface DiagnosticFix {
  id: string;
  outcomeLabel: string;
  whyItHappened: string;
  instantRescue: string;
  nextTimeUpgrade: string;
}

export interface CommunityCookLog {
  id: string;
  userName: string;
  neighbourhood: string;
  cookTimeActualMins: number;
  outcomeTag: string;
  rating: number;
  comment: string;
  userSuggestion: string;
  helpfulCount: number;
  timestamp: string;
}

export interface DishRecipe {
  id: string;
  title: string;
  localName: string;
  phonetic: string;
  tagline: string;
  imageUrl: string;
  fallbackAccent: string;
  prepTimeMins: number;
  cookTimeMins: number;
  totalTimeMins: number;
  calories: number;
  proteinG: number;
  carbsG: number;
  fiberG: number;
  sodiumMg: number;
  culturalOrigin: string;
  categories: CulturalCategory[];
  dietaryHighlights: string[];
  appliance: 'One-Skillet / Wok' | 'Covered Steamer / Pan' | 'Rice Cooker / Pot';
  originEra: string;
  historyStory: string;
  funFacts: string[];
  speedSecret: string;
  kidMealAdaptation: {
    title: string;
    ageGroup: string;
    modification: string;
    lunchboxTip: string;
  };
  elderMenuAdaptation: {
    title: string;
    healthFocus: string;
    textureAndSodiumTip: string;
    digestionNote: string;
  };
  ingredients: IngredientItem[];
  steps: CookingStep[];
  diagnostics: DiagnosticFix[];
  initialLogs: CommunityCookLog[];
  recommendedSupermarketIds: string[];
}

export interface SingaporeSupermarket {
  id: string;
  name: string;
  chain: 'FairPrice Finest' | 'Sheng Siong' | 'Cold Storage' | 'Mustafa / Tekka' | 'Prime Supermarket' | 'Don Don Donki';
  area: 'Central / Tiong Bahru' | 'East / Tampines & Bedok' | 'West / Jurong East' | 'North / Woodlands' | 'Central / Little India' | 'East / Joo Chiat & Katong' | 'Heartland / Toa Payoh';
  nearestMrt: string;
  address: string;
  hours: string;
  halalCounterStrength: string;
  freshSpecialty: string;
  wetMarketInsiderTip: string;
  featuredPasteOrShortcut: string;
}

export const HERO_IMAGE_URL = '/images/sg_hawker_spread_hero.jpg';

export const SINGAPORE_DISHES: DishRecipe[] = [
  {
    id: 'hainanese-ginger-chicken',
    title: 'Purvis Street 8-Min Ginger-Scallion Chicken Rice Bowl',
    localName: '海南鸡饭碗 (Hǎinán Jī Fàn)',
    phonetic: 'Hai-Nan Jee Fan',
    tagline: 'Velvety butterfly-poached chicken breast steeped in aromatic ginger-pandan broth over warm grain rice.',
    imageUrl: '/images/dish_hainanese_chicken.jpg',
    fallbackAccent: '#D97706',
    prepTimeMins: 3,
    cookTimeMins: 5,
    totalTimeMins: 8,
    calories: 440,
    proteinG: 36,
    carbsG: 46,
    fiberG: 4,
    sodiumMg: 480,
    culturalOrigin: 'Hainanese Chinese',
    categories: ['Chinese', 'Halal', 'Kids', 'Elders'],
    dietaryHighlights: ['Halal-Friendly (Use Halal Poultry)', 'Low-Sodium Option', 'High-Protein', 'Dairy-Free'],
    appliance: 'Covered Steamer / Pan',
    originEra: '1930s Purvis Street & Beach Road, Singapore',
    historyStory:
      'Brought to Singapore in the early 20th century by immigrants from Wenchang in Hainan Island, "Wenchang Chicken" was adapted by early street hawkers like Wong Yi Guan, who carried bamboo baskets through Hylam Street and Purvis Street. In Singapore, cooks perfected the silky skin texture by plunging poached birds into ice baths and pairing the meat with pandan-infused rice and tangy red chili-garlic dip.',
    funFacts: [
      'Early Hainanese hawkers in 1930s Singapore sold chicken rice slices wrapped in banana leaves or Opeh (betel nut palm) leaves before ceramic plates became standard.',
      'In Singapore, the rice itself is considered the true test of a master—local stalls bruise fresh pandan leaves from backyard pots to perfume the broth.',
      'By slicing chicken breast at a 30-degree bias (butterfly cut) and using residual off-heat poaching, you get the exact silky hawker texture in 4 minutes instead of 45 minutes.'
    ],
    speedSecret:
      'Instead of boiling a whole bird for 45 minutes, slice boneless chicken breast on a thin diagonal bias, coat with a 1/2 tsp of cornstarch and sesame oil, and poach in simmering ginger-scallion stock for just 3.5 minutes with the lid on.',
    kidMealAdaptation: {
      title: 'Junior Panda Hainan Chicken Rice Balls',
      ageGroup: 'Ages 2–10',
      modification: 'Omit the chili dip; roll warm chicken-broth rice with finely shredded poached chicken and diced Japanese cucumber into bite-sized balls.',
      lunchboxTip: 'Brush a drop of sweet dark soy sauce (kicap manis) on top—kids love the caramel-sweet flavour without any heat.'
    },
    elderMenuAdaptation: {
      title: 'Velvet Poached Chicken with Warm Ginger Congee Base',
      healthFocus: 'Easy Swallowing, Joint-Warming Ginger & Low Sodium',
      textureAndSodiumTip: 'Cornstarch-velveted chicken slices require minimal chewing. Replace half the soy seasoning with homemade ginger-scallion infuse oil to cut sodium by 40%.',
      digestionNote: 'Old ginger (Lao Jiang) stimulates gastric warmth and aids protein digestion for seniors.'
    },
    ingredients: [
      {
        id: 'hc-1',
        name: 'Fresh Boneless Chicken Breast or Thigh Fillet (Halal certified)',
        amount: 220,
        unit: 'g',
        notes: 'Sliced thinly at a 30-degree angle',
        aisle: 'Chilled Poultry Counter',
        estimatedSgd: 3.80,
        freshTip: 'Choose chilled Sakura or Pasar fresh chicken fillet for zero thawing time.'
      },
      {
        id: 'hc-2',
        name: 'Pre-Steamed Fragrant Jasmine or Brown Microwave Rice Cup',
        amount: 200,
        unit: 'g',
        notes: 'Or leftover overnight rice',
        aisle: 'Rice & Grains Aisle',
        estimatedSgd: 1.90,
        freshTip: 'Toss hot rice with 1/2 tsp sesame oil and a bruised pandan knot while heating.'
      },
      {
        id: 'hc-3',
        name: 'Fresh Grated Old Ginger & Spring Onion',
        amount: 30,
        unit: 'g',
        notes: 'Finely minced (or ready-jarred Bentong ginger paste)',
        aisle: 'Fresh Herbs & Produce',
        estimatedSgd: 0.90,
        freshTip: 'Pre-minced ginger tubes in FairPrice save 2 minutes of peeling on busy weeknights.'
      },
      {
        id: 'hc-4',
        name: 'Japanese Cucumber & Fresh Coriander',
        amount: 80,
        unit: 'g',
        notes: 'Thinly coined for crunch and potassium balance',
        aisle: 'Chilled Vegetables',
        estimatedSgd: 1.20,
        freshTip: 'Japanese kyuri cucumbers have tender skin that elders and kids can chew effortlessly.'
      },
      {
        id: 'hc-5',
        name: 'Low-Sodium Chicken Broth + Dark Soy & Sesame Oil',
        amount: 180,
        unit: 'ml',
        notes: '150ml broth + 1 tsp dark soy + 1 tsp sesame oil',
        aisle: 'Asian Sauces & Condiments',
        estimatedSgd: 1.10,
        freshTip: 'Look for Healthier Choice Symbol (HCS) reduced-sodium chicken stock.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Velvet the Bias-Sliced Chicken',
        instruction: 'Slice chicken fillet thinly at a 30° angle. Toss in a bowl with 1/2 tsp sesame oil, a pinch of white pepper, and 1/2 tsp cornstarch to lock in moisture.',
        durationSec: 90,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Chicken slices look glossy and evenly coated.'
      },
      {
        stepNumber: 2,
        title: 'Flash-Bloom Ginger, Scallion & Pandan Broth',
        instruction: 'In a wide skillet with a lid, heat 1 tsp oil over medium heat. Sizzle grated ginger and white scallion parts for 30 seconds, then pour in 180ml chicken stock and bring to a rapid bubble.',
        durationSec: 90,
        heatLevel: 'Medium Skillet',
        sensoryCue: 'Fragrant ginger steam fills the kitchen immediately.'
      },
      {
        stepNumber: 3,
        title: 'Residual Heat Silk-Poach',
        instruction: 'Lay the chicken slices in a single layer in the simmering broth. Cover tightly with the lid, reduce heat to very low for 2 minutes, then turn OFF heat and let sit covered for 1 minute.',
        durationSec: 180,
        heatLevel: 'Gentle Simmer',
        sensoryCue: 'Chicken turns opaque ivory-white and remains springy when pressed.'
      },
      {
        stepNumber: 4,
        title: 'Assemble Bowl with Broth Drizzle',
        instruction: 'Fluff warm rice into a bowl with cucumber slices. Fan the poached chicken on top, spoon 3 tbsp of the aromatic ginger poaching broth over, and finish with a ribbon of dark soy and green scallions.',
        durationSec: 90,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Glossy amber soy contrasts with tender white chicken and emerald cucumber.'
      }
    ],
    diagnostics: [
      {
        id: 'hc-diag-1',
        outcomeLabel: 'Chicken turned out slightly tough or dry',
        whyItHappened: 'The broth was kept at a rolling boil rather than gentle sub-simmer, causing muscle fibers to contract.',
        instantRescue: 'Slice the chicken finer and spoon 3 extra tablespoons of hot poaching broth + 1/2 tsp sesame oil directly over the meat.',
        nextTimeUpgrade: 'Never skip the 1/2 tsp cornstarch "velveting" coat, and turn the burner completely off for the final 60 seconds with the lid closed.'
      },
      {
        id: 'hc-diag-2',
        outcomeLabel: 'Ginger flavour felt too weak / bland',
        whyItHappened: 'Ginger was added after the liquid instead of sizzling in warm oil first.',
        instantRescue: 'Microwave 1 tsp grated ginger with 1 tsp sesame oil for 20 seconds and drizzle directly over the plated chicken.',
        nextTimeUpgrade: 'Sizzle the ginger in oil for 30 full seconds until golden at the edges before adding broth.'
      },
      {
        id: 'hc-diag-3',
        outcomeLabel: 'Broth tasted too salty for elders or kids',
        whyItHappened: 'Commercial stock combined with dark soy exceeded sodium balance.',
        instantRescue: 'Dilute the bowl broth with 60ml warm water and add 2 extra slices of fresh cucumber to balance the palate.',
        nextTimeUpgrade: 'Poach in plain water infused with ginger and pandan, and use only 1/2 tsp sweet dark soy at the end.'
      }
    ],
    initialLogs: [
      {
        id: 'log-hc-1',
        userName: 'Cheryl Tan',
        neighbourhood: 'Toa Payoh Lor 4',
        cookTimeActualMins: 8,
        outcomeTag: 'Turned out Shiok!',
        rating: 5,
        comment: 'The cornstarch + off-heat lid trick is a revelation after my 7pm MRT commute. My 6-year-old finished the whole bowl!',
        userSuggestion: 'I threw a handful of baby spinach into the broth during the last 60 seconds of residual steaming—wilted nicely with zero extra pots.',
        helpfulCount: 34,
        timestamp: '2 hours ago'
      },
      {
        id: 'log-hc-2',
        userName: 'Uncle Lim K.H.',
        neighbourhood: 'Tiong Bahru',
        cookTimeActualMins: 9,
        outcomeTag: 'Soft & Elder-Approved',
        rating: 5,
        comment: 'Cooked this for my 78yo mother. Using chicken thigh fillet sliced thin made it tender enough for her dentures.',
        userSuggestion: 'Add 4 wolfberries (goji berries) into the poaching liquid for natural sweetness without salt.',
        helpfulCount: 19,
        timestamp: 'Yesterday'
      }
    ],
    recommendedSupermarketIds: ['fp-tiong-bahru', 'ss-toa-payoh', 'cs-katong']
  },
  {
    id: 'malay-ikan-sambal-tumis',
    title: 'Kampong Gelam 8-Min Ikan Sambal Tumis (Tamarind Chili Snapper)',
    localName: 'Ikan Merah Masak Sambal Tumis',
    phonetic: 'Ee-kan Sam-bal Too-mis',
    tagline: 'Golden pan-seared snapper fillet glazed in glossy, caramelized shallot-tamarind sambal with fresh calamansi.',
    imageUrl: '/images/dish_sambal_fish_malay.jpg',
    fallbackAccent: '#B9381E',
    prepTimeMins: 2,
    cookTimeMins: 6,
    totalTimeMins: 8,
    calories: 390,
    proteinG: 34,
    carbsG: 18,
    fiberG: 3,
    sodiumMg: 460,
    culturalOrigin: 'Halal Malay',
    categories: ['Malay', 'Halal', 'Elders'],
    dietaryHighlights: ['100% Halal Tradition', 'Omega-3 Rich Marine Protein', 'Gluten-Free', 'Dairy-Free'],
    appliance: 'One-Skillet / Wok',
    originEra: 'Maritime Nusantara & Kampong Gelam Port Era',
    historyStory:
      'Rooted in Singapore’s coastal Malay and Orang Laut seafaring kitchens, Ikan Sambal Tumis pairs freshly landed reef fish (like Ikan Merah or Batang) with "tumis"—the technique of sautéing pounded chilies, shallots, and belacan until the oil separates (pecah minyak). A splash of asam jawa (tamarind pulp) and gula melaka creates the unmistakable sweet-sour-savory harmony of Nasi Padang stalls along Arab Street and Geylang Serai.',
    funFacts: [
      'In Malay culinary mastery, "pecah minyak" (breaking the oil) is the key milestone where chili paste transforms from raw heat into deep, rounded caramel richness.',
      'Calamansi lime (limau kasturi) squeezed just before serving brightens the heavy spice notes and aids iron absorption.',
      'Using boneless skin-on red snapper or threadfin fillet lets the fish sear in 3 minutes flat while pre-cooked artisan sambal tumis paste blooms in 90 seconds.'
    ],
    speedSecret:
      'Sear the fish fillet first, then use the hot fish-infused skillet edges to caramelize 2 tablespoons of ready-made Halal Sambal Tumis paste with a splash of tamarind water—reaching "pecah minyak" in 90 seconds.',
    kidMealAdaptation: {
      title: 'Sweet Kicap Manis & Calamansi Glazed Fish Fingers',
      ageGroup: 'Ages 3–11',
      modification: 'Before adding chili sambal to the pan, remove the child’s portion of golden pan-seared fish and glaze it in 1 tsp sweet soy sauce (Kicap Manis) and a squeeze of orange or calamansi.',
      lunchboxTip: 'Boneless red snapper or batang fish flakes cleanly without pin bones, making it safe for young eaters.'
    },
    elderMenuAdaptation: {
      title: 'Mild Asam Ginger Steamed Red Snapper',
      healthFocus: 'Heart-Healthy Omega-3 & Mild Gastric Comfort',
      textureAndSodiumTip: 'Use only 1/2 tbsp mild sambal mixed with 2 tbsp tamarind water and tomato wedges for a gentle, moist gravy that softens the fish.',
      digestionNote: 'Red snapper (Ikan Merah) has fine, short muscle fibers that break down easily and support cardiovascular health.'
    },
    ingredients: [
      {
        id: 'ist-1',
        name: 'Fresh Red Snapper (Ikan Merah) or Batang Fillet',
        amount: 220,
        unit: 'g',
        notes: 'Boneless, skin-on, patted dry',
        aisle: 'Fresh Fishery Counter',
        estimatedSgd: 5.50,
        freshTip: 'Sheng Siong’s fish counter will descale and portion fillets to exact thickness for free.'
      },
      {
        id: 'ist-2',
        name: 'Ready-Made Halal Sambal Tumis Paste',
        amount: 45,
        unit: 'g',
        notes: '2 tbsp (e.g. Kampong Koh, Singlong, or Adabi Halal)',
        aisle: 'Halal Paste & Rempah Aisle',
        estimatedSgd: 1.40,
        freshTip: 'Choose pastes where shallots are listed as the first ingredient for natural sweetness.'
      },
      {
        id: 'ist-3',
        name: 'Red Onion & Cherry Tomatoes',
        amount: 80,
        unit: 'g',
        notes: '1 small red onion wedged + 5 cherry tomatoes halved',
        aisle: 'Fresh Produce',
        estimatedSgd: 1.10,
        freshTip: 'Halved cherry tomatoes burst in 60 seconds, creating instant natural gravy.'
      },
      {
        id: 'ist-4',
        name: 'Seedless Tamarind Paste (Asam Jawa) + Gula Melaka',
        amount: 15,
        unit: 'g',
        notes: '1/2 tsp tamarind dissolved in 3 tbsp warm water',
        aisle: 'Malay & Indian Cooking Essentials',
        estimatedSgd: 0.60,
        freshTip: 'Seedless Adabi Asam Jawa paste dissolves in warm water in 5 seconds—no straining needed.'
      },
      {
        id: 'ist-5',
        name: 'Fresh Calamansi Limes (Limau Kasturi)',
        amount: 2,
        unit: 'pcs',
        notes: 'Halved, for squeezing at the table',
        aisle: 'Chilled Local Herbs',
        estimatedSgd: 0.50,
        freshTip: 'Roll the calamansi firmly on the chopping board before cutting to double the juice yield.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Turmeric Dust & Dry Fish Skin',
        instruction: 'Pat the snapper fillet dry with a paper towel and rub lightly with 1/4 tsp turmeric powder and a pinch of salt.',
        durationSec: 60,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Dry skin guarantees a crisp golden sear without sticking.'
      },
      {
        stepNumber: 2,
        title: 'Crisp-Sear the Snapper Fillet',
        instruction: 'Heat 1 tbsp oil in a non-stick skillet over medium-high heat. Place fish skin-side down for 2 minutes until crisp, flip, and sear flesh side for 1 minute.',
        durationSec: 180,
        heatLevel: 'High Wok Heat',
        sensoryCue: 'Skin blisters golden-brown and edges turn flaky.'
      },
      {
        stepNumber: 3,
        title: 'Sauté Onion & Sambal in Pan Side',
        instruction: 'Push the fish to one side of the skillet. Add red onion wedges, cherry tomatoes, and 2 tbsp Sambal Tumis paste to the clear side and stir-fry for 90 seconds.',
        durationSec: 90,
        heatLevel: 'Medium Skillet',
        sensoryCue: 'Crimson oil separates around the bubbling sambal and tomatoes soften.'
      },
      {
        stepNumber: 4,
        title: 'Glaze with Tamarind & Squeeze Calamansi',
        instruction: 'Pour in the 3 tbsp tamarind water, spoon the glossy sambal gravy over the fish for 60 seconds, then plate and squeeze fresh calamansi juice on top.',
        durationSec: 90,
        heatLevel: 'Gentle Simmer',
        sensoryCue: 'Glossy mahogany-red sambal coats the flaky white fish.'
      }
    ],
    diagnostics: [
      {
        id: 'ist-diag-1',
        outcomeLabel: 'Sambal tasted too fiery or sharp',
        whyItHappened: 'Chili paste varies in heat level and needed caramelized onion or palm sugar to round the edges.',
        instantRescue: 'Stir 1 tsp sweet soy sauce (Kicap Manis) or 1/2 tsp sugar + 3 halved cherry tomatoes into the pan gravy.',
        nextTimeUpgrade: 'Choose "Less Spicy" sambal tumis paste or blend 1:1 with tomato puree for family-friendly warmth.'
      },
      {
        id: 'ist-diag-2',
        outcomeLabel: 'Fish skin stuck to the pan or tore',
        whyItHappened: 'Moisture on the skin caused steaming instead of searing, or the fish was flipped too early.',
        instantRescue: 'Spoon the rich sambal and onion rings generously over the top—it hides any torn skin and infuses the flakes.',
        nextTimeUpgrade: 'Blot the fish skin thoroughly with kitchen paper and wait a full 120 seconds before touching it with the spatula.'
      }
    ],
    initialLogs: [
      {
        id: 'log-ist-1',
        userName: 'Nurul Aini',
        neighbourhood: 'Tampines St 21',
        cookTimeActualMins: 8,
        outcomeTag: 'Turned out Shiok!',
        rating: 5,
        comment: 'Halved cherry tomatoes in the sambal tumis is such a clever weeknight hack! Gives that natural sweet-tangy gravy in 1 minute.',
        userSuggestion: 'Throw in 4 ladies’ fingers (okra) sliced diagonally when frying the onions—turns it into a complete one-pan meal.',
        helpfulCount: 41,
        timestamp: '5 hours ago'
      }
    ],
    recommendedSupermarketIds: ['ss-tampines', 'fp-jurong', 'mustafa-little-india']
  },
  {
    id: 'hakka-thunder-tea-rice',
    title: '7-Min Hakka Thunder Tea Rice (Lei Cha) with 5-Spice Tofu',
    localName: '客家擂茶饭 (Kèjiā Léi Chá Fàn)',
    phonetic: 'Lay Cha Fan',
    tagline: 'Emerald basil-mint-green tea broth poured beside crunchy stir-fried French beans, diced firm tofu, and toasted nuts.',
    imageUrl: '/images/dish_thunder_tea_veg.jpg',
    fallbackAccent: '#156147',
    prepTimeMins: 3,
    cookTimeMins: 4,
    totalTimeMins: 7,
    calories: 375,
    proteinG: 18,
    carbsG: 42,
    fiberG: 11,
    sodiumMg: 310,
    culturalOrigin: 'Hakka Vegetarian',
    categories: ['Vegetarian', 'Chinese', 'Elders'],
    dietaryHighlights: ['100% Plant-Based / Vegetarian', 'High-Fiber (11g)', 'Low-Sodium (310mg)', 'Cholesterol-Free'],
    appliance: 'One-Skillet / Wok',
    originEra: 'Hakka Immigrant Heritage & Tanjong Pagar Markets',
    historyStory:
      'Known as "Lei Cha" (Pounded Tea), this medicinal-culinary dish traces back to Hakka communities who ground tea leaves, Thai basil, mint, mugwort, and toasted sesame seeds in a grooved clay mortar (lei bo) with a guava-wood pestle. Once a rare home cooked remedy in Singapore, Thunder Tea Rice became a beloved weekday health staple across hawker centres from Lau Pa Sat to Boon Lay.',
    funFacts: [
      'The name "Thunder Tea" (擂茶) comes from the rumbling thunder sound made when wooden pestles grind herbs and nuts against grooved clay bowls.',
      'Traditional Hakka elders served Lei Cha during humid monsoon weeks to clear internal heat ("祛湿") and boost alertness without heavy grease.',
      'Using a hand blender or artisanal unsweetened Lei Cha paste Packet cuts 35 minutes of mortar-pounding down to 30 seconds of whisking!'
    ],
    speedSecret:
      'Dice pre-baked Five-Spice Tau Kwa (firm tofu) and French beans into tiny 5mm "confetti" cubes—small surface area means the entire vegetable medley stir-fries in 2.5 minutes flat while you whisk hot water into pure Hakka Lei Cha paste.',
    kidMealAdaptation: {
      title: 'Crunchy Confetti Rainbow Tofu Rice Bowl',
      ageGroup: 'Ages 4–12',
      modification: 'Serve the herbal green tea broth on the side as a fun "dipping potion" or replace the tea broth with sweet corn & carrot soup while keeping the crunchy tofu-peanut-bean rice bowl.',
      lunchboxTip: 'Finely diced 5mm vegetables mixed into rice prevent picky eaters from picking out big greens.'
    },
    elderMenuAdaptation: {
      title: 'Warm Herbal Tea Congee with Softened Tofu & Sesame',
      healthFocus: 'Blood Pressure Friendly (310mg Sodium), High Antioxidant & Gut Fiber',
      textureAndSodiumTip: 'Cook the French beans 60 seconds longer with 2 tbsp water so they are tender, and use ground sesame powder instead of whole peanuts for safe chewing.',
      digestionNote: 'Warm peppermint and basil leaves in the Lei Cha broth soothe bloating and support healthy lipid levels.'
    },
    ingredients: [
      {
        id: 'lt-1',
        name: 'Pre-Baked Five-Spice Firm Tofu (Wu Xiang Tau Kwa)',
        amount: 120,
        unit: 'g',
        notes: 'Finely diced into 5mm cubes',
        aisle: 'Chilled Bean Curd & Tofu Counter',
        estimatedSgd: 1.50,
        freshTip: 'Fortune or Unicurd Five-Spice Tau Kwa is already seasoned and firm—zero pressing required.'
      },
      {
        id: 'lt-2',
        name: 'Fresh French Beans & Chye Sim Stems',
        amount: 130,
        unit: 'g',
        notes: 'Finely sliced into 5mm rounds',
        aisle: 'Chilled Vegetables',
        estimatedSgd: 1.60,
        freshTip: 'Stack 8 beans together and slice across once to chop the whole bunch in 30 seconds.'
      },
      {
        id: 'lt-3',
        name: 'Pure Hakka Lei Cha Paste (Unsweetened Herbal & Nut Paste)',
        amount: 40,
        unit: 'g',
        notes: '2 tbsp paste (or blend basil, mint, green tea & toasted peanuts)',
        aisle: 'Organic & Heritage Health Aisle',
        estimatedSgd: 2.20,
        freshTip: 'Available at FairPrice Finest organic shelves and local vegetarian supply stores.'
      },
      {
        id: 'lt-4',
        name: 'Sweet Preserved Radish (Chye Poh) & Toasted Peanuts',
        amount: 25,
        unit: 'g',
        notes: '1 tbsp rinsed sweet chye poh + 1 tbsp roasted peanuts/sesame',
        aisle: 'Dry Goods & Condiments',
        estimatedSgd: 0.80,
        freshTip: 'Always pick "Sweet" (Tian) Chye Poh rather than Salted for lower sodium and balanced flavour.'
      },
      {
        id: 'lt-5',
        name: 'Warm Multigrain or Brown Jasmine Rice',
        amount: 180,
        unit: 'g',
        notes: '1 steamed bowl',
        aisle: 'Rice & Wholegrains',
        estimatedSgd: 1.50,
        freshTip: 'Red cargo rice mixed with jasmine gives a nutty chew that pairs wonderfully with herbal soup.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Confetti-Dice the Tofu & Greens',
        instruction: 'Slice the French beans, chye sim stems, and five-spice tau kwa into tiny 5mm cubes so they cook rapidly and scoop neatly on one spoon.',
        durationSec: 120,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Uniform jewel-like green and golden-brown cubes.'
      },
      {
        stepNumber: 2,
        title: 'High-Heat Wok Toss Tofu, Chye Poh & Beans',
        instruction: 'Heat 1 tsp oil in a skillet over high heat. Toss in the diced tau kwa and sweet chye poh for 60 seconds until fragrant, then add the diced greens and 1 tbsp water for 90 seconds.',
        durationSec: 150,
        heatLevel: 'High Wok Heat',
        sensoryCue: 'Beans turn bright jade-green with a crisp-tender bite.'
      },
      {
        stepNumber: 3,
        title: 'Whisk the Emerald Thunder Tea Broth',
        instruction: 'In a mug or small bowl, whisk 2 tbsp Hakka Lei Cha herbal paste with 180ml hot boiled water until frothy and vibrant green.',
        durationSec: 60,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Refreshing aroma of basil, mint, toasted sesame, and green tea rises immediately.'
      },
      {
        stepNumber: 4,
        title: 'Arrange the Sector Bowl & Pour Broth',
        instruction: 'Mound warm multigrain rice in a wide bowl, arrange the tofu, greens, and roasted peanuts on top, and pour the warm emerald tea broth alongside.',
        durationSec: 60,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Vibrant emerald broth meets toasted nuts and colourful diced greens.'
      }
    ],
    diagnostics: [
      {
        id: 'lt-diag-1',
        outcomeLabel: 'Tea broth tasted slightly bitter or grassy',
        whyItHappened: 'Boiling water over-steeped the green tea polyphenols, or paste ratio was too concentrated.',
        instantRescue: 'Stir in 1 tsp toasted white sesame seeds, 30ml warm soy milk or water, and a tiny pinch of salt to unlock nutty sweetness.',
        nextTimeUpgrade: 'Use 80°C warm water (not rolling 100°C boiling water) when whisking the Lei Cha paste.'
      },
      {
        id: 'lt-diag-2',
        outcomeLabel: 'Vegetables felt too crunchy for senior family members',
        whyItHappened: 'French beans are naturally dense when stir-fried dry.',
        instantRescue: 'Pour the hot Lei Cha soup directly over the rice and greens and cover the bowl for 60 seconds to soften.',
        nextTimeUpgrade: 'Add 2 tbsp water and cover the skillet for 90 seconds during Step 2 for tender-soft veggies.'
      }
    ],
    initialLogs: [
      {
        id: 'log-lt-1',
        userName: 'Marcus Loh',
        neighbourhood: 'Joo Chiat',
        cookTimeActualMins: 7,
        outcomeTag: 'Light & Energizing',
        rating: 5,
        comment: 'My go-to work-from-home lunch! Zero food coma at 2pm and takes less time than ordering delivery.',
        userSuggestion: 'I add 1 tbsp of nutritional yeast or crushed roasted almonds on top for extra crunch and B-vitamins.',
        helpfulCount: 28,
        timestamp: '1 day ago'
      }
    ],
    recommendedSupermarketIds: ['fp-tiong-bahru', 'cs-katong', 'ss-toa-payoh']
  },
  {
    id: 'little-india-masala-thosai',
    title: 'Serangoon 9-Min Crispy Masala Thosai Skillet Wrap',
    localName: 'மசாலா தோசை (Masālā Tōcai)',
    phonetic: 'Ma-saa-la Tho-sigh',
    tagline: 'Lacy fermented rice-lentil crepe crisped in a home pan with spiced turmeric potato-pea mash and curry leaves.',
    imageUrl: '/images/dish_masala_thosai_indian.jpg',
    fallbackAccent: '#D97706',
    prepTimeMins: 3,
    cookTimeMins: 6,
    totalTimeMins: 9,
    calories: 360,
    proteinG: 14,
    carbsG: 54,
    fiberG: 7,
    sodiumMg: 340,
    culturalOrigin: 'South Indian (Vegetarian & Halal)',
    categories: ['Indian', 'Vegetarian', 'Halal', 'Kids'],
    dietaryHighlights: ['100% Vegetarian', 'Halal Friendly', 'Probiotic Fermented Batter', 'Naturally Gluten-Free'],
    appliance: 'One-Skillet / Wok',
    originEra: '1920s Serangoon Road & Tekka Market, Singapore',
    historyStory:
      'Brought by Tamil Nadu and Chettiar migrants who settled around Serangoon Road and Campbell Lane, Thosai (Dosa) became a beloved all-day Singaporean staple across Indian vegetarian restaurants and neighbourhood kopitiams. Because the batter of rice and urad dal (black gram lentils) is naturally fermented overnight in Singapore’s tropical warmth, it is rich in gut-friendly probiotics and bioavailable protein.',
    funFacts: [
      'Fermenting rice and urad dal increases vitamin B and vitamin C content while breaking down starches so the crepe feels feather-light on the stomach.',
      'In Singapore kopitiams, ordering "Thosai Egg Onion" or "Paper Thosai" is one of the healthiest hawker breakfasts listed by the Health Promotion Board.',
      'Chilled fresh Thosai batter tubs sold in every FairPrice, Sheng Siong, and Mustafa Centre let you pour restaurant-crisp crepes in 3 minutes with zero soaking or grinding.'
    ],
    speedSecret:
      'Use chilled fresh Singapore-made Thosai batter (e.g. Sri Murugan or Juscool tub) and microwave-steam diced potato cubes for 2.5 minutes while tempering mustard seeds and curry leaves in the pan—giving you authentic potato masala in 4 minutes instead of 25.',
    kidMealAdaptation: {
      title: 'Cheesy Cone Thosai with Sweet Coconut Dip',
      ageGroup: 'Ages 2–12',
      modification: 'Skip the green chili in the potato mash; sprinkle grated cheddar or mozzarella onto the thosai while on the skillet and roll it into a fun crispy cone shape.',
      lunchboxTip: 'Cut the rolled masala thosai into pinwheel sushi-style rounds for easy little-finger snacking.'
    },
    elderMenuAdaptation: {
      title: 'Soft Set Uttapam (Thick Pillow Pancake) with Grated Carrot',
      healthFocus: 'Gut Microbiome Probiotics & Soft Chew',
      textureAndSodiumTip: 'Instead of spreading the batter paper-thin and crispy, pour a slightly thicker circle and steam covered for 90 seconds into a soft, spongy "Set Thosai" that elders love.',
      digestionNote: 'Fermented urad dal and tempered cumin/asafoetida prevent gas and support gentle digestion.'
    },
    ingredients: [
      {
        id: 'mt-1',
        name: 'Fresh Chilled Thosai / Idli Batter Tub',
        amount: 180,
        unit: 'ml',
        notes: '2 ladles of ready fermented rice-lentil batter',
        aisle: 'Chilled Tofu & Fresh Noodles / Batter Section',
        estimatedSgd: 2.40,
        freshTip: 'Stir batter gently with 1 tbsp water until it has the consistency of pourable heavy cream.'
      },
      {
        id: 'mt-2',
        name: 'Potato & Green Peas (or Crumbled Paneer)',
        amount: 150,
        unit: 'g',
        notes: '1 medium potato diced small + 2 tbsp green peas',
        aisle: 'Fresh Produce',
        estimatedSgd: 1.20,
        freshTip: 'Dice potato into 1cm cubes and microwave covered with 2 tbsp water for 2.5 mins until fork-tender.'
      },
      {
        id: 'mt-3',
        name: 'Fresh Curry Leaves, Mustard Seeds & Turmeric',
        amount: 10,
        unit: 'g',
        notes: '1 sprig curry leaves + 1/2 tsp mustard seeds + 1/3 tsp turmeric',
        aisle: 'Fresh Herbs & Spice Aisle',
        estimatedSgd: 0.70,
        freshTip: 'Keep extra curry leaf sprigs in a freezer zip bag—they sizzle Straight from frozen!'
      },
      {
        id: 'mt-4',
        name: 'Red Onion & Grated Carrot',
        amount: 60,
        unit: 'g',
        notes: 'Finely diced for natural sweetness',
        aisle: 'Fresh Vegetables',
        estimatedSgd: 0.80,
        freshTip: 'Grated carrot adds beta-carotene and keeps the potato filling moist.'
      },
      {
        id: 'mt-5',
        name: 'Fresh Chilled Coconut Chutney or Dhal',
        amount: 50,
        unit: 'g',
        notes: 'Ready-to-serve tub or quick Greek yogurt + grated coconut',
        aisle: 'Chilled Dips / Indian Section',
        estimatedSgd: 1.50,
        freshTip: 'Sri Murugan chilled chutney packs sit right beside the thosai batter in FairPrice.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: '2.5-Min Steam-Soften Potato Cubes',
        instruction: 'Place 1cm diced potatoes and green peas in a microwave-safe bowl with 2 tbsp water. Cover and microwave on high for 2.5 minutes (or boil covered in a small pan), then lightly mash with a fork.',
        durationSec: 150,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Potatoes crush effortlessly with the back of a fork.'
      },
      {
        stepNumber: 2,
        title: 'Temper Mustard Seeds, Curry Leaves & Turmeric Masala',
        instruction: 'In a non-stick skillet over medium heat, warm 1 tsp oil or ghee. Pop the mustard seeds and curry leaves for 20 seconds, sauté diced onion and carrot for 60 seconds, then fold in mashed potatoes, turmeric, and a pinch of salt. Transfer filling to a plate.',
        durationSec: 120,
        heatLevel: 'Medium Skillet',
        sensoryCue: 'Mustard seeds crackle and turmeric turns the potato mash vibrant golden yellow.'
      },
      {
        stepNumber: 3,
        title: 'Swirl & Crisp the Lacy Thosai Crepe',
        instruction: 'Wipe the warm skillet with a damp cloth. Pour 1 ladle of thosai batter in the center and immediately spiral outward in circular motions with the back of the ladle. Drizzle 1/2 tsp oil around the rim and cook 2 minutes.',
        durationSec: 150,
        heatLevel: 'Medium Skillet',
        sensoryCue: 'Lacy holes form and the underside turns golden-chestnut crisp.'
      },
      {
        stepNumber: 4,
        title: 'Fill, Fold & Serve with Chutney',
        instruction: 'Spoon the warm turmeric potato masala down the center of the crisp thosai, fold both sides over like a cylinder, and serve hot with chilled coconut chutney.',
        durationSec: 60,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Audible crackle as you fold the golden crepe around the fragrant potato filling.'
      }
    ],
    diagnostics: [
      {
        id: 'mt-diag-1',
        outcomeLabel: 'Batter clumped onto the ladle instead of spreading smoothly',
        whyItHappened: 'The skillet was too hot when the batter hit the surface, cooking it before it could spread.',
        instantRescue: 'Add 2 tbsp water to thin the remaining batter into a quick Rava-style lacy pour-in crepe.',
        nextTimeUpgrade: 'Always wipe the skillet with a wet paper towel right before pouring to drop surface temperature to the sweet spot, then turn heat back up.'
      },
      {
        id: 'mt-diag-2',
        outcomeLabel: 'Thosai came out soft instead of crispy',
        whyItHappened: 'Batter was spread slightly thick or needed a few drops of oil/ghee along the outer edge.',
        instantRescue: 'Flip the thosai over for 30 seconds and press gently with a flat spatula to toast both sides.',
        nextTimeUpgrade: 'Spread from the center outward in one swift spiral and drizzle 1/2 tsp oil into the lacy holes.'
      }
    ],
    initialLogs: [
      {
        id: 'log-mt-1',
        userName: 'Priya Menon',
        neighbourhood: 'Farrer Park / Tekka',
        cookTimeActualMins: 9,
        outcomeTag: 'Crispy & Kid-Hit!',
        rating: 5,
        comment: 'The damp paper towel wipe before swirling the batter works every single time! Cracked an egg on my husband’s one and melted cheese on my son’s.',
        userSuggestion: 'Mix 2 tbsp crumbled paneer into the potato masala for an extra 8g of vegetarian protein.',
        helpfulCount: 37,
        timestamp: '3 hours ago'
      }
    ],
    recommendedSupermarketIds: ['mustafa-little-india', 'fp-jurong', 'ss-tampines']
  },
  {
    id: 'silky-trio-steamed-egg',
    title: '6-Min Silky Steamed Egg Custard with Threadfin & Wolfberries',
    localName: '三色鱼片水蒸蛋 (Sān Sè Shuǐ Zhēng Dàn)',
    phonetic: 'San-Seh Shway Jeng Dan',
    tagline: 'Mirror-smooth Cantonese-Singaporean steamed egg custard crowned with tender threadfin fish flakes and sweet wolfberries.',
    imageUrl: '/images/dish_silky_steamed_egg_elder_kids.jpg',
    fallbackAccent: '#D97706',
    prepTimeMins: 2,
    cookTimeMins: 4,
    totalTimeMins: 6,
    calories: 285,
    proteinG: 26,
    carbsG: 6,
    fiberG: 1,
    sodiumMg: 290,
    culturalOrigin: 'Cantonese / Singapore Home Heritage',
    categories: ['Chinese', 'Halal', 'Kids', 'Elders'],
    dietaryHighlights: ['Top Pick for Kids & Elders', 'Ultra-Soft Spoonable Texture', 'Low-Sodium (290mg)', 'High Bioavailable Protein'],
    appliance: 'Covered Steamer / Pan',
    originEra: '1950s Chinatown Samsui & Family Tenement Kitchens',
    historyStory:
      'In post-war Singapore shophouses from Kreta Ayer to Tiong Bahru, Cantonese and Teochew grandmothers perfected "Shui Zheng Dan" (Water Steamed Egg) as the ultimate nourishing dish that stretched two eggs and a few slices of Ngor He (Threadfin fish) to feed growing children and toothless elders alike. Threadfin is prized in Singapore as the "King of Baby & Convalescent Fish" for its boneless, buttery flesh and high DHA content.',
    funFacts: [
      'In Singapore wet markets, Threadfin (Ikan Kurau / Ngor He) is traditionally the very first fish introduced to toddlers and the top restorative protein for seniors.',
      'The golden ratio for mirror-smooth custard is 1 part egg to 1.5 parts warm broth—using half an eggshell as a measuring cup is a classic Singaporean grandma trick!',
      'Covering the bowl with an overturned saucer prevents condensation droplets from pockmarking the custard surface.'
    ],
    speedSecret:
      'Use warm (45°C) broth when whisking the eggs and steam in a shallow wide bowl placed inside a covered frying pan with 2cm of boiling water—it sets into a trembling silk pudding in 4 minutes flat.',
    kidMealAdaptation: {
      title: 'Golden Treasure Chest Custard (With Hidden Corn & Fish)',
      ageGroup: 'Ages 9 Months – 10 Years',
      modification: 'Hide 2 tbsp of sweet corn kernels and finely minced threadfin at the bottom of the bowl before pouring the egg mixture—kids love digging for "buried treasure".',
      lunchboxTip: 'Scoop over warm soft rice for a 1-bowl complete brain-development dinner.'
    },
    elderMenuAdaptation: {
      title: 'Zero-Chew Restorative Threadfin & Goji Custard',
      healthFocus: 'Dysphagia / Soft-Diet Safe, Eye Health (Lutein & Zeaxanthin), Low Salt',
      textureAndSodiumTip: 'Silky custard glides down effortlessly for seniors with dry mouth or chewing fatigue. Wolfberries lend natural sweetness so only 1/2 tsp light soy is needed.',
      digestionNote: 'Steamed egg and white fish have >95% protein digestibility with minimal digestive workload.'
    },
    ingredients: [
      {
        id: 'se-1',
        name: 'Fresh Pasteurized Kampong or Omega-3 Eggs',
        amount: 2,
        unit: 'large eggs',
        notes: 'Approx 110g liquid egg',
        aisle: 'Egg & Dairy Section',
        estimatedSgd: 1.20,
        freshTip: 'Room-temperature eggs whisk smoother and steam 45 seconds faster than cold fridge eggs.'
      },
      {
        id: 'se-2',
        name: 'Boneless Threadfin (Ngor He) or Snapper Slices',
        amount: 90,
        unit: 'g',
        notes: 'Cut into bite-sized ribbons or minced',
        aisle: 'Fresh Seafood Counter',
        estimatedSgd: 3.90,
        freshTip: 'Ask for belly-cut boneless threadfin—zero fine bones and naturally rich in Omega-3.'
      },
      {
        id: 'se-3',
        name: 'Warm Low-Sodium Chicken or Vegetable Stock',
        amount: 165,
        unit: 'ml',
        notes: 'Exact 1.5x volume of the eggs (approx 3 half-eggshells per egg)',
        aisle: 'Broths & Soups',
        estimatedSgd: 0.70,
        freshTip: 'Warm liquid removes dissolved air bubbles, preventing honeycomb holes in your custard.'
      },
      {
        id: 'se-4',
        name: 'Dried Wolfberries (Goji) & Chopped Spring Onion',
        amount: 12,
        unit: 'g',
        notes: '1 tbsp wolfberries soaked in warm water for 1 min',
        aisle: 'Dried Herbs & Spices',
        estimatedSgd: 0.40,
        freshTip: 'Wolfberries release natural sweetness and antioxidant zeaxanthin when steamed on top.'
      },
      {
        id: 'se-5',
        name: 'Light Soy Sauce & Toasted Sesame Oil',
        amount: 10,
        unit: 'ml',
        notes: '1 tsp light soy + 1/2 tsp sesame oil drizzled at the end',
        aisle: 'Asian Condiments',
        estimatedSgd: 0.30,
        freshTip: 'Add soy sauce AFTER steaming so the egg custard stays pale golden ivory.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Whisk Eggs with Warm Stock (1:1.5 Ratio)',
        instruction: 'Beat 2 eggs gently in a bowl with chopsticks, then slowly stir in 165ml warm stock. Skim off any surface foam with a spoon and pour into a wide shallow ceramic dish.',
        durationSec: 90,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Smooth pale yellow liquid with zero surface bubbles.'
      },
      {
        stepNumber: 2,
        title: 'Cover & Pan-Steam for 3 Minutes',
        instruction: 'Place the dish inside a wide skillet with 2cm of simmering water. Invert a heatproof plate over the bowl (to block water drips), cover the skillet lid, and steam over medium-low heat for 3 minutes.',
        durationSec: 180,
        heatLevel: 'Gentle Simmer',
        sensoryCue: 'Custard is 80% set and jiggles softly like tofu fa.'
      },
      {
        stepNumber: 3,
        title: 'Crown with Threadfin Slices & Wolfberries',
        instruction: 'Uncover quickly, lay the thin threadfin fish ribbons and soaked wolfberries gently on top of the custard surface, and re-cover to steam for 60 final seconds.',
        durationSec: 60,
        heatLevel: 'Gentle Simmer',
        sensoryCue: 'Fish turns opaque white on top without sinking to the bottom.'
      },
      {
        stepNumber: 4,
        title: 'Finish with Sesame-Soy & Scallion Confetti',
        instruction: 'Remove from steamer, drizzle 1 tsp light soy sauce and 1/2 tsp toasted sesame oil across the glossy top, and scatter chopped spring onions.',
        durationSec: 30,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Mirror-smooth custard trembles when nudged with a spoon.'
      }
    ],
    diagnostics: [
      {
        id: 'se-diag-1',
        outcomeLabel: 'Custard had tiny sponge-like holes (honeycomb texture)',
        whyItHappened: 'The steamer heat was too high, causing air bubbles inside the egg to boil and expand.',
        instantRescue: 'Drizzle 1 extra tbsp of warm broth and sesame oil over the top—the holes actually soak up the savory sauce deliciously!',
        nextTimeUpgrade: 'Keep the water at a gentle simmer (medium-low heat) and always cover the bowl with an upturned plate.'
      },
      {
        id: 'se-diag-2',
        outcomeLabel: 'Center of the custard was still slightly liquid',
        whyItHappened: 'A deep soup bowl was used instead of a wide shallow dish.',
        instantRescue: 'Cover the bowl and let it sit in the turned-off hot steamer pan for 90 extra seconds—residual heat will finish setting the center.',
        nextTimeUpgrade: 'Use a wide, shallow rimmed plate so heat penetrates evenly in 4 minutes.'
      }
    ],
    initialLogs: [
      {
        id: 'log-se-1',
        userName: 'Grace Lim',
        neighbourhood: 'Bedok North',
        cookTimeActualMins: 6,
        outcomeTag: 'Kids & Ah Ma Loved It',
        rating: 5,
        comment: 'Put the fish on top at minute 3 like the step said—it stayed right on top looking like a restaurant dish instead of sinking!',
        userSuggestion: 'If you have silken tofu, slice 4 thin squares at the bottom of the plate before pouring the egg for double protein.',
        helpfulCount: 52,
        timestamp: '6 hours ago'
      }
    ],
    recommendedSupermarketIds: ['ss-tampines', 'fp-tiong-bahru', 'ss-toa-payoh']
  },
  {
    id: 'katong-dry-laksa-bee-hoon',
    title: 'Joo Chiat 10-Min Dry Nyonya Laksa Tossed Bee Hoon',
    localName: '加东干炒娘惹叻沙 (Gān Chǎo Lè Shā)',
    phonetic: 'Ga-Dong Dry Lak-sa',
    tagline: 'Thick rice vermicelli wok-tossed in rich coconut-galangal rempah with tiger prawns, tau pok puffs, and laksa leaf.',
    imageUrl: '/images/sg_hawker_spread_hero.jpg',
    fallbackAccent: '#B9381E',
    prepTimeMins: 3,
    cookTimeMins: 7,
    totalTimeMins: 10,
    calories: 495,
    proteinG: 28,
    carbsG: 52,
    fiberG: 4,
    sodiumMg: 540,
    culturalOrigin: 'Peranakan Nyonya (Halal Option Available)',
    categories: ['Peranakan', 'Halal'],
    dietaryHighlights: ['Iconic East Coast Heritage', 'Halal Certified Rempah Option', 'Dairy-Free', 'Rich Seafood Protein'],
    appliance: 'One-Skillet / Wok',
    originEra: '1960s Joo Chiat & East Coast Road Peranakan Kitchens',
    historyStory:
      'Born from the marriage of early Chinese settlers and local Malay Archipelago traditions, Peranakan (Straits Chinese) Nyonya Laksa along East Coast Road became famous for its aromatic rempah of galangal, candlenut, lemongrass, and dried shrimp. In the late 1990s and 2000s, Singapore chefs pioneered "Dry Laksa"—reducing the coconut-rempah gravy until it clings tightly to every strand of thick bee hoon like an Asian carbonara.',
    funFacts: [
      'Traditional Katong Laksa noodles are cut short so diners can eat the entire bowl with just a ceramic soup spoon—no chopsticks required!',
      'Daun Kesum (Vietnamese coriander / Laksa leaf) is the irreplaceable botanical signature that gives Singapore laksa its peppery, citrusy finish.',
      'Dry Laksa uses 60% less coconut milk than soup laksa while delivering an even more concentrated rempah aroma in a single skillet.'
    ],
    speedSecret:
      'Buy fresh pre-parboiled Thick Laksa Bee Hoon (sold in the chilled noodle section) so there is zero boiling required—it absorbs the reduced coconut-laksa paste directly in the wok in 3 minutes.',
    kidMealAdaptation: {
      title: 'Mild Coconut Prawn & Fishcake Laksa Pasta',
      ageGroup: 'Ages 5–12',
      modification: 'Use just 1 tsp of laksa paste mixed with 60ml coconut milk and 60ml chicken stock—it tastes like a creamy, mildly spiced seafood rose pasta.',
      lunchboxTip: 'Dry laksa bee hoon does not turn soggy in a thermos lunchbox, unlike soup noodles!'
    },
    elderMenuAdaptation: {
      title: 'Light Soy-Milk Laksa Broth with Snipped Short Bee Hoon',
      healthFocus: 'Lower Saturated Fat & Easy Spoon-Only Eating',
      textureAndSodiumTip: 'Snip the thick bee hoon into 3cm Katong-style short lengths so elders can eat with a spoon, and swap half the coconut cream for unsweetened fresh soy milk.',
      digestionNote: 'Galangal (lengkuas) and lemongrass in the rempah act as carminative herbs that aid digestion.'
    },
    ingredients: [
      {
        id: 'dl-1',
        name: 'Fresh Chilled Thick Bee Hoon (Laksa Noodles)',
        amount: 200,
        unit: 'g',
        notes: 'Rinsed under warm tap water for 15 seconds',
        aisle: 'Chilled Fresh Noodles Section',
        estimatedSgd: 1.40,
        freshTip: 'Look for Fortune or Kang Kang pre-cooked Laksa Bee Hoon in the chiller aisle.'
      },
      {
        id: 'dl-2',
        name: 'Peeled Tiger Prawns & Sliced Fishcake',
        amount: 140,
        unit: 'g',
        notes: '6 peeled prawns + 6 slices cooked fishcake',
        aisle: 'Chilled Seafood & Surimi',
        estimatedSgd: 4.50,
        freshTip: 'Pre-peeled chilled grey prawns cook in just 90 seconds.'
      },
      {
        id: 'dl-3',
        name: 'Singapore Laksa Paste (Prima Taste, Dancing Chef, or Halal Brahim’s)',
        amount: 50,
        unit: 'g',
        notes: '2.5 tbsp aromatic laksa rempah paste',
        aisle: 'Local Heritage Paste Aisle',
        estimatedSgd: 2.20,
        freshTip: 'Dancing Chef Laksa Paste has zero MSG and artificial preservatives.'
      },
      {
        id: 'dl-4',
        name: 'Light Coconut Milk & Tau Pok (Fried Tofu Puffs)',
        amount: 100,
        unit: 'ml',
        notes: '80ml light coconut milk + 4 tau pok puffs sliced into strips',
        aisle: 'Coconut & Bean Curd Aisle',
        estimatedSgd: 1.60,
        freshTip: 'Tau pok strips act like flavour sponges, soaking up excess rempah oil.'
      },
      {
        id: 'dl-5',
        name: 'Fresh Bean Sprouts (Taugeh) & Laksa Leaf (Daun Kesum)',
        amount: 80,
        unit: 'g',
        notes: '1 handful crunchy taugeh + finely chiffonaded laksa leaves',
        aisle: 'Fresh Local Herbs & Sprouts',
        estimatedSgd: 1.00,
        freshTip: 'Strip laksa leaves from the woody stem, stack them, and slice into thin ribbons right before serving.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Bloom the Laksa Rempah Paste',
        instruction: 'Heat a wide skillet over medium heat. Add 2.5 tbsp Laksa paste and stir-fry for 60 seconds until the lemongrass and galangal aromatics release.',
        durationSec: 60,
        heatLevel: 'Medium Skillet',
        sensoryCue: 'Rich orange rempah bubbles and smells like an East Coast laksa stall.'
      },
      {
        stepNumber: 2,
        title: 'Simmer Coconut Emulsion with Prawns & Tau Pok',
        instruction: 'Pour in 80ml light coconut milk and 60ml water. Add the peeled prawns, sliced fishcake, and tau pok strips, simmering for 2 minutes until prawns turn pink.',
        durationSec: 120,
        heatLevel: 'Medium Skillet',
        sensoryCue: 'Prawns curl into a C-shape and tau pok puffs swell with gravy.'
      },
      {
        stepNumber: 3,
        title: 'Wok-Braise the Thick Bee Hoon & Bean Sprouts',
        instruction: 'Add the fresh thick bee hoon and bean sprouts directly into the skillet. Toss vigorously with tongs for 3 minutes until the noodles drink up all the creamy rempah sauce.',
        durationSec: 180,
        heatLevel: 'High Wok Heat',
        sensoryCue: 'Every white noodle strand turns glossy coral-orange with zero pooling liquid.'
      },
      {
        stepNumber: 4,
        title: 'Garnish with Fresh Laksa Leaf Confetti',
        instruction: 'Plate the steaming noodles and scatter generously with freshly sliced laksa leaves (daun kesum).',
        durationSec: 45,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Bright herbal laksa leaf fragrance cuts through the rich coconut rempah.'
      }
    ],
    diagnostics: [
      {
        id: 'dl-diag-1',
        outcomeLabel: 'Noodles felt slightly dry or stuck to the pan',
        whyItHappened: 'Thick bee hoon absorbed the liquid faster than expected over high heat.',
        instantRescue: 'Splash 3 tbsp of hot water or broth around the pan edges and toss for 20 seconds to re-emulsify the sauce.',
        nextTimeUpgrade: 'Rinse the chilled bee hoon under warm tap water for 20 seconds before adding it to the pan.'
      },
      {
        id: 'dl-diag-2',
        outcomeLabel: 'Sauce tasted too rich or heavy',
        whyItHappened: 'Coconut cream concentration was high after reduction.',
        instantRescue: 'Squeeze half a fresh calamansi lime over the noodles and toss in an extra handful of crunchy bean sprouts.',
        nextTimeUpgrade: 'Use light coconut milk or substitute half the coconut milk with low-sodium seafood/chicken stock.'
      }
    ],
    initialLogs: [
      {
        id: 'log-dl-1',
        userName: 'Kenneth & Mei',
        neighbourhood: 'Marine Parade',
        cookTimeActualMins: 10,
        outcomeTag: 'Better Than Hawker!',
        rating: 5,
        comment: 'Hosted 2 friends on a Tuesday night with this 10-min Dry Laksa. Nobody believed it took 10 minutes.',
        userSuggestion: 'Snip the noodles in the packet with kitchen scissors twice before opening—makes tossing in the pan so much easier!',
        helpfulCount: 64,
        timestamp: '1 day ago'
      }
    ],
    recommendedSupermarketIds: ['cs-katong', 'ss-tampines', 'fp-tiong-bahru']
  },
  {
    id: 'mamak-junior-roti-john',
    title: 'Chomp Chomp 7-Min Halal Roti John Hidden-Veggie Omelette Toast',
    localName: 'Roti John Ayam & Keju',
    phonetic: 'Ro-tee John',
    tagline: 'Pillowy baguette pressed directly into a sizzling minced chicken, grated carrot, and cheddar omelette on a flat pan.',
    imageUrl: '/images/dish_masala_thosai_indian.jpg',
    fallbackAccent: '#D97706',
    prepTimeMins: 2,
    cookTimeMins: 5,
    totalTimeMins: 7,
    calories: 410,
    proteinG: 27,
    carbsG: 36,
    fiberG: 4,
    sodiumMg: 410,
    culturalOrigin: 'Indian-Muslim Mamak (Halal)',
    categories: ['Halal', 'Indian', 'Malay', 'Kids'],
    dietaryHighlights: ['Busy Parents’ #1 Kid Pick', 'Hidden Grated Veggies', 'Halal Certified', 'High Calcium & Protein'],
    appliance: 'One-Skillet / Wok',
    originEra: '1970s Taman Serasi & Serangoon Gardens Hawker Stalls',
    historyStory:
      'A quintessential Singaporean invention, Roti John was popularized in the early 1970s by Indian-Muslim hawker Abdul Shukor at Taman Serasi Food Centre (near Botanic Gardens). Legend says colonial officers asked for a western-style omelette sandwich, and hawkers responded with "Silakan, John!"—pressing split French loaves face-down onto a spiced mutton or chicken omelette on a flat iron griddle.',
    funFacts: [
      'In Singapore English during the 1960s, hawkers affectionately called any Caucasian customer "John", giving birth to the name "Bread for John" (Roti John).',
      'Pressing the raw egg mixture directly into the cut bread crumb lets the loaf soak up protein custard like savory French toast before crisping.',
      'Grating carrot and baby spinach finely into the egg mixture hides a full serving of vegetables inside a golden cheesy crust kids devour.'
    ],
    speedSecret:
      'Use lean minced chicken breast (which cooks in 90 seconds when spread thin in the pan) and pour the whisked egg-veggie mix right over it before pressing a split soft sub roll on top.',
    kidMealAdaptation: {
      title: 'Mini Finger Soldiers with Homemade Tomato-Yogurt Drizzle',
      ageGroup: 'Ages 2–12',
      modification: 'Slice the finished Roti John crosswise into 6 dippable "toast soldiers" and drizzle with low-sugar tomato ketchup + Greek yogurt swirls.',
      lunchboxTip: 'Stays soft inside and toasty outside even at room temperature in school recess boxes.'
    },
    elderMenuAdaptation: {
      title: 'Soft Brioche Egg-Custard Press with Mild Curry Aroma',
      healthFocus: 'High Protein & Calorie-Dense for Seniors with Small Appetites',
      textureAndSodiumTip: 'Use soft crustless milk bread or brioche buns instead of crusty French baguette so seniors can bite through effortlessly.',
      digestionNote: 'A pinch of turmeric and cumin in the egg warms the stomach without spicy chili heat.'
    },
    ingredients: [
      {
        id: 'rj-1',
        name: 'Soft Wholemeal Sub Roll or Mini Baguette',
        amount: 1,
        unit: 'loaf (80g)',
        notes: 'Split lengthwise like a book',
        aisle: 'In-Store Bakery',
        estimatedSgd: 1.40,
        freshTip: 'Sunshine or Gardenia wholemeal hotdog buns are softer and faster to toast than crusty baguettes.'
      },
      {
        id: 'rj-2',
        name: 'Fresh Minced Chicken Breast (Halal)',
        amount: 100,
        unit: 'g',
        notes: 'Seasoned with 1/4 tsp mild curry powder',
        aisle: 'Chilled Poultry Counter',
        estimatedSgd: 2.10,
        freshTip: 'Flatten the minced chicken in the pan with a spatula so it sears in 90 seconds.'
      },
      {
        id: 'rj-3',
        name: 'Fresh Eggs & Finely Grated Carrot + Baby Spinach',
        amount: 2,
        unit: 'large eggs',
        notes: 'Whisked with 3 tbsp grated carrot & chopped spinach',
        aisle: 'Eggs & Chilled Greens',
        estimatedSgd: 1.50,
        freshTip: 'Fine box-grated carrot melts right into the omelette texture.'
      },
      {
        id: 'rj-4',
        name: 'Reduced-Fat Cheddar Slice or Mozzarella Shreds',
        amount: 25,
        unit: 'g',
        notes: 'Melted onto the warm omelette before folding',
        aisle: 'Dairy & Cheese Chiller',
        estimatedSgd: 0.90,
        freshTip: 'Adds 180mg of bone-building calcium for growing kids.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Whisk the Hidden-Veggie Spiced Egg',
        instruction: 'Beat 2 eggs in a bowl with finely grated carrot, finely chopped baby spinach, 1/4 tsp mild curry powder, and a pinch of salt.',
        durationSec: 60,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Bright orange and green flecks suspended in golden egg.'
      },
      {
        stepNumber: 2,
        title: 'Flash-Sear the Minced Chicken',
        instruction: 'Heat 1 tsp oil in a wide non-stick skillet over medium heat. Scatter the minced chicken in an oblong shape matching your bread loaf and sear for 90 seconds.',
        durationSec: 90,
        heatLevel: 'Medium Skillet',
        sensoryCue: 'Minced chicken turns golden-white and fragrant.'
      },
      {
        stepNumber: 3,
        title: 'Pour Egg & Press the Split Bread Face-Down',
        instruction: 'Pour the egg-veggie mixture directly over the sizzling chicken. Immediately press the open cut face of the bread loaf down onto the wet egg and cook for 2 minutes.',
        durationSec: 120,
        heatLevel: 'Medium Skillet',
        sensoryCue: 'Bread drinks up the egg custard and bonds to the omelette.'
      },
      {
        stepNumber: 4,
        title: 'Flip, Melt Cheese & Slice into Soldiers',
        instruction: 'Flip the entire loaf over for 30 seconds to lightly toast the back crust, lay cheddar cheese on the hot egg side, fold shut, and slice into 6 thick fingers.',
        durationSec: 60,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Cheese melts between the fluffy spiced egg and warm toasted bread.'
      }
    ],
    diagnostics: [
      {
        id: 'rj-diag-1',
        outcomeLabel: 'Egg didn’t stick to the bread when flipped',
        whyItHappened: 'The egg had already set completely before the bread was pressed on top.',
        instantRescue: 'Fold the cooked omelette separately and tuck it inside the toasted bread like a classic sub sandwich with melted cheese.',
        nextTimeUpgrade: 'Press the bread onto the egg within 5 seconds of pouring while the top surface of the egg is still liquid.'
      }
    ],
    initialLogs: [
      {
        id: 'log-rj-1',
        userName: 'Farhan & Zara',
        neighbourhood: 'Woodlands Dr 14',
        cookTimeActualMins: 7,
        outcomeTag: 'Kids Ate Every Crumb!',
        rating: 5,
        comment: 'My 4yo usually refuses spinach, but grated into Roti John with cheese she asked for seconds!',
        userSuggestion: 'You can also swap minced chicken for flaked canned tuna in spring water when you want a 5-minute version.',
        helpfulCount: 49,
        timestamp: '4 hours ago'
      }
    ],
    recommendedSupermarketIds: ['fp-jurong', 'ss-tampines', 'mustafa-little-india']
  },
  {
    id: 'teochew-fish-tofu-soup',
    title: '7-Min Teochew Sliced Snapper, Tomato & Silken Tofu Ginger Broth',
    localName: '潮州鱼片豆腐汤 (Cháozhōu Yú Piàn Tāng)',
    phonetic: 'Teo-Chew Yoo Pian Tang',
    tagline: 'Crystal-clear restorative ginger broth brimming with sweet burst tomatoes, silken tofu clouds, and tender fish slices.',
    imageUrl: '/images/dish_hainanese_chicken.jpg',
    fallbackAccent: '#156147',
    prepTimeMins: 2,
    cookTimeMins: 5,
    totalTimeMins: 7,
    calories: 265,
    proteinG: 32,
    carbsG: 11,
    fiberG: 3,
    sodiumMg: 270,
    culturalOrigin: 'Teochew Heritage (Halal & Elder-Friendly)',
    categories: ['Chinese', 'Halal', 'Elders', 'Kids'],
    dietaryHighlights: ['Elders’ #1 Restorative Pick', 'Ultra-Low Sodium (270mg)', 'Soft Chew & Hydrating', 'High-Protein Low-Fat'],
    appliance: 'Rice Cooker / Pot',
    originEra: 'Early Teochew Boat Quay & Ellenborough Market (New Market)',
    historyStory:
      'Known in old Singapore as "Swatow Market", Ellenborough Market along the Singapore River was the heart of Teochew culinary philosophy: let fresh marine ingredients speak with minimal seasoning. Teochew Sliced Fish Soup relies on ripe tomatoes (for natural glutamic umami), old ginger (to dispel dampness), and soft silken bean curd—making it the gold-standard therapeutic meal across every hospital, hawker centre, and family table in Singapore.',
    funFacts: [
      'Ripe red tomatoes are rich in natural glutamates—searing them briefly in oil before adding water creates a rich umami broth with almost no added salt.',
      'Traditional Teochew hawkers add a single Sour Plum (Suan Mei) or tomato wedge to balance fishiness and stimulate saliva for seniors with dry mouth.',
      'Adding 1 tablespoon of evaporated milk at the end gives you the beloved "Milky Fish Soup" variation while boosting calcium.'
    ],
    speedSecret:
      'Sear tomato wedges and ginger strips in the pot for 60 seconds before pouring in hot kettle water—the boiling water emulsifies the tomato lycopene into an instant golden soup base in 2 minutes.',
    kidMealAdaptation: {
      title: 'Milky Alphabet Noodle & Silken Tofu Fish Soup',
      ageGroup: 'Ages 1–10',
      modification: 'Stir in 1 tbsp evaporated milk or fresh milk at the end and serve with soft somen or alphabet pasta.',
      lunchboxTip: 'Pack in a preheated vacuum food jar—stays warm until school lunchtime.'
    },
    elderMenuAdaptation: {
      title: 'Heart-Smart Low-Sodium Lycopene & Ginger Fish Soup',
      healthFocus: 'Blood Pressure Safe (270mg Sodium), High Calcium Tofu & Joint Ginger',
      textureAndSodiumTip: 'Silken tofu and 2-minute poached fish require almost zero biting force. Tomato umami replaces salt cubes completely.',
      digestionNote: 'Warm clear broth hydrates seniors who often under-drink plain water during the day.'
    },
    ingredients: [
      {
        id: 'tf-1',
        name: 'Fresh Sliced Red Snapper or Batang Fish Fillet',
        amount: 160,
        unit: 'g',
        notes: 'Boneless slices',
        aisle: 'Fresh Fishery Counter',
        estimatedSgd: 4.50,
        freshTip: 'Buy pre-sliced "Steamboat Fish Slices" in FairPrice or Sheng Siong for zero knife work.'
      },
      {
        id: 'tf-2',
        name: 'Smooth Silken Tofu Tube (Egg Tofu or White Silken)',
        amount: 150,
        unit: 'g',
        notes: 'Sliced into 1.5cm medallions',
        aisle: 'Chilled Bean Curd Section',
        estimatedSgd: 1.10,
        freshTip: 'Cut the silken tofu tube right through the middle with a knife, then squeeze gently from both ends.'
      },
      {
        id: 'tf-3',
        name: 'Ripe Red Tomatoes & Baby Xiao Bai Cai / Lettuce',
        amount: 140,
        unit: 'g',
        notes: '1 ripe tomato wedged + 1 handful tender greens',
        aisle: 'Fresh Vegetables',
        estimatedSgd: 1.30,
        freshTip: 'Iceberg lettuce or baby spinach wilts in 20 seconds and stays silky soft.'
      },
      {
        id: 'tf-4',
        name: 'Julienne Old Ginger & White Pepper',
        amount: 15,
        unit: 'g',
        notes: 'Thin matchsticks of ginger',
        aisle: 'Fresh Herbs',
        estimatedSgd: 0.40,
        freshTip: 'Sarawak white pepper at the table adds warming aroma without sodium.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sizzle Ginger & Crush Tomato Wedges',
        instruction: 'In a small pot over medium-high heat, warm 1 tsp sesame oil. Sizzle the ginger strips and tomato wedges for 60 seconds, pressing the tomatoes lightly with a spoon so their juices release.',
        durationSec: 60,
        heatLevel: 'Medium Skillet',
        sensoryCue: 'Tomatoes release ruby-red lycopene oil and sweet aroma.'
      },
      {
        stepNumber: 2,
        title: 'Pour Hot Kettle Water & Add Silken Tofu',
        instruction: 'Pour in 350ml hot boiled water from your kettle (instant boil!) and gently slide in the silken tofu medallions. Simmer for 2 minutes.',
        durationSec: 120,
        heatLevel: 'Gentle Simmer',
        sensoryCue: 'Broth turns a warm coral-gold hue and tofu heats through.'
      },
      {
        stepNumber: 3,
        title: 'Poach Fish Slices & Greens for 90 Seconds',
        instruction: 'Lay the boneless fish slices and tender greens into the simmering soup. Cook for just 90 seconds until the fish curls and turns opaque white.',
        durationSec: 90,
        heatLevel: 'Gentle Simmer',
        sensoryCue: 'Fish flakes stay plump and tender without overcooking.'
      },
      {
        stepNumber: 4,
        title: 'Finish with White Pepper (Optional Splash of Milk)',
        instruction: 'Ladle into a deep bowl, dust with aromatic Sarawak white pepper, and optionally swirl in 1 tbsp evaporated milk for a creamy finish.',
        durationSec: 30,
        heatLevel: 'Steam / No-Fire',
        sensoryCue: 'Clean, fragrant, steaming bowl of comfort.'
      }
    ],
    diagnostics: [
      {
        id: 'tf-diag-1',
        outcomeLabel: 'Soup tasted slightly fishy',
        whyItHappened: 'Fish was added before the water reached a full simmer, or had surface moisture.',
        instantRescue: 'Add 3 extra thin slices of fresh ginger, a dash of white pepper, and 1/2 tsp sesame oil.',
        nextTimeUpgrade: 'Pat fish slices dry with paper towel and only slide them in when the tomato-ginger broth is actively bubbling.'
      }
    ],
    initialLogs: [
      {
        id: 'log-tf-1',
        userName: 'Dr. Evelyn Koh',
        neighbourhood: 'Novena / Toa Payoh',
        cookTimeActualMins: 7,
        outcomeTag: 'Top Elder & Post-Work Meal',
        rating: 5,
        comment: 'Searing the tomato wedges first in sesame oil before adding hot kettle water gives a 30-minute soup taste in 60 seconds.',
        userSuggestion: 'Drop in 1 bundle of soaked Tang Hoon (glass noodles) during Step 2 if you want a low-GI carb inside the soup.',
        helpfulCount: 44,
        timestamp: 'Yesterday'
      }
    ],
    recommendedSupermarketIds: ['ss-toa-payoh', 'fp-tiong-bahru', 'ss-tampines']
  }
];

export const SINGAPORE_SUPERMARKETS: SingaporeSupermarket[] = [
  {
    id: 'fp-tiong-bahru',
    name: 'NTUC FairPrice Finest — Tiong Bahru Plaza',
    chain: 'FairPrice Finest',
    area: 'Central / Tiong Bahru',
    nearestMrt: 'Tiong Bahru MRT (EW17) · Direct Basement Link',
    address: '302 Tiong Bahru Rd, #B1-101 Tiong Bahru Plaza, Singapore 168732',
    hours: 'Daily · 08:00 – 23:00',
    halalCounterStrength: 'Dedicated Halal Chilled Poultry, Brahim’s & Kampong Koh Rempah Section',
    freshSpecialty: 'Organic Hakka Lei Cha Paste, Pasar Fresh Herbs (Laksa Leaf, Pandan, Curry Leaf) & Sakura Chicken',
    wetMarketInsiderTip: 'If visiting before 11am, cross the street to Tiong Bahru Market Level 1 for wild-caught Threadfin (Ngor He) and fresh grated coconut.',
    featuredPasteOrShortcut: 'Dancing Chef No-MSG Laksa Paste & Pre-Minced Old Ginger Tubes (Aisle 4)'
  },
  {
    id: 'ss-tampines',
    name: 'Sheng Siong Supermarket — Tampines Central',
    chain: 'Sheng Siong',
    area: 'East / Tampines & Bedok',
    nearestMrt: 'Tampines MRT (EW2/DT32) · 4 min walk',
    address: '506 Tampines Central 1, #01-361, Singapore 520506',
    hours: 'Open 24 Hours Daily',
    halalCounterStrength: 'Full Halal Fresh Meat & Poultry Counter + Extensive Malay Adabi & Singlong Sambal Range',
    freshSpecialty: 'Wet-Market Grade Fresh Fish Counter (Free Descaling & Filleting for Red Snapper & Threadfin)',
    wetMarketInsiderTip: 'Ask the fishery uncle for "boneless slice cut" on Red Snapper or Batang—they prep it ready for the pan in 2 minutes.',
    featuredPasteOrShortcut: 'Chilled Fresh Thick Laksa Bee Hoon & Fortune 5-Spice Tau Kwa Twin Packs'
  },
  {
    id: 'mustafa-little-india',
    name: 'Mustafa Centre Fresh Supermarket & Tekka Hub',
    chain: 'Mustafa / Tekka',
    area: 'Central / Little India',
    nearestMrt: 'Farrer Park MRT (NE8) · 3 min walk',
    address: '145 Syed Alwi Rd, Level 2 Fresh Groceries, Singapore 207704',
    hours: 'Open 24 Hours Daily',
    halalCounterStrength: '100% Halal Meat & Seafood Counters + Largest Spice & Lentil Selection in Singapore',
    freshSpecialty: 'Freshly Ground Chilled Thosai/Idli Batters, Fresh Paneer, Curry Leaves by the Bundle & Calamansi',
    wetMarketInsiderTip: 'Pick up Sri Murugan or homemade chilled Thosai batter tubs alongside fresh coconut chutney packs in the dairy chiller.',
    featuredPasteOrShortcut: 'Pre-Tempered Mustard & Curry Leaf Spice Mixes + Fresh Paneer Cubes'
  },
  {
    id: 'cs-katong',
    name: 'Cold Storage — i12 Katong (Joo Chiat Heritage Hub)',
    chain: 'Cold Storage',
    area: 'East / Joo Chiat & Katong',
    nearestMrt: 'Marine Parade MRT (TE26) · 4 min walk',
    address: '112 East Coast Rd, #B1-15 i12 Katong, Singapore 428802',
    hours: 'Daily · 08:30 – 22:00',
    halalCounterStrength: 'Certified Halal Chilled Poultry & Peranakan Heritage Paste Collection',
    freshSpecialty: 'Sashimi-Grade Threadfin & Snapper Fillets, Organic Baby Spinach, and Artisanal Nyonya Rempahs',
    wetMarketInsiderTip: 'Just 200m up Joo Chiat Road, Koon Seng Road dry provision shops carry freshly pounded candlenut and galangal pastes.',
    featuredPasteOrShortcut: 'Peeled Ready-to-Wok Tiger Prawns & Organic Pasteurized Omega-3 Eggs'
  },
  {
    id: 'ss-toa-payoh',
    name: 'Sheng Siong Supermarket — Toa Payoh Lorong 4',
    chain: 'Sheng Siong',
    area: 'Heartland / Toa Payoh',
    nearestMrt: 'Braddell MRT (NS18) / Toa Payoh MRT (NS19) · 6 min walk',
    address: 'Blk 73 Toa Payoh Lorong 4, #01-597, Singapore 310073',
    hours: 'Daily · 07:00 – 23:00',
    halalCounterStrength: 'Comprehensive Halal Certified Chilled Chicken & Local Paste Selection',
    freshSpecialty: 'Heartland Value Fresh Greens (Chye Sim, French Beans, Sweet Chye Poh) & Live/Chilled Fish',
    wetMarketInsiderTip: 'Located right beside Blk 74 Toa Payoh Wet Market & Hawker Centre—great for picking up fresh morning tofu and bean sprouts.',
    featuredPasteOrShortcut: 'Bundle Deals on Japanese Cucumbers, Old Ginger & Kampong Eggs'
  },
  {
    id: 'fp-jurong',
    name: 'FairPrice Xtra — Jem (Jurong East Hub)',
    chain: 'FairPrice Finest',
    area: 'West / Jurong East',
    nearestMrt: 'Jurong East MRT (NS1/EW24) · Direct Link',
    address: '50 Jurong Gateway Rd, #B1-21/22 Jem, Singapore 608549',
    hours: 'Daily · 08:00 – 23:00',
    halalCounterStrength: 'Dedicated Halal Butcher Counter, Halal Dim Sum & Certified Malay/Indian Paste Aisles',
    freshSpecialty: 'Ready-Prepped Stir-Fry Vegetable Packs, Fresh Thosai Batter, and Low-Sodium Healthier Choice Stocks',
    wetMarketInsiderTip: 'Grab the pre-washed "Pasar Quick Wok" diced vegetable trays near the salad chiller to cut prep time to zero.',
    featuredPasteOrShortcut: 'Healthier Choice Reduced-Sodium Chicken Broth & Microwave Brown Jasmine Rice Cups'
  }
];
