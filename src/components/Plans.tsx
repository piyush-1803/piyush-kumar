import { motion } from 'motion/react';
import { Check, Flame } from 'lucide-react';
import { MembershipPlan } from '../types';

interface PlansProps {
  plans: MembershipPlan[];
  onSelectPlan: (planName: string) => void;
}

export default function Plans({ plans, onSelectPlan }: PlansProps) {
  return (
    <section id="plans" className="py-24 bg-zinc-950 text-white relative border-b border-white/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-display font-black text-xs tracking-widest uppercase block mb-2">
            MEMBERSHIP PRICING
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 italic uppercase leading-none">
            AFFORDABLE FITNESS RATES
          </h2>
          <p className="mt-4 text-zinc-400 font-sans text-sm leading-relaxed">
            No hidden admission costs. Choose a plan that fits your schedule, budget, and fitness goals. Save more with our multi-month packages.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const isFeatured = plan.isPopular;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-8 flex flex-col justify-between transition-all duration-300 rounded-none border ${
                  isFeatured 
                    ? 'bg-white text-black border-white shadow-2xl md:-translate-y-4 scale-105 z-10' 
                    : 'bg-black border-white/10 hover:border-white/20 text-white'
                }`}
              >
                {/* Popular Ribbon / Simple indicator */}
                {isFeatured && (
                  <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-none flex items-center space-x-1 shadow-lg">
                    <Flame className="h-3 w-3 fill-white text-white" />
                    <span>MOST POPULAR VALUE</span>
                  </div>
                )}

                {/* Card Header */}
                <div>
                  <h3 className={`font-display font-black text-2xl uppercase tracking-wider ${
                    isFeatured ? 'text-black' : 'text-white'
                  }`}>
                    {plan.name}
                  </h3>
                  
                  {/* Price Display */}
                  <div className="mt-5 flex items-baseline">
                    <span className={`font-display font-black text-4xl md:text-5xl tracking-tighter italic leading-none ${
                      isFeatured ? 'text-black' : 'text-white'
                    }`}>
                      {plan.price}
                    </span>
                    <span className={`font-sans text-xs ml-2 font-bold uppercase tracking-wider ${
                      isFeatured ? 'text-zinc-500' : 'text-zinc-500'
                    }`}>
                      / {plan.billingPeriod}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className={`h-px my-6 ${isFeatured ? 'bg-black/10' : 'bg-white/10'}`} />

                  {/* Features List */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-xs leading-normal">
                        <div className={`p-0.5 rounded-none mt-0.5 shrink-0 ${
                          isFeatured ? 'bg-red-600/10' : 'bg-red-600/5'
                        }`}>
                          <Check className="h-3.5 w-3.5 text-red-600" />
                        </div>
                        <span className={`font-sans ${
                          isFeatured ? 'text-zinc-800' : 'text-zinc-300'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="mt-8">
                  <button
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full font-sans font-black py-4 px-4 rounded-none transition-all duration-200 text-xs uppercase tracking-widest active:scale-95 ${
                      isFeatured
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-zinc-900 text-white border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {isFeatured ? 'GRAB THIS DEAL' : 'CHOOSE PACKAGE'}
                  </button>
                  <span className={`block text-center text-[10px] uppercase tracking-wider mt-3 font-bold ${
                    isFeatured ? 'text-zinc-500' : 'text-zinc-600'
                  }`}>
                    *Pay on counter in Bhurkunda gym
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
