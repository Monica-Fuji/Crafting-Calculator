import React, { useState } from 'react';
import { Calculator, Ruler, Triangle, Percent } from 'lucide-react';

type CalculatorType = 'circular-skirt' | 'circular-frill' | 'ratio' | 'pythagorean';

const CraftingCalculator: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<CalculatorType>('circular-skirt');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <Calculator className="text-indigo-600" />
          Crafting Pattern Calculator
        </h1>
        <p className="text-gray-600 mb-8">Tools for sewing, crafting, and pattern making</p>

        {/* Calculator Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setActiveCalc('circular-skirt')}
            className={`p-4 rounded-lg font-medium transition-all ${
              activeCalc === 'circular-skirt'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            <Ruler className="w-5 h-5 mx-auto mb-2" />
            Circular Skirt
          </button>
          <button
            onClick={() => setActiveCalc('circular-frill')}
            className={`p-4 rounded-lg font-medium transition-all ${
              activeCalc === 'circular-frill'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            <Ruler className="w-5 h-5 mx-auto mb-2" />
            Circular Frill
          </button>
          <button
            onClick={() => setActiveCalc('ratio')}
            className={`p-4 rounded-lg font-medium transition-all ${
              activeCalc === 'ratio'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            <Percent className="w-5 h-5 mx-auto mb-2" />
            Ratio Scale
          </button>
          <button
            onClick={() => setActiveCalc('pythagorean')}
            className={`p-4 rounded-lg font-medium transition-all ${
              activeCalc === 'pythagorean'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            <Triangle className="w-5 h-5 mx-auto mb-2" />
            Pythagorean
          </button>
        </div>

        {/* Calculator Components */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          {activeCalc === 'circular-skirt' && <CircularSkirtCalc />}
          {activeCalc === 'circular-frill' && <CircularFrillCalc />}
          {activeCalc === 'ratio' && <RatioCalc />}
          {activeCalc === 'pythagorean' && <PythagoreanCalc />}
        </div>
      </div>
    </div>
  );
};

