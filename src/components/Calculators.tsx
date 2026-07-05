import { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Zap, Scale, Heart, ShieldAlert } from 'lucide-react';

export default function Calculators() {
  // BMI States
  const [bmiWeight, setBmiWeight] = useState(70);
  const [bmiHeight, setBmiHeight] = useState(170);

  // Calorie States
  const [calAge, setCalAge] = useState(25);
  const [calGender, setCalGender] = useState<'male' | 'female'>('male');
  const [calWeight, setCalWeight] = useState(70);
  const [calHeight, setCalHeight] = useState(170);
  const [activity, setActivity] = useState<number>(1.55); // moderate default

  // BMI calculations
  const heightInMeters = bmiHeight / 100;
  const bmiScore = +(bmiWeight / (heightInMeters * heightInMeters)).toFixed(1);

  let bmiCategory = '';
  let bmiColor = '';
  let bmiAdvice = '';

  if (bmiScore < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-blue-400';
    bmiAdvice = 'Focus on Muscle Building and high-protein nutrition. Our "Muscle Building" program is highly recommended!';
  } else if (bmiScore >= 18.5 && bmiScore < 25) {
    bmiCategory = 'Normal (Healthy)';
    bmiColor = 'text-green-400';
    bmiAdvice = 'Perfect score! Maintain your peak performance using our General Fitness and Strength Training sessions.';
  } else if (bmiScore >= 25 && bmiScore < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-400';
    bmiAdvice = 'Prioritize our "Weight Loss" package and high-intensity interval conditioning on treadmills.';
  } else {
    bmiCategory = 'Obese';
    bmiColor = 'text-red-500';
    bmiAdvice = 'Our certified trainers can design a safe, low-impact fat loss circuit. Start with personal 1-on-1 coaching!';
  }

  // Calorie calculations (Harris-Benedict formula)
  let bmr = 0;
  if (calGender === 'male') {
    bmr = 88.362 + (13.397 * calWeight) + (4.799 * calHeight) - (5.677 * calAge);
  } else {
    bmr = 447.593 + (9.247 * calWeight) + (3.098 * calHeight) - (4.330 * calAge);
  }

  const maintenanceCalories = Math.round(bmr * activity);
  const fatLossCalories = Math.round(maintenanceCalories * 0.8);
  const muscleGainCalories = Math.round(maintenanceCalories * 1.15);

  return (
    <section id="calculators" className="py-24 bg-zinc-900 text-white relative border-b border-white/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-display font-black text-xs tracking-widest uppercase block mb-2">
            FITNESS UTILITIES
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 italic uppercase leading-none">
            HEALTH METRIC CALCULATORS
          </h2>
          <p className="mt-4 text-zinc-400 font-sans text-sm leading-relaxed">
            Know your starting numbers. Compute your Body Mass Index (BMI) and discover your daily maintenance calories to align your workout diet exactly with your goals.
          </p>
        </div>

        {/* Dual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          
          {/* BMI Card */}
          <div className="bg-black border border-white/10 rounded-none p-8 shadow-none hover:border-red-600/30 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white/5 border border-white/10 p-3 rounded-none">
                <Scale className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <span className="text-zinc-500 font-sans text-[10px] font-black uppercase tracking-wider block">
                  Body Mass Index
                </span>
                <h3 className="font-display font-black text-lg text-white uppercase tracking-widest">
                  BMI CALCULATOR
                </h3>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-6">
              {/* Weight */}
              <div>
                <div className="flex justify-between text-xs font-sans mb-2 font-bold uppercase tracking-wider">
                  <span className="text-zinc-400">Your Weight</span>
                  <span className="text-white font-black">{bmiWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="150"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(+e.target.value)}
                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-red-600"
                  aria-label="BMI Weight Slider"
                />
              </div>

              {/* Height */}
              <div>
                <div className="flex justify-between text-xs font-sans mb-2 font-bold uppercase tracking-wider">
                  <span className="text-zinc-400">Your Height</span>
                  <span className="text-white font-black">{bmiHeight} cm</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="220"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(+e.target.value)}
                  className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-red-600"
                  aria-label="BMI Height Slider"
                />
              </div>
            </div>

            {/* BMI Result Display Panel */}
            <div className="mt-8 bg-zinc-950 border border-white/5 p-6 rounded-none">
              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest font-sans block">
                    Your BMI Score
                  </span>
                  <span className="text-4xl font-display font-black text-white italic mt-1 block">
                    {bmiScore}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest font-sans block">
                    Classification
                  </span>
                  <span className={`text-sm font-black uppercase tracking-widest mt-1 block ${bmiColor}`}>
                    {bmiCategory}
                  </span>
                </div>
              </div>

              {/* Graphical Scale Marker */}
              <div className="mt-6">
                <div className="h-1.5 bg-black border border-white/5 rounded-none overflow-hidden flex">
                  <div className="h-full bg-blue-400" style={{ width: '18.5%' }} title="Underweight" />
                  <div className="h-full bg-green-400" style={{ width: '25%' }} title="Normal" />
                  <div className="h-full bg-amber-400" style={{ width: '25%' }} title="Overweight" />
                  <div className="h-full bg-red-600" style={{ width: '31.5%' }} title="Obese" />
                </div>
                <div className="flex justify-between text-[8px] text-zinc-500 font-black font-mono mt-1.5 uppercase tracking-widest">
                  <span>Under 18.5</span>
                  <span>18.5 - 24.9</span>
                  <span>25 - 29.9</span>
                  <span>30+</span>
                </div>
              </div>

              {/* Personalised advice */}
              <div className="mt-6 pt-5 border-t border-white/5 flex items-start space-x-3">
                <ShieldAlert className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                  <strong>Advice:</strong> {bmiAdvice}
                </p>
              </div>
            </div>
          </div>

          {/* Calorie Card */}
          <div className="bg-black border border-white/10 rounded-none p-8 shadow-none hover:border-red-600/30 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white/5 border border-white/10 p-3 rounded-none">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <span className="text-zinc-500 font-sans text-[10px] font-black uppercase tracking-wider block">
                  Daily Calorie Formula
                </span>
                <h3 className="font-display font-black text-lg text-white uppercase tracking-widest">
                  TDEE CALCULATOR
                </h3>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-5">
              {/* Gender Choice */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Gender</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCalGender('male')}
                    className={`py-2.5 rounded-none border font-sans font-black text-[10px] tracking-widest uppercase transition-all duration-200 ${
                      calGender === 'male'
                        ? 'bg-red-600 border-red-600 text-white shadow-none'
                        : 'bg-black border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    MALE
                  </button>
                  <button
                    onClick={() => setCalGender('female')}
                    className={`py-2.5 rounded-none border font-sans font-black text-[10px] tracking-widest uppercase transition-all duration-200 ${
                      calGender === 'female'
                        ? 'bg-red-600 border-red-600 text-white shadow-none'
                        : 'bg-black border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    FEMALE
                  </button>
                </div>
              </div>

              {/* Age, Weight, Height Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">Age (Yrs)</label>
                  <input
                    type="number"
                    min="12"
                    max="90"
                    value={calAge}
                    onChange={(e) => setCalAge(Math.max(12, Math.min(90, +e.target.value || 25)))}
                    className="w-full bg-zinc-950 border border-white/10 rounded-none px-3 py-2.5 text-center font-display font-black text-white focus:outline-none focus:border-red-600 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">Weight (kg)</label>
                  <input
                    type="number"
                    min="30"
                    max="180"
                    value={calWeight}
                    onChange={(e) => setCalWeight(Math.max(30, Math.min(180, +e.target.value || 70)))}
                    className="w-full bg-zinc-950 border border-white/10 rounded-none px-3 py-2.5 text-center font-display font-black text-white focus:outline-none focus:border-red-600 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">Height (cm)</label>
                  <input
                    type="number"
                    min="100"
                    max="230"
                    value={calHeight}
                    onChange={(e) => setCalHeight(Math.max(100, Math.min(230, +e.target.value || 170)))}
                    className="w-full bg-zinc-950 border border-white/10 rounded-none px-3 py-2.5 text-center font-display font-black text-white focus:outline-none focus:border-red-600 text-sm"
                  />
                </div>
              </div>

              {/* Activity Dropdown */}
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">Weekly Activity Frequency</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(+e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-none p-3 text-xs text-zinc-300 font-sans focus:outline-none focus:border-red-600"
                >
                  <option value={1.2}>Sedentary (No regular workout)</option>
                  <option value={1.375}>Light Exercise (1-2 sessions / week)</option>
                  <option value={1.55}>Moderate Training (3-5 sessions / week)</option>
                  <option value={1.725}>Hardcore Athlete (6-7 sessions / week)</option>
                </select>
              </div>
            </div>

            {/* Results Grid Panel */}
            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-3">
              <div className="bg-zinc-950 p-3.5 rounded-none border border-white/5 text-center">
                <span className="text-[9px] text-zinc-500 font-black uppercase tracking-wider block mb-1">Fat Loss</span>
                <span className="text-lg font-display font-black text-green-400 italic block">{fatLossCalories}</span>
                <span className="text-[8px] text-zinc-500 font-black uppercase tracking-widest block mt-1">kcal/day</span>
              </div>

              <div className="bg-zinc-950 p-3.5 rounded-none border border-red-600/30 text-center scale-105 shadow-none">
                <span className="text-[9px] text-red-500 font-black uppercase tracking-wider block mb-1">Maint.</span>
                <span className="text-lg font-display font-black text-white italic block">{maintenanceCalories}</span>
                <span className="text-[8px] text-zinc-500 font-black uppercase tracking-widest block mt-1">kcal/day</span>
              </div>

              <div className="bg-zinc-950 p-3.5 rounded-none border border-white/5 text-center">
                <span className="text-[9px] text-zinc-500 font-black uppercase tracking-wider block mb-1">Muscle</span>
                <span className="text-lg font-display font-black text-blue-400 italic block">{muscleGainCalories}</span>
                <span className="text-[8px] text-zinc-500 font-black uppercase tracking-widest block mt-1">kcal/day</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
