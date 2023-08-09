import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather"

const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 7, 1)); // Establecer la fecha al 1 de agosto de 2023

  const prev = () => {
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonthDate);
  };

  const next = () => {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonthDate);
  };

  const monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const monthNumber = currentDate.getMonth();
  const yearNumber = currentDate.getFullYear();

  const daysInMonth = new Date(yearNumber, monthNumber + 1, 0).getDate();
  const firstDayOfWeek = new Date(yearNumber, monthNumber, 1).getDay();

  const renderCalendarDays = () => {
    const days = [];

    // Determina el día de inicio para llenar los días del mes anterior
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<span key={`empty-${i}`} className='flex items-center justify-center w-10 h-10 rounded-lg'></span>);
    }

    // Llena los días del mes actual
    for (let i = 0; i < daysInMonth; i++) { // Restar 1 al límite del bucle para alinear correctamente los días
      const dayNumber = i + 1;
      days.push(
        <span
          key={`day-${dayNumber}`}
          className={`flex items-center justify-center w-20 h-20 rounded-lg m-1 ${
            // Coloca aquí la lógica para determinar si el día está disponible o no
            dayNumber % 2 === 0 ? 'bg-green-300' : 'bg-red-300'
            }`}
        >
          {dayNumber}
        </span>
      );
    }

    return days;
  };

  return (
    <div>
      <div className='flex items-center justify-evenly w-full min-h-full '>
        <button onClick={prev} className='p-2 rounded-full shadow bg-slate-50 text-gray-800 hover:bg-slate-100'>
          <ChevronLeft size={20} />
        </button>
        <div>{monthName[monthNumber]}</div>
        <div>{yearNumber}</div>
        <button onClick={next} className='p-2 rounded-full shadow bg-slate-50 text-gray-800 hover:bg-slate-100'>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className='grid grid-cols-7 text-xs text-center text-gray-900'>
        {/* Dias de la semana */}
        <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Dom</span>
        <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Lun</span>
        <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Mar</span>
        <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Mie</span>
        <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Jue</span>
        <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Vie</span>
        <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Sab</span>

        {/* Numeros dias de la semana */}
        {renderCalendarDays()}
      </div>
    </div>
  );
}

export default Calendario;