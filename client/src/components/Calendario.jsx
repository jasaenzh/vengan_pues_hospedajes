
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather"

const Calendario = ({ apartmentIdBookings }) => {


  const [currentDate, setCurrentDate] = useState(new Date());

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

      const currentDateObj = new Date(yearNumber, monthNumber, dayNumber);
      const today = new Date();

      const isPastDay = currentDateObj.getDate() < today.getDate() &&
        currentDateObj.getMonth() <= today.getMonth() &&
        currentDateObj.getFullYear() <= today.getFullYear();

      // Verifica si la fecha actual está dentro del rango de alguna reserva
      const isBooked = Array.isArray(apartmentIdBookings) && apartmentIdBookings.some(date => {

        const startDateObj = new Date(date.startDate);
        const endDateObj = new Date(date.endDate);

        // Sumar un día a las fechas de inicio y fin
        startDateObj.setDate(startDateObj.getDate() + 1);
        endDateObj.setDate(endDateObj.getDate() + 1);

        // Asegurarse de que las horas estén en 00:00:00 y 23:59:59 respectivamente
        startDateObj.setHours(0, 0, 0, 0);
        endDateObj.setHours(23, 59, 59, 999);

        return currentDateObj >= startDateObj && currentDateObj <= endDateObj;
      });

      days.push(
        <span
          key={`day-${dayNumber}`}
          className={`flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-md my-1  
          ${(isPastDay ? 'bg-gray-300 text-gray-600'
              : (isPastDay && isBooked ? 'bg-gray-300 text-gray-600'
                : (isBooked ? 'bg-red-300' : 'bg-green-300')))}`}
        >
          {dayNumber}
        </span>
      );
    }
    return days;
  };

  return (
    <div>

      <div className='flex items-center justify-evenly w-full min-h-full mb-3'>
        <button onClick={prev} className='p-2 rounded-full shadow bg-slate-50 text-gray-800 hover:bg-slate-100'>
          <ChevronLeft size={20} />
        </button>
        <div>{monthName[monthNumber]}</div>
        <div>{yearNumber}</div>
        <button onClick={next} className='p-2 rounded-full shadow bg-slate-50 text-gray-800 hover:bg-slate-100'>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className='flex justify-evenly mb-3 text-xs text-gray-900'>
        <span className='flex items-center'>
          <div className='w-3 h-3 bg-gray-300 rounded-full mr-1'></div>
          No hábil
        </span>
        <span className='flex items-center'>
          <div className='w-3 h-3 bg-green-300 rounded-full mr-1'></div>
          Disponible
        </span>
        <span className='flex items-center'>
          <div className='w-3 h-3 bg-red-300 rounded-full mr-1'></div>
          Ocupado
        </span>
      </div>

      <div className='grid grid-cols-7 text-xs text-center text-gray-900 border-2 md:px-2 xs:m-[0,5] items-center '>
        {/* Dias de la semana */}
        <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Dom</span>
        <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Lun</span>
        <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Mar</span>
        <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Mie</span>
        <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Jue</span>
        <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Vie</span>
        <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Sab</span>

        {/* Numeros dias de la semana */}
        {renderCalendarDays()}
      </div>
    </div>
  );
}

export default Calendario;



// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from "react-feather"

// const Calendario = ({ apartmentIdBookings }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const prev = () => {
//     const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
//     setCurrentDate(prevMonthDate);
//   };

//   const next = () => {
//     const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
//     setCurrentDate(nextMonthDate);
//   };

//   const monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
//   const monthNumber = currentDate.getMonth();
//   const yearNumber = currentDate.getFullYear();

//   const daysInMonth = new Date(yearNumber, monthNumber + 1, 0).getDate();
//   // const firstDayOfWeek = new Date(yearNumber, monthNumber, 1).getDay();

//   const renderCalendarDays = () => {
//     const days = [];

//     // ...

//     for (let i = 0; i < daysInMonth; i++) {
//       const dayNumber = i + 1;

//       const currentDateObj = new Date(yearNumber, monthNumber, dayNumber);
//       const today = new Date();

//       const isPastDay = currentDateObj < today;

//       // Define dayStatus based on your logic here
//       const dayStatus = 'pendiente'; // Replace with your logic

//       const isPending = dayStatus === 'pendiente';

//       days.push(
//         <span
//           key={`day-${dayNumber}`}
//           className={`flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-md my-1 ${isPending ? 'bg-orange-300' : (isPastDay ? 'bg-gray-300' : 'bg-green-300')}
//             } ${isPastDay ? 'text-gray-400 pointer-events-none' : ''}`}
//         >
//           {dayNumber}
//         </span>
//       );
//     }

//     return days;
//   };

//   return (
//     <div>
//       <div>

//         <div className='flex items-center justify-evenly w-full min-h-full mb-3'>
//           <button onClick={prev} className='p-2 rounded-full shadow bg-slate-50 text-gray-800 hover:bg-slate-100'>
//             <ChevronLeft size={20} />
//           </button>
//           <div>{monthName[monthNumber]}</div>
//           <div>{yearNumber}</div>
//           <button onClick={next} className='p-2 rounded-full shadow bg-slate-50 text-gray-800 hover:bg-slate-100'>
//             <ChevronRight size={20} />
//           </button>
//         </div>

//         <div className='flex justify-evenly mb-3 text-xs text-gray-900'>
//           <span className='flex items-center'>
//             <div className='w-3 h-3 bg-gray-300 rounded-full mr-1'></div>           No hábil
//           </span>
//           <span className='flex items-center'>
//             <div className='w-3 h-3 bg-green-300 rounded-full mr-1'></div>
//             Disponible
//           </span>
//           <span className='flex items-center'>
//             <div className='w-3 h-3 bg-red-300 rounded-full mr-1'></div>
//             Ocupado
//           </span>
//         </div>

//         <div className='grid grid-cols-7 text-xs text-center text-gray-900 border-2 md:px-2 xs:m-[0,5] items-center '>
//           {/* Dias de la semana */}
//           <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Dom</span>
//           <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Lun</span>
//           <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Mar</span>
//           <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Mie</span>
//           <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Jue</span>
//           <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Vie</span>
//           <span className='flex items-center justify-center sm:w-18 md:w-16 h-10 rounded-lg'>Sab</span>

//           {/* Numeros dias de la semana */}
//           {renderCalendarDays()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Calendario;
