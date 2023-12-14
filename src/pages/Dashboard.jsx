import { UserIcon, BellAlertIcon, ArrowRightCircleIcon, IdentificationIcon } from '@heroicons/react/24/solid';

export const  Dashboard = () => {

    return(
        <div className="w-full p-10 container h-60 grid grid-cols-3 gap-6">
            <div className="bg-customGreen rounded-md shadow-md text-white">
                <div className="flex justify-between items-center m-10">
                    <div>
                        <p className="text-lg font-semibold text-gray-700">Administrar niños</p>
                        <p className="text-2xl font-bold text-gray-800">57 inscritos</p>
                    </div>
                    <div className="bg-emerald-300 text-emerald-700 p-3 rounded-full mr-4">
                    <UserIcon  className="w-10 h-10"/>    
                    </div>
                </div>
                <div className='bg-emerald-500 w-full h-10 text-center rounded-b-md flex justify-center items-center '>
                    <ArrowRightCircleIcon className='w-6 h-6' /> 
                    &nbsp;
                    Ver mas..
                </div>        
            </div>
            <div className="bg-customPink rounded-md shadow-md text-white">
                <div className="flex justify-between items-center m-10">
                    <div>
                        <p className="text-lg font-semibold text-gray-700">Identificacion de violencia</p>
                        <p className="text-2xl font-bold text-gray-800">57 inscritos</p>
                    </div>
                    <div className="bg-pink-300 text-pink-700 p-3 rounded-full mr-4">
                    <BellAlertIcon  className="w-10 h-10"/>    
                    </div>
                </div>
                <div className='bg-pink-500 w-full h-10 text-center rounded-b-md flex justify-center items-center '>
                    <ArrowRightCircleIcon className='w-6 h-6' /> 
                    &nbsp;
                    Ver mas..
                </div>        
            </div>
            <div className="bg-secondary rounded-md shadow-md text-white">
                <div className="flex justify-between items-center m-10">
                    <div>
                        <p className="text-lg font-semibold text-gray-700">Administra tus contactos</p>
                        <p className="text-2xl font-bold text-gray-800">57 inscritos</p>
                    </div>
                    <div className="bg-yellow-200 text-yellow-600 p-3 rounded-full mr-4">
                    <IdentificationIcon  className="w-10 h-10"/>    
                    </div>
                </div>
                <div className='bg-yellow-400 w-full h-10 text-center rounded-b-md flex justify-center items-center '>
                    <ArrowRightCircleIcon className='w-6 h-6' /> 
                    &nbsp;
                    Ver mas..
                </div>        
            </div>  
        </div>
    ); 
}