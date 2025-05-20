import { ChevronLeft, ChevronRight, Table } from 'lucide-react';
import React from 'react'

const SchemaSelector = ({ schemas, selectedSchema, onSelectSchema, onBack, onNext }) => {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center space-x-2 mb-4">
        <button onClick={onBack} className="text-blue-500 hover:text-blue-700">
          <ChevronLeft />
        </button>
        <h3 className="text-lg font-medium">Sélectionnez un schéma</h3>
      </div>
      
      <div className="space-y-2">
        {schemas.map(schema => (
          <div 
            key={schema.id}
            onClick={() => onSelectSchema(schema.id)}
            className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedSchema === schema.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Table className="text-blue-500" />
                <h4 className="font-medium">{schema.name}</h4>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
      
     
    </div>
  );
};

export default SchemaSelector