import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Label
} from 'recharts';

const PortfolioCharts = () => {
  const [activeChart, setActiveChart] = useState('bubble');

  // Dados para o Gráfico de Bolhas (CPI vs SPI)
  const bubbleData = [
    { name: 'P1 - EAD', spi: 0.85, cpi: 0.90, budget: 2500000 },
    { name: 'P2 - SaaS', spi: 0.80, cpi: 0.85, budget: 5000000 },
    { name: 'P3 - Bootcamp', spi: 1.05, cpi: 0.94, budget: 500000 }
  ];

  // Dados para o Gráfico de Barras (AHP vs Orçamento)
  const ahpData = [
    { name: 'P2 - SaaS GPP Portfólio', score: 8.17, budget: 5000000, rank: 1 },
    { name: 'P1 - Plataforma GPP EAD', score: 7.63, budget: 2500000, rank: 2 },
    { name: 'P4 - Consultoria FinTech', score: 6.96, budget: 800000, rank: 3 },
    { name: 'P3 - Bootcamp IA-Dev', score: 6.80, budget: 500000, rank: 4 },
    { name: 'P5 - Marketing Global', score: 5.54, budget: 1500000, rank: 5 }
  ];

  // Dados para o Gráfico de Gantt
  const ganttData = [
    { name: 'P3 - Bootcamp IA-Dev', start: new Date('2025-11-01'), end: new Date('2026-03-01'), color: '#2ecc71' },
    { name: 'P1 - Plataforma GPP EAD', start: new Date('2025-11-01'), end: new Date('2027-11-01'), color: '#f39c12' },
    { name: 'P2 - SaaS GPP Portfólio', start: new Date('2025-11-01'), end: new Date('2028-05-01'), color: '#e74c3c' }
  ];

  // Dados para o Gráfico de Donut
  const donutData = [
    { name: 'Alocado', value: 8800000, color: '#667eea' },
    { name: 'Reserva', value: 1200000, color: '#95a5a6' }
  ];

  // Custom Label para o gráfico de barras
  const CustomBarLabel = (props) => {
    const { x, y, width, height, index } = props;
    const budget = ahpData[index]?.budget || 0;
    return (
      <text
        x={x + width + 5}
        y={y + height / 2}
        fill="#666"
        textAnchor="start"
        dominantBaseline="middle"
        fontSize="12"
        fontWeight="bold"
      >
        {formatCurrency(budget)}
      </text>
    );
  };

  // Funções auxiliares
  const formatCurrency = (value) => {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  };

  const getBubbleColor = (spi, cpi) => {
    if (spi >= 1 && cpi >= 1) return '#00C851'; // Verde
    if (spi < 1 && cpi < 1) return '#ff4444'; // Vermelho
    return '#ffbb33'; // Amarelo
  };

  const getQuadrant = (spi, cpi) => {
    if (spi >= 1 && cpi >= 1) return 'Adiantado & Abaixo do Custo';
    if (spi < 1 && cpi >= 1) return 'Atrasado & Abaixo do Custo';
    if (spi >= 1 && cpi < 1) return 'Adiantado & Acima do Custo';
    return 'Atrasado & Acima do Custo';
  };

  // Custom Tooltip para Bolhas
  const BubbleTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border-2 border-gray-300 rounded shadow-lg">
          <p className="font-bold text-gray-800">{data.name}</p>
          <p className="text-sm">SPI: <span className="font-semibold">{data.spi.toFixed(2)}</span></p>
          <p className="text-sm">CPI: <span className="font-semibold">{data.cpi.toFixed(2)}</span></p>
          <p className="text-sm">Orçamento: <span className="font-semibold">{formatCurrency(data.budget)}</span></p>
          <p className="text-xs mt-1 text-gray-600">{getQuadrant(data.spi, data.cpi)}</p>
        </div>
      );
    }
    return null;
  };

  // Gráfico de Gantt customizado
  const GanttChart = () => {
    const minDate = new Date('2025-11-01');
    const maxDate = new Date('2028-05-01');
    const totalDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);

    return (
      <div className="w-full h-96 p-4">
        <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
          Cronograma do Portfólio de Expansão (2025-2028)
        </h3>
        <div className="space-y-6">
          {ganttData.map((project, idx) => {
            const startOffset = ((project.start - minDate) / (1000 * 60 * 60 * 24)) / totalDays * 100;
            const duration = ((project.end - project.start) / (1000 * 60 * 60 * 24)) / totalDays * 100;
            
            return (
              <div key={idx} className="relative">
                <div className="flex items-center mb-1">
                  <span className="w-48 text-sm font-semibold text-gray-700">{project.name}</span>
                </div>
                <div className="relative h-12 bg-gray-100 rounded">
                  <div
                    className="absolute h-full rounded flex items-center justify-center text-white text-xs font-bold shadow"
                    style={{
                      left: `${startOffset}%`,
                      width: `${duration}%`,
                      backgroundColor: project.color
                    }}
                  >
                    {project.start.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {project.end.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-4 text-xs text-gray-600">
          <span>Nov/2025</span>
          <span>2026</span>
          <span>2027</span>
          <span>Mai/2028</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Análise Visual do Portfólio GPP</h1>
          <p className="text-gray-600">Dashboard interativo com 4 visualizações essenciais para PMO</p>
        </div>

        {/* Navegação */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveChart('bubble')}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeChart === 'bubble'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Saúde dos Projetos (CPI/SPI)
            </button>
            <button
              onClick={() => setActiveChart('ahp')}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeChart === 'ahp'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Priorização AHP vs Custo
            </button>
            <button
              onClick={() => setActiveChart('gantt')}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeChart === 'gantt'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cronograma (Gantt)
            </button>
            <button
              onClick={() => setActiveChart('donut')}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeChart === 'donut'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Alocação Orçamentária
            </button>
          </div>
        </div>

        {/* Gráficos */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeChart === 'bubble' && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Saúde dos Projetos do Portfólio (CPI vs. SPI)
              </h2>
              <ResponsiveContainer width="100%" height={500}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="spi"
                    name="SPI"
                    domain={[0.7, 1.15]}
                    label={{ value: 'Desempenho de Prazo (SPI)', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="cpi"
                    name="CPI"
                    domain={[0.75, 1.05]}
                    label={{ value: 'Desempenho de Custo (CPI)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip content={<BubbleTooltip />} />
                  <Scatter name="Projetos" data={bubbleData}>
                    {bubbleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBubbleColor(entry.spi, entry.cpi)} />
                    ))}
                  </Scatter>
                  {/* Linhas de referência */}
                  <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#666" strokeWidth={2} strokeDasharray="5 5" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#666" strokeWidth={2} strokeDasharray="5 5" />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="p-3 bg-green-100 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-800">Adiantado & Abaixo</p>
                  <p className="text-xs text-green-700">SPI &gt; 1, CPI &gt; 1</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded border-l-4 border-yellow-500">
                  <p className="font-bold text-yellow-800">Atrasado & Abaixo</p>
                  <p className="text-xs text-yellow-700">SPI &lt; 1, CPI &gt; 1</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded border-l-4 border-yellow-500">
                  <p className="font-bold text-yellow-800">Adiantado & Acima</p>
                  <p className="text-xs text-yellow-700">SPI &gt; 1, CPI &lt; 1</p>
                </div>
                <div className="p-3 bg-red-100 rounded border-l-4 border-red-500">
                  <p className="font-bold text-red-800">Atrasado & Acima</p>
                  <p className="text-xs text-red-700">SPI &lt; 1, CPI &lt; 1</p>
                </div>
              </div>
            </div>
          )}

          {activeChart === 'ahp' && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Priorização (AHP) vs. Custo do Projeto
              </h2>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={ahpData} layout="vertical" margin={{ top: 20, right: 120, bottom: 20, left: 180 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" label={{ value: 'Score de Priorização (AHP)', position: 'insideBottom', offset: -10 }} />
                  <YAxis dataKey="name" type="category" width={170} />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'score') return [value.toFixed(2), 'Score AHP'];
                      return [formatCurrency(value), 'Orçamento'];
                    }}
                  />
                  <Bar dataKey="score" fill="#667eea" label={<CustomBarLabel />}>
                    {ahpData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#667eea" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeChart === 'gantt' && <GanttChart />}

          {activeChart === 'donut' && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Alocação Orçamentária do Portfólio
              </h2>
              <ResponsiveContainer width="100%" height={500}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={120}
                    outerRadius={180}
                    paddingAngle={5}
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${((entry.value / 10000000) * 100).toFixed(0)}%`}
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label
                      value="Total: R$ 10M"
                      position="center"
                      style={{ fontSize: '24px', fontWeight: 'bold', fill: '#333' }}
                    />
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="p-4 bg-indigo-100 rounded text-center">
                  <p className="text-2xl font-bold text-indigo-800">{formatCurrency(8800000)}</p>
                  <p className="text-sm text-indigo-700">Alocado (88%)</p>
                </div>
                <div className="p-4 bg-gray-100 rounded text-center">
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(1200000)}</p>
                  <p className="text-sm text-gray-700">Reserva (12%)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCharts;