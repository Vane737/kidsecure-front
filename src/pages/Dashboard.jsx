import { UserIcon, BellAlertIcon } from '@heroicons/react/24/solid';

export const  Dashboard = () => {

    return(
        <div className="w-full p-10 container h-60 grid grid-cols-3 gap-6">
            <div className="bg-customGreen p-6 rounded-md shadow-md">
                <div className="flex items-center">
                    <div className="bg-emerald-500 p-3 rounded-full mr-4">
                    <UserIcon  className="w-10 h-10"/>    
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-700">Administrar niños</p>
                        <p className="text-2xl font-bold text-gray-900">57 inscritos</p>
                    </div>
                </div>
            </div>        
            <div className="bg-customPink p-6 rounded-md shadow-md">
                <div className="flex items-center">
                    <div className="bg-pink-600 p-3 rounded-full mr-4">
                    <BellAlertIcon  className="w-10 h-10"/>    
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-700">Identificacion de violencia</p>
                        <p className="text-2xl font-bold text-gray-900">57 inscritos</p>
                    </div>
                </div>
            </div>        
            <div className="bg-customGreen p-6 rounded-md shadow-md">
                <div className="flex items-center">
                    <div className="bg-emerald-500 p-3 rounded-full mr-4">
                    <UserIcon  className="w-10 h-10"/>    
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-700">Administrar </p>
                        <p className="text-2xl font-bold text-gray-900">57 inscritos</p>
                    </div>
                </div>
            </div>        
        </div>
    ); 
}