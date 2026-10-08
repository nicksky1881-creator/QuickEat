import React, { useState, useMemo } from 'react';
import { DishRecipe, IngredientItem } from '../data/singaporeDishes';
import { ResilientDishImage } from './ResilientDishImage';
import { Utensils, ShoppingBag, ArrowRight, Check } from 'lucide-react';

interface BalancedMealMatcherProps {
  dishes: DishRecipe[];
  onSelectDish: (dish: DishRecipe, tab?: 'steps' | 'heritage' | 'generations' | 'clinic') => void;
  onAddIngredientsToBasket: (items: IngredientItem[], dishTitle: string, servings: number) => void;
}

type DinerProfile = 'busy-adult' | 'growing-kid' | 'senior-elder' | 'multi-gen';
type CulturePref = 'all' | 'halal' | 'vegetarian';
type HealthGoal = 'balanced' | 'low-sodium' | 'high-protein' | 'soft-digest';

export const BalancedMealMatcher: React.FC<BalancedMealMatcherProps> = ({
  dishes,
  onSelectDish,
  onAddIngredientsToBasket
}) => {
  const [dinerProfile, setDinerProfile] = useState<DinerProfile>('busy-adult');
  const [culturePref, setCulturePref] = useState<CulturePref>('all');
  const [healthGoal, setHealthGoal] = useState<HealthGoal>('balanced');
  const [maxMins, setMaxMins] = useState<number>(10);
  const [cravingKeyword, setCravingKeyword] = useState<string>('');
  const [addedPlateFeedback, setAddedPlateFeedback] = useState<boolean>(false);

  const rankedMatches = useMemo(() => {
    const scored = dishes.map((dish) => {
      let score = 70;
      const reasons: string[] = [];

      // Time check
      if (dish.totalTimeMins <= maxMins) {
        score += 12;
        reasons.push(`Fits your ${maxMins}-minute kitchen window (${dish.totalTimeMins} mins total)`);
      } else {
        score -= 15;
      }

      // Culture filter
      if (culturePref === 'halal') {
        if (dish.categories.includes('Halal')) {
          score += 20;
          reasons.push('Uses 100% Halal-certified local ingredients & pastes');
        } else {
          score -= 50;
        }
      } else if (culturePref === 'vegetarian') {
        if (dish.categories.includes('Vegetarian')) {
          score += 25;
          reasons.push('100% Vegetarian & plant-rich heritage recipe');
        } else {
          score -= 40;
        }
      }

      // Diner profile scoring
      if (dinerProfile === 'growing-kid') {
        if (dish.categories.includes('Kids')) {
          score += 18;
          reasons.push(`Includes tailored Kid-Friendly "${dish.kidMealAdaptation.title}" mode`);
        }
      } else if (dinerProfile === 'senior-elder') {
        if (dish.categories.includes('Elders')) {
          score += 18;
          reasons.push(`Tailored for seniors: ${dish.elderMenuAdaptation.healthFocus}`);
        }
        if (dish.sodiumMg <= 350) {
          score += 10;
        }
      } else if (dinerProfile === 'multi-gen') {
        if (dish.categories.includes('Kids') && dish.categories.includes('Elders')) {
          score += 20;
          reasons.push('Versatile one-pan base that adapts for toddlers, adults, and grandparents');
        }
      }

      // Health goal scoring
      if (healthGoal === 'low-sodium' && dish.sodiumMg <= 350) {
        score += 16;
        reasons.push(`Heart-smart low sodium (${dish.sodiumMg}mg per serving)`);
      } else if (healthGoal === 'high-protein' && dish.proteinG >= 26) {
        score += 16;
        reasons.push(`High bioavailable protein (${dish.proteinG}g) for muscle recovery`);
      } else if (healthGoal === 'soft-digest' && (dish.id.includes('steamed-egg') || dish.id.includes('fish-tofu') || dish.id.includes('hainanese'))) {
        score += 18;
        reasons.push('Silky, moisture-locked texture for effortless chewing & digestion');
      } else if (healthGoal === 'balanced' && dish.fiberG >= 3) {
        score += 12;
        reasons.push('Balanced glycemic load with natural aromatics & vegetables');
      }

      // Keyword boost
      if (cravingKeyword.trim()) {
        const kw = cravingKeyword.toLowerCase().trim();
        const searchable = `${dish.title} ${dish.tagline} ${dish.culturalOrigin} ${dish.ingredients
          .map((i) => i.name)
          .join(' ')}`.toLowerCase();
        if (searchable.includes(kw)) {
          score += 25;
          reasons.push(`Matches your "${cravingKeyword.trim()}" ingredient preference`);
        }
      }

      return {
        dish,
        score: Math.min(99, Math.max(45, score)),
        reasons: reasons.slice(0, 3)
      };
    });

    return scored.sort((a, b) => b.score - a.score);
  }, [dishes, dinerProfile, culturePref, healthGoal, maxMins, cravingKeyword]);

  const topMatch = rankedMatches[0];
  const runnerUps = rankedMatches.slice(1, 3);

  // Build personalized Quarter-Quarter-Half plate blueprint
  const plateBlueprint = useMemo(() => {
    const d = topMatch.dish;
    if (dinerProfile === 'growing-kid') {
      return {
        plateTitle: `Junior Brain-Builder Plate (${d.kidMealAdaptation.ageGroup})`,
        quarterGrain: '1/4 Plate: Warm Jasmine + Brown Rice Mix or Wholemeal Toast Soldiers (Sustained School Energy)',
        quarterProtein: `1/4 Plate: ${d.kidMealAdaptation.title} (${d.proteinG}g Protein + DHA/Choline)`,
        halfVegFruit: '1/2 Plate: Finely Diced Sweet Corn, Grated Carrot & Sliced Red Dragonfruit / Papaya',
        customTip: d.kidMealAdaptation.modification
      };
    }
    if (dinerProfile === 'senior-elder') {
      return {
        plateTitle: `Pioneer Generation Soft & Heart-Smart Plate`,
        quarterGrain: '1/4 Plate: Warm Soft Red Cargo Rice Congee or Snipped Short Rice Bee Hoon',
        quarterProtein: `1/4 Plate: ${d.elderMenuAdaptation.title} (${d.proteinG}g Easy-Digest Protein)`,
        halfVegFruit: '1/2 Plate: Steamed Silky Baby Spinach with Wolfberries + Soft Ripe Papaya Wedge',
        customTip: d.elderMenuAdaptation.textureAndSodiumTip
      };
    }
    if (healthGoal === 'low-sodium') {
      return {
        plateTitle: `Low-Sodium Potassium-Balanced Heritage Plate`,
        quarterGrain: '1/4 Plate: Steamed Unpolished Brown Jasmine Rice infused with bruised Pandan Leaf',
        quarterProtein: `1/4 Plate: ${d.title} prepared with ginger-citrus aromatics (${d.sodiumMg}mg Sodium)`,
        halfVegFruit: '1/2 Plate: Crisp Japanese Cucumber, Cherry Tomatoes & Blanched Xiao Bai Cai (Potassium counter-balances sodium)',
        customTip: 'Squeeze fresh calamansi lime at the table—natural citric acid tricks taste buds into perceiving rich saltiness with 40% less sodium.'
      };
    }
    return {
      plateTitle: `Singapore HPB "My Healthy Plate" (Suku-Suku Separuh) Blueprint`,
      quarterGrain: '1/4 Plate: Wholegrain Brown Rice or Fresh Unbleached Rice Noodles (Steady Afternoon Focus)',
      quarterProtein: `1/4 Plate: ${d.title} (${d.proteinG}g Complete Protein)`,
      halfVegFruit: '1/2 Plate: 90-Second Garlic Blanched Chye Sim / Bean Sprouts + Fresh Guava or Calamansi Water',
      customTip: d.speedSecret
    };
  }, [topMatch, dinerProfile, healthGoal]);

  const handleAddBalancedPlate = () => {
    onAddIngredientsToBasket(topMatch.dish.ingredients, `${topMatch.dish.title} (Balanced Plate)`, 2);
    setAddedPlateFeedback(true);
    setTimeout(() => setAddedPlateFeedback(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Individual Profile Controls */}
      <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-[#E6E1D8] space-y-5">
        <div>
          <span className="text-xs text-[#B9381E] font-semibold">
            Personalised Nutrition & Culture Matcher
          </span>
          <h3 className="font-display text-xl font-semibold text-[#1C1917] mt-0.5">
            Configure Your Individual Meal Profile
          </h3>
          <p className="text-xs text-[#57534E] mt-1">
            Tell us who is eating, your dietary culture, and your health priority to generate a tailored 5–10 minute balanced Singapore meal.
          </p>
        </div>

        {/* 1. Who is eating? */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#1C1917]">
            01. Who are you cooking for today?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { id: 'busy-adult', label: 'Busy Adult / WFH' },
              { id: 'growing-kid', label: 'Growing Kid (Parents)' },
              { id: 'senior-elder', label: 'Senior / Elder (65+)' },
              { id: 'multi-gen', label: 'Multi-Gen Family' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setDinerProfile(opt.id as DinerProfile)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors whitespace-nowrap truncate ${
                  dinerProfile === opt.id
                    ? 'bg-[#1C1917] text-white border-[#1C1917]'
                    : 'bg-[#FAF8F5] text-[#1C1917] border-[#E6E1D8] hover:border-stone-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Cultural / Dietary Requirement */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#1C1917]">
            02. Cultural & Dietary Preference
          </label>
          <div className="flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg">
            {[
              { id: 'all', label: 'All Cultures' },
              { id: 'halal', label: 'Halal Only' },
              { id: 'vegetarian', label: 'Vegetarian' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setCulturePref(opt.id as CulturePref)}
                className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  culturePref === opt.id
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Health & Nutrition Priority */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#1C1917]">
            03. Primary Health & Balance Priority
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { id: 'balanced', label: 'Quarter-Quarter-Half Balance' },
              { id: 'low-sodium', label: 'Low-Sodium / Heart Safe' },
              { id: 'high-protein', label: 'High-Protein (26g+)' },
              { id: 'soft-digest', label: 'Soft Bite & Easy Digestion' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setHealthGoal(opt.id as HealthGoal)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors whitespace-nowrap truncate ${
                  healthGoal === opt.id
                    ? 'bg-[#B9381E] text-white border-[#B9381E]'
                    : 'bg-[#FAF8F5] text-[#1C1917] border-[#E6E1D8] hover:border-stone-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Max Time & Ingredient Craving */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
              04. Max Cook Time
            </label>
            <div className="flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg">
              {[7, 8, 10].map((m) => (
                <button
                  key={m}
                  onClick={() => setMaxMins(m)}
                  className={`flex-1 py-1.5 text-xs font-mono tabular-nums font-semibold rounded-md transition-colors whitespace-nowrap ${
                    maxMins === m
                      ? 'bg-white text-[#1C1917] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  ≤{m}m
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
              05. Fridge Ingredient (Optional)
            </label>
            <input
              type="text"
              value={cravingKeyword}
              onChange={(e) => setCravingKeyword(e.target.value)}
              placeholder="e.g. fish, egg, tofu, prawn"
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E6E1D8] bg-[#FAF8F5] focus:outline-none focus:border-[#1C1917]"
            />
          </div>
        </div>
      </div>

      {/* Right Column: Recommended Balanced Meal Blueprint */}
      <div className="lg:col-span-7 space-y-6">
        <div className="p-6 rounded-xl bg-white border border-[#E6E1D8] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E1D8] pb-4">
            <div className="flex items-center gap-2 text-xs text-[#156147] font-semibold">
              <span>Best-Suited Balanced Meal Recommendation</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{topMatch.score}% Profile Match</span>
            </div>
            <div className="text-xs text-[#57534E] font-mono tabular-nums">
              {topMatch.dish.totalTimeMins} mins · {topMatch.dish.calories} kcal · {topMatch.dish.proteinG}g Protein · {topMatch.dish.sodiumMg}mg Sodium
            </div>
          </div>

          {/* Dish Highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            <div className="sm:col-span-5 aspect-4/3 rounded-lg overflow-hidden border border-[#E6E1D8] bg-[#F2EFE9]">
              <ResilientDishImage
                src={topMatch.dish.imageUrl}
                alt={topMatch.dish.title}
                fallbackTitle={topMatch.dish.title}
                fallbackAccent={topMatch.dish.fallbackAccent}
              />
            </div>
            <div className="sm:col-span-7 space-y-2.5">
              <div className="text-xs text-[#57534E]">
                {topMatch.dish.culturalOrigin} · {topMatch.dish.localName}
              </div>
              <h4 className="font-display text-xl font-semibold text-[#1C1917]">
                {topMatch.dish.title}
              </h4>
              <p className="text-sm text-[#57534E] leading-relaxed">
                {topMatch.dish.tagline}
              </p>
              <div className="space-y-1 pt-1">
                {topMatch.reasons.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#156147]">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quarter-Quarter-Half Balanced Plate Breakdown */}
          <div className="p-5 rounded-lg bg-[#F2EFE9] border border-[#E6E1D8] space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="font-display text-base font-semibold text-[#1C1917]">
                {plateBlueprint.plateTitle}
              </h5>
              <span className="text-xs font-mono tabular-nums text-[#57534E]">
                25% Grain · 25% Protein · 50% Greens
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-lg bg-white border border-[#E6E1D8]">
                <span className="font-mono tabular-nums font-semibold text-[#B9381E] block mb-1">
                  25% Wholegrains
                </span>
                <p className="text-[#1C1917] leading-relaxed">{plateBlueprint.quarterGrain}</p>
              </div>
              <div className="p-3.5 rounded-lg bg-white border border-[#E6E1D8]">
                <span className="font-mono tabular-nums font-semibold text-[#156147] block mb-1">
                  25% Heritage Protein
                </span>
                <p className="text-[#1C1917] leading-relaxed">{plateBlueprint.quarterProtein}</p>
              </div>
              <div className="p-3.5 rounded-lg bg-white border border-[#E6E1D8]">
                <span className="font-mono tabular-nums font-semibold text-[#1C1917] block mb-1">
                  50% Fresh Greens & Fruit
                </span>
                <p className="text-[#1C1917] leading-relaxed">{plateBlueprint.halfVegFruit}</p>
              </div>
            </div>

            <p className="text-xs text-[#57534E] pt-1">
              <strong className="text-[#1C1917]">Tailored Kitchen Note:</strong> {plateBlueprint.customTip}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              onClick={() =>
                onSelectDish(
                  topMatch.dish,
                  dinerProfile === 'growing-kid' || dinerProfile === 'senior-elder'
                    ? 'generations'
                    : 'steps'
                )
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#B9381E] hover:bg-[#9E2E17] transition-colors whitespace-nowrap"
            >
              <span>Open {topMatch.dish.totalTimeMins}-Min Recipe & Timer</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleAddBalancedPlate}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-[#1C1917] bg-[#F2EFE9] hover:bg-stone-300/70 transition-colors whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {addedPlateFeedback
                  ? 'Balanced Plate Added to Basket!'
                  : 'Add Ingredients to Supermarket Basket'}
              </span>
            </button>
          </div>
        </div>

        {/* Runner-up Matches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {runnerUps.map((item) => (
            <div
              key={item.dish.id}
              className="p-4 rounded-xl bg-white border border-[#E6E1D8] flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="text-xs text-[#57534E] font-mono tabular-nums">
                  {item.score}% Match · {item.dish.totalTimeMins} mins · {item.dish.culturalOrigin}
                </div>
                <h5 className="font-display text-sm font-semibold text-[#1C1917] truncate mt-0.5">
                  {item.dish.title}
                </h5>
              </div>
              <button
                onClick={() => onSelectDish(item.dish, 'steps')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#B9381E] bg-[#F2EFE9] hover:bg-stone-300/60 transition-colors whitespace-nowrap shrink-0"
              >
                View Dish
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
