import React  from 'react'
import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { PokeContext } from "./PokeContext";

const PokeCheck = () => {

useEffect( () => {
    // if (!state.user) {
        // dispatch({type:"ASSIGN_USER"})
    // }
} , []);

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const startDate = new Date("2023-08-24");
const endDate = new Date("2023-10-23");

const dateArray = [];
const currentDate = new Date(startDate);

while (currentDate <= endDate) {
  dateArray.push(new Date(currentDate));
  currentDate.setDate(currentDate.getDate() + 1);
}
const today = new Date();
  const todayIndex = dateArray.findIndex(
    date =>
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  );
const firstDayIndex = (startDate.getDay() + 6) % 7;
  return (
<CalendarContainer>
      <WeekdaysRow>
        {weekdays.map(weekday => (
          <div key={weekday}>{weekday}</div>
        ))}
      </WeekdaysRow>
      <CalendarGrid>
        {Array.from({ length: firstDayIndex }).map((_, index) => (
          <DayBox key={`empty-${index}`} />
        ))}
        {dateArray.map((date, index) => (
          <DayBox key={index} isCurrentDate={index === todayIndex}>
            <div>{date.getDate()}</div>
            <label>
              <input type="checkbox" />
              Daily task
            </label>
            <div>{index + 1}</div>
          </DayBox>
        ))}
      </CalendarGrid>
    </CalendarContainer>
  )
}

export default PokeCheck
const CalendarContainer = styled.div`
  font-family: Arial, sans-serif;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const DayBox = styled.div`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: ${props =>
    props.isCurrentDate ? 'lightblue' : 'transparent'};
`;

const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
`;