// Circular Skirt Calculator (Flare Skirt)
const CircularSkirtCalc: React.FC = () => {
  const [waist, setWaist] = useState<string>('');
  const [angle, setAngle] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [results, setResults] = useState<{A: number, B: number, C: number} | null>(null);

  const calculate = () => {
    const w = parseFloat(waist);
    const a = parseFloat(angle);
    const l = parseFloat(length);

    if (!w || !a || !l) return;

    // Inner radius (waist circumference formula)
    const innerRadius = (w * 360) / (a * 2 * Math.PI);
    // Outer radius
    const outerRadius = innerRadius + l;
    // Total waist + allowance
    const totalWaist = w + 0; // Add seam allowance if needed

    setResults({
      A: Math.round(innerRadius * 100) / 100,
      B: Math.round(outerRadius * 100) / 100,
      C: Math.round(totalWaist * 100) / 100
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Flare Skirt Pattern Calculator</h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Waist Size (cm)</label>
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            placeholder="e.g., 70"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Desired Angle (degrees)</label>
          <input
            type="number"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            placeholder="e.g., 180"
          />
          <p className="text-sm text-gray-500 mt-1">90° = quarter circle, 180° = half circle, 360° = full circle</p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Length excluding belt (cm)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            placeholder="e.g., 60"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Calculate
        </button>
      </div>

      {results && (
        <div className="mt-8 p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Calculation Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">A (Inner Radius):</span>
              <span className="text-2xl font-bold text-indigo-600">{results.A} cm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">B (Outer Radius):</span>
              <span className="text-2xl font-bold text-indigo-600">{results.B} cm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">C (Waist + Allowance):</span>
              <span className="text-2xl font-bold text-indigo-600">{results.C} cm</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Circular Frill Calculator
const CircularFrillCalc: React.FC = () => {
  const [arcLength, setArcLength] = useState<string>('200');
  const [angle, setAngle] = useState<string>('180');
  const [frillWidth, setFrillWidth] = useState<string>('5');
  const [results, setResults] = useState<{A: number, B: number} | null>(null);

  const calculate = () => {
    const arc = parseFloat(arcLength);
    const a = parseFloat(angle);
    const width = parseFloat(frillWidth);

    if (!arc || !a || !width) return;

    // Inner radius from arc length formula: arc = radius × angle(radians)
    const angleRad = (a * Math.PI) / 180;
    const innerRadius = arc / angleRad;
    const outerRadius = innerRadius + width;

    setResults({
      A: Math.round(innerRadius * 100) / 100,
      B: Math.round(outerRadius * 100) / 100
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Circular Frill Radius Calculator</h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Desired Arc Length (cm)</label>
          <input
            type="number"
            value={arcLength}
            onChange={(e) => setArcLength(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
          />
          <p className="text-sm text-gray-500 mt-1">Length where the frill will be attached</p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Desired Angle (degrees)</label>
          <input
            type="number"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Frill Width (cm)</label>
          <input
            type="number"
            value={frillWidth}
            onChange={(e) => setFrillWidth(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Calculate
        </button>
      </div>

      {results && (
        <div className="mt-8 p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Calculation Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Inner Circle Radius A:</span>
              <span className="text-2xl font-bold text-indigo-600">{results.A} cm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Outer Circle Radius B:</span>
              <span className="text-2xl font-bold text-indigo-600">{results.B} cm</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Ratio/Scale Calculator
const RatioCalc: React.FC = () => {
  const [known1, setKnown1] = useState<string>('');
  const [known2, setKnown2] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const k1 = parseFloat(known1);
    const k2 = parseFloat(known2);
    const t = parseFloat(target);

    if (!k1 || !k2 || !t) return;

    // x : k1 = t : k2
    // x = (t * k1) / k2
    const answer = (t * k1) / k2;
    setResult(Math.round(answer * 100) / 100);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ratio Scale Calculator</h2>
      <p className="text-gray-600 mb-6">Use this to scale patterns or create life-size items from references</p>
      
      <div className="space-y-5">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 font-mono text-center text-lg">
            <span className="text-indigo-600 font-bold">?</span> : <input 
              type="number"
              value={known1}
              onChange={(e) => setKnown1(e.target.value)}
              className="w-20 p-1 border-2 border-gray-300 rounded text-center inline-block"
              placeholder="3"
            /> = <input 
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-20 p-1 border-2 border-gray-300 rounded text-center inline-block"
              placeholder="1"
            /> : <input 
              type="number"
              value={known2}
              onChange={(e) => setKnown2(e.target.value)}
              className="w-20 p-1 border-2 border-gray-300 rounded text-center inline-block"
              placeholder="4"
            />
          </p>
          <p className="text-sm text-gray-500 text-center mt-3">
            Example: If 3cm in pattern = 4cm in real life, what is 1cm in pattern?
          </p>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Calculate
        </button>
      </div>

      {result !== null && (
        <div className="mt-8 p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Result</h3>
          <div className="text-center">
            <span className="text-4xl font-bold text-indigo-600">{result}</span>
            <p className="text-gray-600 mt-2">units (same as inputs)</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Pythagorean Theorem Calculator
const PythagoreanCalc: React.FC = () => {
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);

    if (!a || !b) return;

    // c² = a² + b²
    const c = Math.sqrt(a * a + b * b);
    setResult(Math.round(c * 100) / 100);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Pythagorean Theorem Calculator</h2>
      <p className="text-gray-600 mb-6">Calculate beveled edge lengths and diagonal measurements</p>
      
      <div className="space-y-5">
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-700 font-mono text-lg mb-2">c² = a² + b²</p>
          <p className="text-sm text-gray-500">Find the hypotenuse (c) from two sides</p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Side A (cm)</label>
          <input
            type="number"
            value={sideA}
            onChange={(e) => setSideA(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            placeholder="e.g., 30"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Side B (cm)</label>
          <input
            type="number"
            value={sideB}
            onChange={(e) => setSideB(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            placeholder="e.g., 40"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Calculate
        </button>
      </div>

      {result !== null && (
        <div className="mt-8 p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Result</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Hypotenuse (c):</span>
            <span className="text-4xl font-bold text-indigo-600">{result} cm</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CraftingCalculator;