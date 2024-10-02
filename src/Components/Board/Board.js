import React, { useState, useEffect,useRef } from 'react';
import { fetchData } from '../../services/api';
import { groupTickets, sortTickets } from '../../utils/ticketUtils';
import Column from '../Column/Column';
import './Board.css';

const Board = ({ grouping, ordering }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState({});

  const boardRef = useRef(null); // Create a ref for the board

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      if (data) {
        setTickets(data.tickets);
        setUsers(data.users);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const grouped = groupTickets(tickets, grouping, users);
    const sortedGrouped = sortTickets(grouped, ordering);
    setGroupedTickets(sortedGrouped);
  }, [grouping, ordering, tickets, users]);

   // Handle dragging functionality
   const handleMouseDown = (e) => {
    const startX = e.pageX - boardRef.current.offsetLeft;
    const scrollLeft = boardRef.current.scrollLeft;

    const handleMouseMove = (e) => {
      const x = e.pageX - boardRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Adjust the scroll speed
      boardRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      boardRef.current.removeEventListener('mousemove', handleMouseMove);
      boardRef.current.removeEventListener('mouseup', handleMouseUp);
      boardRef.current.removeEventListener('mouseleave', handleMouseUp);
      boardRef.current.classList.remove('dragging');
    };

    boardRef.current.addEventListener('mousemove', handleMouseMove);
    boardRef.current.addEventListener('mouseup', handleMouseUp);
    boardRef.current.addEventListener('mouseleave', handleMouseUp);
    boardRef.current.classList.add('dragging');
  };


  return (
    <div className="board" ref={boardRef} onMouseDown={handleMouseDown}>
      {Object.entries(groupedTickets).map(([group, tickets]) => (
        <Column key={group} title={group} tickets={tickets} users={users} grouping={grouping} />
      ))}
    </div>
  );
};

export default Board;