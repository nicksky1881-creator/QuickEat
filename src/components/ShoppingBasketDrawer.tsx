import React, { useState } from 'react';
import { X, Trash2, Check, ShoppingBag, MapPin } from 'lucide-react';
import { IngredientItem, SINGAPORE_SUPERMARKETS } from '../data/singaporeDishes';

export interface BasketEntry {
  key: string;
  ingredient: IngredientItem;
  dishTitle: string;
  servings: number;
  checked: boolean;
}

interface ShoppingBasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entries: BasketEntry[];
  onToggleChecked: (key: string) => void;
  onRemoveEntry: (key: string) => void;
  onClearAll: () => void;
}

export const ShoppingBasketDrawer: React.FC<ShoppingBasketDrawerProps> = ({
  isOpen,
  onClose,
  entries,
  onToggleChecked,
  onRemoveEntry,
  onClearAll
}) => {
  const [selectedStoreId, setSelectedStoreId] = useState<string>(
    SINGAPORE_SUPERMARKETS[0].id
  );
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  if (!isOpen) return null;

  const selectedStore =
    SINGAPORE_SUPERMARKETS.find((s) => s.id === selectedStoreId) ||
    SINGAPORE_SUPERMARKETS[0];

  const totalCost = entries.reduce((sum, entry) => {
    const scale = entry.servings / 2;
    return sum + entry.ingredient.estimatedSgd * scale;
  }, 0);

  const handleCopyChecklist = () => {
    const lines = entries.map((e) => {
      const scale = e.servings / 2;
      const amt = Math.round(e.ingredient.amount * scale * 10) / 10;
      return `[${e.checked ? 'x' : ' '}] ${e.ingredient.name} (${amt} ${e.ingredient.unit}) — ${e.ingredient.aisle}`;
    });
    const text = `Shiok in 10 Fresh Grocery List (${selectedStore.name}):\n${lines.join('\n')}\nEstimated Total: S$${totalCost.toFixed(2)}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-stone-950/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Fresh Supermarket Shopping Basket"
    >
      <div className="w-full max-w-md bg-[#FAF8F5] border-l border-[#E6E1D8] h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E6E1D8] flex items-center justify-between bg-[#F2EFE9]/70">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B9381E]" />
            <div>
              <h2 className="font-display text-lg font-semibold text-[#1C1917]">
                Fresh Supermarket Basket
              </h2>
              <p className="text-xs text-[#57534E] font-mono tabular-nums">
                {entries.length} fresh items · Est. S${totalCost.toFixed(2)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close basket"
            className="p-2 rounded-lg text-[#57534E] hover:text-[#1C1917] hover:bg-stone-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Store Selector */}
        <div className="p-4 border-b border-[#E6E1D8] bg-white space-y-2">
          <label className="block text-xs font-semibold text-[#57534E]">
            Shopping at Supermarket Near You:
          </label>
          <select
            value={selectedStoreId}
            onChange={(e) => setSelectedStoreId(e.target.value)}
            className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-[#E6E1D8] bg-[#FAF8F5] text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
          >
            {SINGAPORE_SUPERMARKETS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.area})
              </option>
            ))}
          </select>
          <div className="flex items-start gap-1.5 text-xs text-[#156147] pt-0.5">
            <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              {selectedStore.nearestMrt} · {selectedStore.hours}
            </span>
          </div>
        </div>

        {/* Itemized Ingredient List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {entries.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <ShoppingBag className="w-8 h-8 text-[#57534E] mx-auto opacity-50" />
              <p className="font-display text-base font-semibold text-[#1C1917]">
                Your Fresh Basket is Empty
              </p>
              <p className="text-xs text-[#57534E] max-w-xs mx-auto">
                Click "Add to Shopping Basket" on any 5–10 minute Singapore dish to build an aisle-sorted fresh ingredient checklist.
              </p>
            </div>
          ) : (
            entries.map((entry) => {
              const scale = entry.servings / 2;
              const scaledAmt = Math.round(entry.ingredient.amount * scale * 10) / 10;
              const scaledCost = (entry.ingredient.estimatedSgd * scale).toFixed(2);
              return (
                <div
                  key={entry.key}
                  className={`p-3.5 rounded-lg border transition-colors ${
                    entry.checked
                      ? 'bg-[#F2EFE9]/50 border-[#E6E1D8] opacity-70'
                      : 'bg-white border-[#E6E1D8]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <button
                        onClick={() => onToggleChecked(entry.key)}
                        aria-label={`Mark ${entry.ingredient.name} purchased`}
                        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                          entry.checked
                            ? 'bg-[#156147] border-[#156147] text-white'
                            : 'border-stone-400 text-transparent hover:border-[#1C1917]'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </button>
                      <div>
                        <div
                          className={`text-sm font-semibold ${
                            entry.checked ? 'line-through text-[#57534E]' : 'text-[#1C1917]'
                          }`}
                        >
                          {entry.ingredient.name}
                        </div>
                        <div className="text-xs text-[#57534E] mt-0.5">
                          <span className="font-mono tabular-nums font-semibold text-[#1C1917]">
                            {scaledAmt} {entry.ingredient.unit}
                          </span>
                          <span aria-hidden="true"> · </span>
                          <span className="text-[#156147]">{entry.ingredient.aisle}</span>
                          <span aria-hidden="true"> · </span>
                          <span className="font-mono tabular-nums">S${scaledCost}</span>
                        </div>
                        <div className="text-xs text-[#57534E] mt-1">
                          For: {entry.dishTitle} ({entry.servings} pax)
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveEntry(entry.key)}
                      aria-label="Remove ingredient"
                      className="text-[#57534E] hover:text-[#B9381E] p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {entries.length > 0 && (
          <div className="p-4 border-t border-[#E6E1D8] bg-white space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#57534E]">Estimated Basket Total</span>
              <span className="font-mono tabular-nums font-semibold text-base text-[#1C1917]">
                S${totalCost.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyChecklist}
                className="flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-[#B9381E] hover:bg-[#9E2E17] transition-colors whitespace-nowrap"
              >
                {copiedFeedback ? 'Checklist Copied!' : 'Copy Aisle Checklist'}
              </button>
              <button
                onClick={onClearAll}
                className="py-2.5 px-3 rounded-lg text-xs font-semibold text-[#57534E] bg-[#F2EFE9] hover:text-[#1C1917] transition-colors whitespace-nowrap"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
