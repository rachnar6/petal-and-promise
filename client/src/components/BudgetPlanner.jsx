import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Sparkles, Check, ArrowRight, DollarSign, Users, Info } from 'lucide-react';

export default function BudgetPlanner() {
  const [totalBudget, setTotalBudget] = useState(5500);
  const [guestCount, setGuestCount] = useState(120);
  const [services, setServices] = useState({
    arch: true,
    centerpieces: true,
    personals: true,
    lighting: true,
    suspended: false
  });

  const navigate = useNavigate();

  // Allocation percentages based on typical luxury wedding floristry
  const calculateAllocations = () => {
    let activeWeights = 0;
    if (services.arch) activeWeights += 28;
    if (services.centerpieces) activeWeights += 38;
    if (services.personals) activeWeights += 14;
    if (services.lighting) activeWeights += 10;
    if (services.suspended) activeWeights += 25;

    const scale = activeWeights > 0 ? totalBudget / activeWeights : 0;

    return {
      arch: services.arch ? Math.round(28 * scale) : 0,
      centerpieces: services.centerpieces ? Math.round(38 * scale) : 0,
      personals: services.personals ? Math.round(14 * scale) : 0,
      lighting: services.lighting ? Math.round(10 * scale) : 0,
      suspended: services.suspended ? Math.round(25 * scale) : 0,
    };
  };

  const allocations = calculateAllocations();

  // Determine suggested tier
  let tier = 'Elegance Tier';
  let tierBadge = 'Perfect for 80-150 guests';
  if (totalBudget < 3000) {
    tier = 'Boutique Intimate Tier';
    tierBadge = 'Ideal for intimate soirees & elopements';
  } else if (totalBudget > 8000) {
    tier = 'Grand Luxe Atelier';
    tierBadge = 'Full ballroom transformations & suspended gardens';
  }

  const handleProceed = () => {
    navigate('/portal/new-event', {
      state: {
        presetBudget: totalBudget,
        presetGuests: guestCount,
        presetTier: tier.split(' ')[0],
        presetServices: services
      }
    });
  };

  return (
    <section id="planner" className="py-24 relative bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-100 text-sage-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-sage-600" />
            <span>Interactive Floral Investment Calculator</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-berry-700 leading-tight">
            Celebration Budget Planner
          </h2>
          <p className="font-cormorant text-xl text-berry-500 mt-3 italic">
            "Transparent beauty. Adjust your event scale to see how your floral investment creates magic across every touchpoint."
          </p>
        </div>

        {/* Planner Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white/80 rounded-3xl p-6 sm:p-10 border border-blush/30 shadow-luxe">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* Total Budget Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-berry-600">
                  Target Celebration Floral Budget
                </label>
                <span className="font-serif text-2xl font-bold text-berry-700">
                  ${totalBudget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1500"
                max="20000"
                step="250"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="w-full h-2.5 bg-sand-200 rounded-lg appearance-none cursor-pointer accent-berry-600"
              />
              <div className="flex justify-between text-[11px] text-berry-400 mt-1">
                <span>$1,500 (Boutique)</span>
                <span>$5,500 (Signature)</span>
                <span>$20,000+ (Grand Estate)</span>
              </div>
            </div>

            {/* Guest Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-berry-600 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sage-600" />
                  <span>Estimated Guest Count</span>
                </label>
                <span className="font-serif text-xl font-bold text-berry-700">
                  {guestCount} Guests
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="350"
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2.5 bg-sand-200 rounded-lg appearance-none cursor-pointer accent-sage-600"
              />
              <div className="flex justify-between text-[11px] text-berry-400 mt-1">
                <span>20 (Intimate)</span>
                <span>120 (Classic)</span>
                <span>350+ (Grand Banquet)</span>
              </div>
            </div>

            {/* Services Checklist */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-berry-600 mb-3">
                Included Celebration Floral Installations
              </label>
              <div className="space-y-2.5">
                {[
                  { key: 'arch', name: 'Ceremony Arch, Chuppah or Altar Pillars', desc: 'Bespoke floral framing with romantic organic textures' },
                  { key: 'centerpieces', name: 'Guest Table Centerpieces & Garlands', desc: 'Compote bowls, cascading florals, and tablescape styling' },
                  { key: 'personals', name: 'Bridal Bouquet & Entourage Boutonnieres', desc: 'Hand-tied with hand-dyed French silk ribbons' },
                  { key: 'lighting', name: 'Candlelight Labyrinth & Glass Hurricanes', desc: 'Pillar candles, floating tea lights, and warm ambient glow' },
                  { key: 'suspended', name: 'Suspended Ceiling Floral Cloud (Optional)', desc: 'Dramatic floating botanical canopy over dance floor or head table' },
                ].map((item) => {
                  const isChecked = services[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => setServices({ ...services, [item.key]: !isChecked })}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'border-blush-400 bg-blush-50/70 shadow-soft'
                          : 'border-sand-200 bg-white/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-berry-600 border-berry-600 text-ivory' : 'border-sand-400 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p className="text-xs font-serif font-semibold text-berry-700">{item.name}</p>
                        <p className="text-[11px] text-berry-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Allocation Breakdown Column */}
          <div className="lg:col-span-6 bg-sand-100/70 rounded-2xl p-6 sm:p-8 border border-sand-300 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-blush-600">
                  Recommended Configuration
                </span>
                <span className="px-3 py-1 rounded-full bg-berry-600 text-ivory text-[10px] font-semibold uppercase tracking-wider">
                  {tier}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-berry-700 mt-1">
                Visual Investment Allocation
              </h3>
              <p className="text-xs text-berry-500 mt-1">{tierBadge}</p>
            </div>

            {/* Visual Breakdown Bars */}
            <div className="space-y-3.5">
              {[
                { label: 'Ceremony Arch / Focal Installation', amount: allocations.arch, color: 'bg-blush' },
                { label: 'Reception Centerpieces & Tables', amount: allocations.centerpieces, color: 'bg-sage' },
                { label: 'Bridal & Entourage Florals', amount: allocations.personals, color: 'bg-berry-400' },
                { label: 'Candlelight & Ambient Illumination', amount: allocations.lighting, color: 'bg-sand-400' },
                { label: 'Suspended Ceiling Installation', amount: allocations.suspended, color: 'bg-berry-600' },
              ].filter(item => item.amount > 0).map((item) => {
                const percent = totalBudget > 0 ? Math.round((item.amount / totalBudget) * 100) : 0;
                return (
                  <div key={item.label} className="text-xs">
                    <div className="flex justify-between font-medium text-berry-700 mb-1">
                      <span>{item.label}</span>
                      <span>${item.amount.toLocaleString()} ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-sand-200 overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-sand-300 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-berry-400 uppercase tracking-wider">Estimated Per-Guest Average</p>
                <p className="font-serif text-xl font-bold text-berry-700">
                  ${Math.round(totalBudget / Math.max(guestCount, 1))} <span className="text-xs font-normal text-berry-500">/ guest</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-berry-400 uppercase tracking-wider">Total Package Estimate</p>
                <p className="font-serif text-2xl font-bold text-berry-700">
                  ${totalBudget.toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={handleProceed}
              className="w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-ivory bg-berry-600 hover:bg-berry-700 shadow-romantic hover:shadow-luxe transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-blush" />
              <span>Apply This Budget to Celebration Plan</span>
              <ArrowRight className="w-4 h-4 text-blush transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
