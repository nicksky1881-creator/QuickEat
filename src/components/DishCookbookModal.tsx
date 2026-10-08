import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Check,
  ShoppingBag,
  Sparkles,
  ThumbsUp,
  MapPin,
  Clock,
  Utensils
} from 'lucide-react';
import {
  DishRecipe,
  CommunityCookLog,
  SINGAPORE_SUPERMARKETS,
  IngredientItem
} from '../data/singaporeDishes';
import { ResilientDishImage } from './ResilientDishImage';

interface DishCookbookModalProps {
  dish: DishRecipe;
  onClose: () => void;
  onAddIngredientsToBasket: (items: IngredientItem[], dishTitle: string, servings: number) => void;
  customLogs: CommunityCookLog[];
  onAddCookLog: (dishId: string, log: CommunityCookLog) => void;
  onUpvoteLog: (dishId: string, logId: string) => void;
  initialTab?: 'steps' | 'heritage' | 'generations' | 'clinic';
}

export const DishCookbookModal: React.FC<DishCookbookModalProps> = ({
  dish,
  onClose,
  onAddIngredientsToBasket,
  customLogs,
  onAddCookLog,
  onUpvoteLog,
  initialTab = 'steps'
}) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'heritage' | 'generations' | 'clinic'>(initialTab);
  const [servings, setServings] = useState<number>(2);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [basketAddedToast, setBasketAddedToast] = useState<boolean>(false);

  // Diagnostic & Cook Log states
  const [selectedDiagId, setSelectedDiagId] = useState<string>(
    dish.diagnostics[0]?.id || ''
  );
  const [userName, setUserName] = useState('');
  const [neighbourhood, setNeighbourhood] = useState('Tiong Bahru');
  const [cookTimeActual, setCookTimeActual] = useState<number>(dish.totalTimeMins);
  const [outcomeTag, setOutcomeTag] = useState('Turned out Shiok!');
  const [userComment, setUserComment] = useState('');
  const [userSuggestion, setUserSuggestion] = useState('');
  const [logSubmittedSuccess, setLogSubmittedSuccess] = useState(false);

  useEffect(() => {
    setSelectedDiagId(dish.diagnostics[0]?.id || '');
    setCompletedSteps([]);
    setActiveTimerStep(null);
    setIsTimerRunning(false);
  }, [dish]);

  useEffect(() => {
    if (!isTimerRunning || activeTimerStep === null) return;
    const interval = setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          if (activeTimerStep !== null && !completedSteps.includes(activeTimerStep)) {
            setCompletedSteps((curr) => [...curr, activeTimerStep]);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, activeTimerStep, completedSteps]);

  const startStepTimer = (stepNum: number, durationSec: number) => {
    if (activeTimerStep === stepNum) {
      setIsTimerRunning((prev) => !prev);
    } else {
      setActiveTimerStep(stepNum);
      setTimeLeftSec(durationSec);
      setIsTimerRunning(true);
    }
  };

  const resetStepTimer = (stepNum: number, durationSec: number) => {
    setActiveTimerStep(stepNum);
    setTimeLeftSec(durationSec);
    setIsTimerRunning(false);
  };

  const toggleStepDone = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleAddAllToBasket = () => {
    onAddIngredientsToBasket(dish.ingredients, dish.title, servings);
    setBasketAddedToast(true);
    setTimeout(() => setBasketAddedToast(false), 2600);
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim() && !userSuggestion.trim()) return;
    const newLog: CommunityCookLog = {
      id: `log-${Date.now()}`,
      userName: userName.trim() || 'Home Chef SG',
      neighbourhood,
      cookTimeActualMins: cookTimeActual,
      outcomeTag,
      rating: 5,
      comment: userComment.trim() || 'Followed the steps and timed it right on the dot.',
      userSuggestion:
        userSuggestion.trim() || 'Prep all ingredients in small bowls before heating the pan.',
      helpfulCount: 1,
      timestamp: 'Just now'
    };
    onAddCookLog(dish.id, newLog);
    setUserName('');
    setUserComment('');
    setUserSuggestion('');
    setLogSubmittedSuccess(true);
    setTimeout(() => setLogSubmittedSuccess(false), 3000);
  };

  const scaleFactor = servings / 2;
  const totalEstimatedCost = dish.ingredients.reduce(
    (sum, item) => sum + item.estimatedSgd * scaleFactor,
    0
  );

  const matchedSupermarkets = SINGAPORE_SUPERMARKETS.filter((s) =>
    dish.recommendedSupermarketIds.includes(s.id)
  );

  const selectedDiag = dish.diagnostics.find((d) => d.id === selectedDiagId) || dish.diagnostics[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dish-title"
    >
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] border border-[#E6E1D8] rounded-xl shadow-xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-[#E6E1D8] bg-[#F2EFE9]/70">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mb-1.5">
              <span>{dish.culturalOrigin}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums font-semibold text-[#B9381E]">
                {dish.totalTimeMins} mins total ({dish.prepTimeMins}m prep + {dish.cookTimeMins}m cook)
              </span>
              <span aria-hidden="true">·</span>
              <span>{dish.appliance}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{dish.calories} kcal</span>
            </div>
            <h2
              id="modal-dish-title"
              className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917]"
            >
              {dish.title}
            </h2>
            <p className="text-xs text-[#57534E] mt-0.5">
              {dish.localName} · Pronounced "{dish.phonetic}"
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close recipe guide"
            className="p-2 rounded-lg text-[#57534E] hover:text-[#1C1917] hover:bg-stone-200/70 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Segmented Tabs */}
        <div className="px-5 sm:px-6 py-3 bg-[#FAF8F5] border-b border-[#E6E1D8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-[#F2EFE9] rounded-lg overflow-x-auto">
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'steps'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              01. Quick Steps & Timer ({dish.steps.length})
            </button>
            <button
              onClick={() => setActiveTab('heritage')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'heritage'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              02. Origins & Fun Facts
            </button>
            <button
              onClick={() => setActiveTab('generations')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'generations'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              03. Kids & Elders Guide
            </button>
            <button
              onClick={() => setActiveTab('clinic')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'clinic'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              04. Wok Check & Reviews ({customLogs.length})
            </button>
          </div>

          <div className="text-xs text-[#57534E] font-mono tabular-nums hidden sm:block">
            Protein {dish.proteinG}g · Carbs {dish.carbsG}g · Fiber {dish.fiberG}g · Sodium {dish.sodiumMg}mg
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'steps' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Photo, Speed Secret & Fresh Ingredients */}
              <div className="lg:col-span-5 space-y-6">
                <div className="aspect-4/3 w-full rounded-lg overflow-hidden border border-[#E6E1D8] bg-[#F2EFE9]">
                  <ResilientDishImage
                    src={dish.imageUrl}
                    alt={dish.title}
                    fallbackTitle={dish.title}
                    fallbackAccent={dish.fallbackAccent}
                  />
                </div>

                {/* 5-10 Min Speed Secret */}
                <div className="p-4 rounded-lg bg-[#F2EFE9] border border-[#E6E1D8]">
                  <h3 className="font-display text-sm font-semibold text-[#B9381E] mb-1">
                    The {dish.totalTimeMins}-Minute Hawker Speed Secret
                  </h3>
                  <p className="text-sm text-[#1C1917] leading-relaxed">
                    {dish.speedSecret}
                  </p>
                </div>

                {/* Fresh Ingredients & Servings Scaler */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-semibold text-[#1C1917]">
                      Fresh Ingredients
                    </h3>
                    <div className="flex items-center gap-1 bg-[#F2EFE9] p-1 rounded-lg">
                      {[1, 2, 4, 6].map((pax) => (
                        <button
                          key={pax}
                          onClick={() => setServings(pax)}
                          className={`px-2.5 py-1 text-xs font-mono tabular-nums rounded-md transition-colors whitespace-nowrap ${
                            servings === pax
                              ? 'bg-white text-[#1C1917] font-semibold shadow-xs'
                              : 'text-[#57534E] hover:text-[#1C1917]'
                          }`}
                        >
                          {pax} pax
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="divide-y divide-[#E6E1D8] border-t border-b border-[#E6E1D8]">
                    {dish.ingredients.map((ing) => {
                      const scaledAmt = Math.round(ing.amount * scaleFactor * 10) / 10;
                      const scaledPrice = (ing.estimatedSgd * scaleFactor).toFixed(2);
                      return (
                        <div key={ing.id} className="py-3 text-sm">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="font-semibold text-[#1C1917]">{ing.name}</span>
                            <span className="font-mono tabular-nums text-xs font-semibold text-[#1C1917] shrink-0">
                              {scaledAmt} {ing.unit} · S${scaledPrice}
                            </span>
                          </div>
                          <p className="text-xs text-[#57534E] mt-0.5">
                            {ing.notes} · <span className="text-[#156147]">{ing.aisle}</span>
                          </p>
                          <p className="text-xs text-[#57534E] italic mt-0.5">
                            Supermarket tip: {ing.freshTip}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-xs text-[#57534E] block">Est. Supermarket Basket</span>
                      <span className="font-mono tabular-nums text-base font-semibold text-[#1C1917]">
                        S${totalEstimatedCost.toFixed(2)} for {servings} servings
                      </span>
                    </div>
                    <button
                      onClick={handleAddAllToBasket}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#B9381E] hover:bg-[#9E2E17] transition-colors whitespace-nowrap"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {basketAddedToast ? 'Added to Basket!' : 'Add to Shopping Basket'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Cooking Steps & Live Step Timer */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center justify-between border-b border-[#E6E1D8] pb-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                      Step-by-Step Interactive Kitchen Guide
                    </h3>
                    <p className="text-xs text-[#57534E]">
                      Start the built-in timer on any step or check steps off as you cook.
                    </p>
                  </div>
                  <span className="font-mono tabular-nums text-xs text-[#156147] font-semibold">
                    {completedSteps.length}/{dish.steps.length} steps done
                  </span>
                </div>

                <div className="space-y-4">
                  {dish.steps.map((step) => {
                    const isDone = completedSteps.includes(step.stepNumber);
                    const isThisTimerActive = activeTimerStep === step.stepNumber;
                    const displaySeconds = isThisTimerActive ? timeLeftSec : step.durationSec;

                    return (
                      <div
                        key={step.stepNumber}
                        className={`p-4 rounded-lg border transition-colors ${
                          isDone
                            ? 'bg-[#F2EFE9]/60 border-[#156147]/40'
                            : isThisTimerActive
                            ? 'bg-white border-[#B9381E]'
                            : 'bg-white border-[#E6E1D8]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleStepDone(step.stepNumber)}
                              aria-label={`Mark step ${step.stepNumber} complete`}
                              className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                                isDone
                                  ? 'bg-[#156147] border-[#156147] text-white'
                                  : 'border-stone-400 text-transparent hover:border-[#1C1917]'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <div>
                              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mb-1">
                                <span className="font-mono tabular-nums font-semibold text-[#1C1917]">
                                  Step 0{step.stepNumber}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>{step.heatLevel}</span>
                                <span aria-hidden="true">·</span>
                                <span className="font-mono tabular-nums">
                                  {Math.round(step.durationSec / 60 * 10) / 10} min ({step.durationSec}s)
                                </span>
                              </div>
                              <h4
                                className={`font-display text-base font-semibold ${
                                  isDone ? 'line-through text-[#57534E]' : 'text-[#1C1917]'
                                }`}
                              >
                                {step.title}
                              </h4>
                            </div>
                          </div>

                          {/* Step Timer Controls */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => startStepTimer(step.stepNumber, step.durationSec)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono tabular-nums font-semibold transition-colors whitespace-nowrap ${
                                isThisTimerActive && isTimerRunning
                                  ? 'bg-[#B9381E] text-white'
                                  : 'bg-[#F2EFE9] text-[#1C1917] hover:bg-stone-300/70'
                              }`}
                            >
                              {isThisTimerActive && isTimerRunning ? (
                                <Pause className="w-3.5 h-3.5" />
                              ) : (
                                <Play className="w-3.5 h-3.5" />
                              )}
                              {formatTimer(displaySeconds)}
                            </button>
                            {isThisTimerActive && (
                              <button
                                onClick={() => resetStepTimer(step.stepNumber, step.durationSec)}
                                aria-label="Reset step timer"
                                className="p-1.5 rounded-md bg-[#F2EFE9] text-[#57534E] hover:text-[#1C1917]"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-[#1C1917] leading-relaxed mt-2.5 pl-9">
                          {step.instruction}
                        </p>
                        <p className="text-xs text-[#156147] mt-2 pl-9">
                          Sensory cue: {step.sensoryCue}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Nearby Supermarkets for This Dish */}
                <div className="pt-4 border-t border-[#E6E1D8]">
                  <h4 className="font-display text-sm font-semibold text-[#1C1917] mb-2">
                    Best Supermarkets Near You for This Dish
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedSupermarkets.map((store) => (
                      <div
                        key={store.id}
                        className="p-3.5 rounded-lg bg-[#F2EFE9]/70 border border-[#E6E1D8] text-xs space-y-1"
                      >
                        <div className="font-semibold text-[#1C1917] flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#B9381E] shrink-0" />
                          <span>{store.name}</span>
                        </div>
                        <p className="text-[#57534E]">{store.nearestMrt}</p>
                        <p className="text-[#156147] font-medium">
                          Stock highlight: {store.featuredPasteOrShortcut}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'heritage' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="text-xs text-[#57534E] mb-1">
                    Historical Era & Roots · {dish.originEra}
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#1C1917]">
                    The Singapore Heritage Story of {dish.localName}
                  </h3>
                </div>
                <p className="text-base text-[#1C1917] leading-relaxed">
                  {dish.historyStory}
                </p>

                <div className="p-5 rounded-lg bg-[#F2EFE9] border border-[#E6E1D8] space-y-3">
                  <h4 className="font-display text-base font-semibold text-[#1C1917]">
                    Cultural Origins & Culinary Science
                  </h4>
                  <p className="text-sm text-[#57534E] leading-relaxed">
                    Every dish in Singapore’s hawker heritage evolved to feed busy port workers, merchants, and multi-generational families quickly over high heat. By pairing modern chilled supermarket fillets and artisanal local pastes with traditional techniques like velveting and rempah blooming, you preserve 100% of the heritage soul in under 10 minutes.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h4 className="font-display text-lg font-semibold text-[#1C1917]">
                  3 Cultural Fun Facts to Share at the Table
                </h4>
                <div className="space-y-3">
                  {dish.funFacts.map((fact, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-white border border-[#E6E1D8] space-y-1.5"
                    >
                      <span className="font-mono tabular-nums text-xs font-semibold text-[#B9381E]">
                        0{index + 1}. Heritage Fact
                      </span>
                      <p className="text-sm text-[#1C1917] leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'generations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kids Meal Card */}
              <div className="p-6 rounded-lg bg-white border border-[#E6E1D8] space-y-4">
                <div className="text-xs text-[#B9381E] font-semibold">
                  For Busy Parents · Kids’ Meal Adaptation ({dish.kidMealAdaptation.ageGroup})
                </div>
                <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                  {dish.kidMealAdaptation.title}
                </h3>
                <div className="space-y-3 pt-2 border-t border-[#E6E1D8] text-sm">
                  <div>
                    <span className="font-semibold text-[#1C1917] block mb-0.5">
                      How to Adapt in the Same Pan (Zero Extra Cooking):
                    </span>
                    <p className="text-[#57534E] leading-relaxed">
                      {dish.kidMealAdaptation.modification}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#F2EFE9]">
                    <span className="font-semibold text-[#1C1917] block mb-0.5 text-xs">
                      School Recess & Lunchbox Tip:
                    </span>
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      {dish.kidMealAdaptation.lunchboxTip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Elders Menu Card */}
              <div className="p-6 rounded-lg bg-white border border-[#E6E1D8] space-y-4">
                <div className="text-xs text-[#156147] font-semibold">
                  For Seniors & Pioneer Generation · {dish.elderMenuAdaptation.healthFocus}
                </div>
                <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                  {dish.elderMenuAdaptation.title}
                </h3>
                <div className="space-y-3 pt-2 border-t border-[#E6E1D8] text-sm">
                  <div>
                    <span className="font-semibold text-[#1C1917] block mb-0.5">
                      Soft-Texture & Low-Sodium Adjustment:
                    </span>
                    <p className="text-[#57534E] leading-relaxed">
                      {dish.elderMenuAdaptation.textureAndSodiumTip}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#F2EFE9]">
                    <span className="font-semibold text-[#1C1917] block mb-0.5 text-xs">
                      Nutritional & Digestion Benefit:
                    </span>
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      {dish.elderMenuAdaptation.digestionNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clinic' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Interactive Troubleshooting & Rescue */}
              <div className="lg:col-span-6 space-y-6">
                <div className="p-5 rounded-lg bg-[#F2EFE9] border border-[#E6E1D8] space-y-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                      How Did Your Dish Turn Out? (Instant Chef’s Rescue)
                    </h3>
                    <p className="text-xs text-[#57534E] mt-0.5">
                      Select what happened in your pan for an immediate culinary fix and next-time tip.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {dish.diagnostics.map((diag) => (
                      <button
                        key={diag.id}
                        onClick={() => setSelectedDiagId(diag.id)}
                        className={`text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold border transition-colors ${
                          selectedDiagId === diag.id
                            ? 'bg-[#1C1917] text-white border-[#1C1917]'
                            : 'bg-white text-[#1C1917] border-[#E6E1D8] hover:border-stone-400'
                        }`}
                      >
                        {diag.outcomeLabel}
                      </button>
                    ))}
                  </div>

                  {selectedDiag && (
                    <div className="p-4 rounded-lg bg-white border border-[#E6E1D8] space-y-2.5 text-sm">
                      <div>
                        <span className="text-xs font-semibold text-[#57534E] block">
                          Why it happened:
                        </span>
                        <p className="text-[#1C1917]">{selectedDiag.whyItHappened}</p>
                      </div>
                      <div className="pt-2 border-t border-[#E6E1D8]">
                        <span className="text-xs font-semibold text-[#B9381E] block">
                          Instant 30-Second Pan Rescue:
                        </span>
                        <p className="text-[#1C1917] font-medium">{selectedDiag.instantRescue}</p>
                      </div>
                      <div className="pt-2 border-t border-[#E6E1D8]">
                        <span className="text-xs font-semibold text-[#156147] block">
                          Next-Time Upgrade:
                        </span>
                        <p className="text-[#57534E]">{selectedDiag.nextTimeUpgrade}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form to Log Cook & Offer Input */}
                <form
                  onSubmit={handleLogSubmit}
                  className="p-5 rounded-lg bg-white border border-[#E6E1D8] space-y-4"
                >
                  <h4 className="font-display text-base font-semibold text-[#1C1917]">
                    Log Your Cook & Suggest an Improvement
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="e.g. Siti or Wei Ming"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6E1D8] bg-[#FAF8F5] focus:outline-none focus:border-[#1C1917]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Neighbourhood
                      </label>
                      <select
                        value={neighbourhood}
                        onChange={(e) => setNeighbourhood(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6E1D8] bg-[#FAF8F5] focus:outline-none focus:border-[#1C1917]"
                      >
                        <option>Tiong Bahru</option>
                        <option>Tampines</option>
                        <option>Toa Payoh</option>
                        <option>Jurong East</option>
                        <option>Joo Chiat / Katong</option>
                        <option>Little India / Tekka</option>
                        <option>Bedok</option>
                        <option>Woodlands</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        How did it turn out?
                      </label>
                      <select
                        value={outcomeTag}
                        onChange={(e) => setOutcomeTag(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6E1D8] bg-[#FAF8F5] focus:outline-none focus:border-[#1C1917]"
                      >
                        <option>Turned out Shiok!</option>
                        <option>Kids Finished Everything</option>
                        <option>Soft & Elder-Approved</option>
                        <option>Tweaked Spice / Salt Level</option>
                        <option>Beat My 10-Min Timer!</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#57534E] mb-1">
                        Your Actual Cook Time (mins)
                      </label>
                      <input
                        type="number"
                        min={4}
                        max={20}
                        value={cookTimeActual}
                        onChange={(e) => setCookTimeActual(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border border-[#E6E1D8] bg-[#FAF8F5] focus:outline-none focus:border-[#1C1917]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] mb-1">
                      How did your dish go?
                    </label>
                    <textarea
                      rows={2}
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      placeholder="Share how the texture, taste, and speed worked in your kitchen..."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6E1D8] bg-[#FAF8F5] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#57534E] mb-1">
                      Your Suggestion to Improve or Customize This Dish
                    </label>
                    <input
                      type="text"
                      value={userSuggestion}
                      onChange={(e) => setUserSuggestion(e.target.value)}
                      placeholder="e.g. Add 1 tsp calamansi juice or swap in baby kai lan..."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#E6E1D8] bg-[#FAF8F5] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    {logSubmittedSuccess ? (
                      <span className="text-xs font-semibold text-[#156147]">
                        Thank you! Your cook note & suggestion is live.
                      </span>
                    ) : (
                      <span className="text-xs text-[#57534E]">
                        Helps fellow busy Singaporeans refine this recipe.
                      </span>
                    )}
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#1C1917] hover:bg-stone-800 transition-colors whitespace-nowrap"
                    >
                      Post Kitchen Note
                    </button>
                  </div>
                </form>
              </div>

              {/* Right: Community Kitchen Notes & Suggestions */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                  Community Cook Logs & Improvement Ideas ({customLogs.length})
                </h3>
                <div className="space-y-3">
                  {customLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 rounded-lg bg-white border border-[#E6E1D8] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs text-[#57534E]">
                        <div>
                          <span className="font-semibold text-[#1C1917]">{log.userName}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{log.neighbourhood}</span>
                          <span aria-hidden="true"> · </span>
                          <span className="font-mono tabular-nums text-[#B9381E] font-semibold">
                            Cooked in {log.cookTimeActualMins}m
                          </span>
                        </div>
                        <span>{log.timestamp}</span>
                      </div>

                      <div className="text-xs font-semibold text-[#156147]">
                        Outcome: {log.outcomeTag}
                      </div>

                      <p className="text-sm text-[#1C1917] leading-relaxed">{log.comment}</p>

                      <div className="p-3 rounded-md bg-[#F2EFE9] text-xs">
                        <span className="font-semibold text-[#1C1917]">
                          Cook’s Suggestion to Improve:{' '}
                        </span>
                        <span className="text-[#57534E]">{log.userSuggestion}</span>
                      </div>

                      <div className="flex items-center justify-end pt-1">
                        <button
                          onClick={() => onUpvoteLog(dish.id, log.id)}
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
          )}
        </div>
      </div>
    </div>
  );
};
