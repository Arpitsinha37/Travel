import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isBefore, startOfDay, addDays } from 'date-fns';

const CustomCalendar = ({ selectedDate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const calendarRef = useRef(null);
    const today = startOfDay(new Date());

    useEffect(() => {
        function handleClickOutside(event) {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [calendarRef]);

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        const result = addMonths(currentMonth, -1);
        if (!isBefore(startOfMonth(result), startOfMonth(today))) {
            setCurrentMonth(result);
        }
    };

    const renderHeader = (date) => {
        return (
            <div className="flex justify-center mb-4">
                <span className="text-lg font-bold text-slate-800">
                    {format(date, 'MMMM yyyy')}
                </span>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        return (
            <div className="grid grid-cols-7 mb-2">
                {days.map(day => (
                    <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wide">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = (monthDate) => {
        const monthStart = startOfMonth(monthDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const isDisabled = isBefore(day, today);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);

                days.push(
                    <div
                        key={day}
                        className={`
                            relative h-10 w-10 flex flex-col items-center justify-center rounded-full text-sm font-medium transition-all
                            ${!isCurrentMonth ? 'text-slate-200 pointer-events-none' : ''}
                            ${isDisabled ? 'text-slate-300 pointer-events-none bg-slate-50' : 'cursor-pointer hover:bg-rose-50 hover:text-rose-600'}
                            ${isSelected ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30 hover:bg-rose-700 hover:text-white' : ''}
                            ${!isDisabled && !isSelected && isCurrentMonth ? 'text-slate-700' : ''}
                        `}
                        onClick={() => !isDisabled && onChange(cloneDay) & setIsOpen(false)}
                    >
                        <span>{formattedDate}</span>
                        {/* Mock Price for visual similarity to screenshot */}
                        {!isDisabled && isCurrentMonth && (
                            <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-rose-100' : 'text-green-600'}`}>
                                {Math.floor(Math.random() * (2000 - 1000) + 1000)}
                            </span>
                        )}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day} className="grid grid-cols-7 gap-1 mb-1">
                    {days}
                </div>
            );
            days = [];
        }
        return <div>{rows}</div>;
    };

    const handleDateSelect = (date) => {
        onChange(date);
        setIsOpen(false);
    };

    const selectToday = (e) => {
        e.stopPropagation();
        handleDateSelect(today);
    };

    const selectTomorrow = (e) => {
        e.stopPropagation();
        handleDateSelect(addDays(today, 1));
    };

    return (
        <div className="relative w-full h-full" ref={calendarRef}>
            {/* Input Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-full bg-transparent flex flex-col justify-center cursor-pointer focus:outline-none pl-12 pr-4 relative group"
            >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-nepal-red transition-colors">
                    <CalendarIcon className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                            Date of Journey
                            <span className="md:hidden lg:inline text-[10px] opacity-70">
                                {selectedDate && isSameDay(selectedDate, today) ? "(Today)" : ""}
                                {selectedDate && isSameDay(selectedDate, addDays(today, 1)) ? "(Tomorrow)" : ""}
                            </span>
                        </span>
                        <span className="text-xl font-bold text-slate-800">
                            {selectedDate ? format(selectedDate, 'dd MMM yyyy') : 'Onward Date'}
                        </span>
                    </div>

                    {/* Quick Select Chips (Desktop Only) */}
                    <div className="hidden xl:flex items-center gap-2 ml-4">
                        <button
                            onClick={selectToday}
                            className={`px-3 py-1 rounded-full text-xs font-semibold max-w-[80px] truncate transition-colors ${selectedDate && isSameDay(selectedDate, today) ? 'bg-nepal-red text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            Today
                        </button>
                        <button
                            onClick={selectTomorrow}
                            className={`px-3 py-1 rounded-full text-xs font-semibold max-w-[80px] truncate transition-colors ${selectedDate && isSameDay(selectedDate, addDays(today, 1)) ? 'bg-nepal-red text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            Tomorrow
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar Popup */}
            {isOpen && (
                <div className="absolute top-full right-0 md:left-0 mt-4 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 z-50 w-[350px] md:w-[700px] flex flex-col md:flex-row gap-8 animate-in fade-in zoom-in-95 duration-200">
                    {/* Month 1 */}
                    <div className="flex-1">
                        <div className="relative">
                            <button onClick={prevMonth} className="absolute left-0 top-1 p-1 hover:bg-slate-100 rounded-full transition-colors">
                                <ChevronLeft className="w-5 h-5 text-slate-500" />
                            </button>
                            {renderHeader(currentMonth)}
                        </div>
                        {renderDays()}
                        {renderCells(currentMonth)}
                    </div>

                    {/* Divider for Desktop */}
                    <div className="hidden md:block w-px bg-slate-100"></div>

                    {/* Month 2 (Next Month) */}
                    <div className="hidden md:block flex-1">
                        <div className="relative">
                            <button onClick={nextMonth} className="absolute right-0 top-1 p-1 hover:bg-slate-100 rounded-full transition-colors">
                                <ChevronRight className="w-5 h-5 text-slate-500" />
                            </button>
                            {renderHeader(addMonths(currentMonth, 1))}
                        </div>
                        {renderDays()}
                        {renderCells(addMonths(currentMonth, 1))}
                    </div>

                    {/* Mobile Navigation for Next Month */}
                    <div className="md:hidden flex justify-end">
                        <button onClick={nextMonth} className="flex items-center text-sm font-bold text-rose-600">
                            Next Month <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomCalendar;
