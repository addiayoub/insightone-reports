import { 
  CircleAlert,
 
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import DraggableChart from './DraggableChart';
import StaticChart from './StaticChart';


const Dashboard = ({ charts, onEditChart, onDeleteChart, onMoveChart, isViewMode }) => {
  return (
    <div className="flex-1 overflow-auto p-6 relative bg-gray-50">
      {!isViewMode ? (
        <motion.div 
          className="h-full min-h-[calc(100vh-180px)] border-2 border-dashed border-gray-300 rounded-lg bg-white relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {charts.length === 0 && (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CircleAlert size={48} className="mb-2" />
              <p className="text-lg font-medium">Aucun graphique</p>
              <p className="text-sm">Cliquez sur "Ajouter un graphique" pour commencer</p>
            </motion.div>
          )}
          
          <AnimatePresence>
            {charts.map(chart => (
              <motion.div
                key={chart.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <DraggableChart
                  id={chart.id}
                  type={chart.type}
                  position={chart.position}
                  onMove={onMoveChart}
                  onEdit={onEditChart}
                  onDelete={onDeleteChart}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {charts.length === 0 ? (
            <motion.div 
              className="col-span-full h-full flex flex-col items-center justify-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CircleAlert size={48} className="mb-2" />
              <p className="text-lg font-medium">Aucun graphique</p>
              <p className="text-sm">Retournez en mode édition pour ajouter des graphiques</p>
            </motion.div>
          ) : (
            charts.map(chart => (
              <StaticChart key={chart.id} type={chart.type} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard