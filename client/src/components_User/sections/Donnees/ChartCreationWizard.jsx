import React, { useState } from 'react';
import { X, ChevronLeft, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import DatabaseSelector from './DatabaseSelector';
import SchemaSelector from './SchemaSelector';
import FunctionSelector from './FunctionSelector';

import ChartTypeSelector from './ChartTypeSelector';
import ServerSelector from './ServerSelector'; // Nouveau composant

const ChartCreationWizard = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [selectedServer, setSelectedServer] = useState(null); // Nouveau state
  const [selectedDb, setSelectedDb] = useState(null);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [selectedChartType, setSelectedChartType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Liste des serveurs disponibles
  const servers = [
    { id: 'server1', name: 'Production Server', location: 'EU-West' },
    { id: 'server2', name: 'Development Server', location: 'US-East' },
    { id: 'server3', name: 'Staging Server', location: 'Asia-Pacific' },
  ];
  
  const databases = [
    { id: 'db1', name: 'Production DB', type: 'PostgreSQL' },
    { id: 'db2', name: 'Analytics DB', type: 'MySQL' },
    { id: 'db3', name: 'Archive DB', type: 'MongoDB' },
  ];
  
  const schemas = [
    { id: 'schema1', name: 'public' },
    { id: 'schema2', name: 'analytics' },
    { id: 'schema3', name: 'security' },
  ];
  
  const functions = [
    {
      id: 'func1',
      name: 'get_sales_data',
      description: 'Retourne les données de vente',
      columns: [
        { name: 'month', type: 'varchar' },
        { name: 'amount', type: 'numeric' },
        { name: 'product', type: 'varchar' },
      ],
      parameters: [
        { name: 'start_date', type: 'date' },
        { name: 'end_date', type: 'date' },
      ]
    },
  ];

  const handleComplete = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newChart = {
        server: selectedServer,
        db: selectedDb,
        schema: selectedSchema,
        function: selectedFunction,
        type: selectedChartType,
        position: { x: 100, y: 100 }
      };
      onComplete(newChart);
      setIsSubmitting(false);
    }, 800); // Simuler un chargement
  };

  // Mettre à jour les étapes
  const steps = [
    { id: 1, title: 'Serveur' },
    { id: 2, title: 'Base de données' },
    { id: 3, title: 'Schéma' },
    { id: 4, title: 'Fonction' },
    { id: 5, title: 'Type de graphique' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Ajouter un nouveau graphique</h2>
            <button 
              onClick={onCancel} 
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4">
              {steps.map((stepItem, index) => (
                <React.Fragment key={stepItem.id}>
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepItem.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                    animate={{ 
                      scale: step === stepItem.id ? 1.1 : 1,
                      backgroundColor: step >= stepItem.id ? '#3B82F6' : '#E5E7EB'
                    }}
                  >
                    {stepItem.id}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <motion.div 
                      className="w-16 h-1 bg-gray-200"
                      animate={{ 
                        backgroundColor: step > stepItem.id ? '#3B82F6' : '#E5E7EB'
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="min-h-[400px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-4"
              >
                {step === 1 && (
                  <ServerSelector 
                    servers={servers} 
                    selectedServer={selectedServer} 
                    onSelectServer={setSelectedServer}
                    onNext={() => setStep(2)}
                  />
                )}
                {step === 2 && (
                  <DatabaseSelector 
                    databases={databases} 
                    selectedDb={selectedDb} 
                    onSelectDb={setSelectedDb}
                    onNext={() => setStep(3)}
                    onBack={() => setStep(1)}
                  />
                )}
                {step === 3 && (
                  <SchemaSelector 
                    schemas={schemas} 
                    selectedSchema={selectedSchema} 
                    onSelectSchema={setSelectedSchema}
                    onBack={() => setStep(2)}
                    onNext={() => setStep(4)}
                  />
                )}
                {step === 4 && (
                  <FunctionSelector 
                    functions={functions} 
                    selectedFunction={selectedFunction} 
                    onSelectFunction={setSelectedFunction}
                    onBack={() => setStep(3)}
                    onNext={() => setStep(5)}
                  />
                )}
                {step === 5 && (
                  <ChartTypeSelector 
                    onSelect={setSelectedChartType}
                    selectedChartType={selectedChartType}
                    onBack={() => setStep(4)}
                    onNext={handleComplete}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronLeft size={16} />
              <span>Précédent</span>
            </button>
            
            {step < 5 ? (
              <button
                onClick={() => {
                  // Vérifier les conditions pour passer à l'étape suivante
                  if (
                    (step === 1 && selectedServer) ||
                    (step === 2 && selectedDb) ||
                    (step === 3 && selectedSchema) ||
                    (step === 4 && selectedFunction)
                  ) {
                    setStep(step + 1);
                  }
                }}
                disabled={
                  (step === 1 && !selectedServer) ||
                  (step === 2 && !selectedDb) ||
                  (step === 3 && !selectedSchema) ||
                  (step === 4 && !selectedFunction)
                }
                className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                  (step === 1 && !selectedServer) ||
                  (step === 2 && !selectedDb) ||
                  (step === 3 && !selectedSchema) ||
                  (step === 4 && !selectedFunction)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <span>Suivant</span>
              </button>
            ) : (
             <br />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChartCreationWizard;