import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(date) {
  return isSameDay(date, new Date());
}

/**
 * CalendarPicker
 * Props:
 *   selectedDate  – Date | null
 *   onSelect      – (Date) => void
 *   todoDates     – Date[]  (dates that have tasks, shown as dots)
 *   showTwoMonths – boolean (default true, mirrors the screenshot)
 *   labelPrefix   – string (default "Due:")
 */
const CalendarPicker = ({ selectedDate, onSelect, todoDates = [], showTwoMonths = true, labelPrefix = "Due:" }) => {
  const today = new Date();
  const [year, setYear] = useState(selectedDate ? selectedDate.getFullYear() : today.getFullYear());
  const [month, setMonth] = useState(selectedDate ? selectedDate.getMonth() : today.getMonth());

  const prevYear  = () => { if (year > 2020) setYear(y => y - 1); };
  const nextYear  = () => { if (year < 2035) setYear(y => y + 1); };
  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const secondMonth = month === 11 ? 0 : month + 1;
  const secondYear  = month === 11 ? year + 1 : year;

  function hasTask(d, m, y) {
    return todoDates.some(td => {
      const dt = new Date(td);
      return dt.getDate() === d && dt.getMonth() === m && dt.getFullYear() === y;
    });
  }

  function renderMonth(m, y) {
    const daysInMonth = getDaysInMonth(y, m);
    const firstDay    = getFirstDayOfMonth(y, m);
    const cells = [];

    // Empty leading cells
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`e-${i}`} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date   = new Date(y, m, d);
      const sel    = isSameDay(date, selectedDate);
      const tod    = isToday(date);
      const task   = hasTask(d, m, y);
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

      cells.push(
        <button
          key={d}
          onClick={() => !isPast && onSelect(date)}
          disabled={isPast}
          className={`
            relative flex flex-col items-center justify-center
            h-9 w-9 mx-auto rounded-full text-sm font-medium
            transition-all duration-150
            ${sel
              ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
              : tod && !sel
              ? 'text-brand-600 font-bold bg-brand-50 dark:text-brand-400 dark:bg-brand-500/10'
              : isPast
              ? 'text-gray-300 dark:text-gray-700 cursor-default'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
        >
          {d}
          {task && !sel && (
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brand-500" />
          )}
        </button>
      );
    }

    return (
      <div key={`${y}-${m}`}>
        <p className="text-center text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
          {MONTHS[m]}, {y}
        </p>
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => (
            <p key={d} className="text-center text-xs font-medium text-gray-400 dark:text-gray-500 py-1">
              {d}
            </p>
          ))}
        </div>
        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-5 shadow-sm select-none">
      {/* Year navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevYear}
          className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-base font-bold text-gray-900 dark:text-white">{year}</span>
        <button
          onClick={nextYear}
          className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <FiChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Month navigation row */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prevMonth}
          className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <FiChevronLeft className="h-3.5 w-3.5" />
        </button>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          <span className="md:hidden">{MONTHS[month]}</span>
          <span className="hidden md:inline">{MONTHS[month]} – {MONTHS[secondMonth]}</span>
        </span>
        <button
          onClick={nextMonth}
          className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <FiChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-6">
        {renderMonth(month, year)}
        {showTwoMonths && (
          <div className="hidden md:block">
            {renderMonth(secondMonth, secondYear)}
          </div>
        )}
      </div>

      {/* Selected date label */}
      {selectedDate && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {labelPrefix} <span className="font-semibold text-gray-700 dark:text-gray-300">
              {selectedDate.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', year:'numeric' })}
            </span>
          </p>
          <button
            onClick={() => onSelect(null)}
            className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;
