import {  Database,

} from "lucide-react";
const DatabaseSelector = ({ databases, selectedDb, onSelectDb, onNext }) => {
  return (
    <div className="animate-fadeIn">
      <h3 className="text-lg font-medium mb-4">Sélectionnez une base de données</h3>
      <div className="grid grid-cols-3 gap-4">
        {databases.map(db => (
          <div 
            key={db.id}
            onClick={() => onSelectDb(db.id)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedDb === db.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
          >
            <div className="flex items-center space-x-3">
              <Database className="text-blue-500" />
              <div>
                <h4 className="font-medium">{db.name}</h4>
                <p className="text-sm text-gray-500">{db.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedDb && (
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};
export default DatabaseSelector