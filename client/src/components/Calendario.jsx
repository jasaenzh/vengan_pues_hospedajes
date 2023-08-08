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




// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from "react-feather"

// const Calendario = () => {


//   // Meses del año
//   let monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

//   // Obtener la fecha actual
//   let currentDate = new Date()

//   // Obtener el dia de la semana => 1, 2, 3, 4, 5, 6, 7
//   let currentDayOfWeek = currentDate.getDay();

//   // Obtener el dia actual => 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
//   let currentDay = currentDate.getDate();

//   // Obtener el mes actual => 0(Enero), 1(Febrero), 2(Marzo), 3(Abril), 4(Mayo), 5(Junio), 6(Julio), 7(Agosto), 8(Septiembre), 9(Octubre), 10(Noviembre), 11(Diciembre)
//   let monthNumber = currentDate.getMonth();

//   // Obtener el año actual
//   let currentYear = currentDate.getFullYear();

//   let dates = document.getElementById('dates');
//   let month = document.getElementById('month');
//   let year = document.getElementById('year');
//   let prevMonthBtn = document.getElementById('prevMonth');
//   let nextMonthBtn = document.getElementById('nextMonth');

//   const prev = () => { }
//   const next = () => { }


//   console.log("Dia de la semana", currentDayOfWeek)
//   console.log("Dia", currentDay)
//   console.log("Mes actual", monthNumber)
//   console.log("Año actual", currentYear)
//   console.log("Dates", dates)
//   console.log("Mes", month)
//   console.log("Año", year)
//   console.log("PrevMonthBtn", prevMonthBtn)
//   console.log("NextMonthBtn", nextMonthBtn)

//   console.log("==================================")

//   month.textContent = monthName[monthNumber]


//   return (
//     <div>
//       <div className='flex items-center justify-evenly w-full min-h-full '>
//         <button id='prevMonth' onClick={prev} className='p-2 rounded-full shadow bg-slate-50 text-gray-800 hover:bg-slate-100'>
//           <ChevronLeft size={20} />
//         </button>
//         <div id='month'>
//           AGOSTO
//         </div>
//         <div id='year'>
//           2023
//         </div>
//         <button id='nextMonth' onClick={next} className='p-2 rounded-full shadow bg-slate-50 text-gray-800 hover:bg-slate-100'>
//           <ChevronRight size={20} />
//         </button>
//       </div>

//       <div className='grid grid-cols-7 text-xs text-center text-gray-900'>

//         {/* Dias de la semana */}
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Lun</span>
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Mar</span>
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Mie</span>
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Jue</span>
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Vie</span>
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Sab</span>
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>Dom</span>

//         {/* Numeros dias de la semana */}
//         <div id='dates'></div>
//         {/* <span className='flex items-center justify-center w-10 h-10 rounded-lg bg-slate-500'>1</span>
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>2</span>
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>3</span>
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>4</span>
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>5</span>
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>6</span>
//         <span className='flex items-center justify-center w-10 h-10 rounded-lg'>7</span> */}

//       </div>
//     </div>
//   );
// }

// export default Calendario;
