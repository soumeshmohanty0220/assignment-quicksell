import React from 'react';
import Card from '../Card/Card';
import './Column.css';
import { ReactComponent as PlusIcon } from '../../assets/add.svg';
import { ReactComponent as DotsIcon } from '../../assets/3 dot menu.svg';

import { ReactComponent as Todo } from '../../assets/To-do.svg';
import { ReactComponent as InProgress } from '../../assets/in-progress.svg';
import { ReactComponent as Done } from '../../assets/Done.svg';
import { ReactComponent as Cancelled } from '../../assets/Cancelled.svg';
import { ReactComponent as Backlog } from '../../assets/Backlog.svg';

import { ReactComponent as UrgentIcon } from '../../assets/SVG - Urgent Priority colour.svg';
import { ReactComponent as HighIcon } from '../../assets/Img - High Priority.svg';
import { ReactComponent as MediumIcon } from '../../assets/Img - Medium Priority.svg';
import { ReactComponent as LowIcon } from '../../assets/Img - Low Priority.svg';
import { ReactComponent as NoPriorityIcon } from '../../assets/No-priority.svg';

const TitleIcon = ({ title, users }) => {
  const user = users.find(user => user.name === title);
  if (user) {
    return (
      <div className="user-avatar">
        <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
        <span className={`status-indicator ${user.available ? 'available' : ''}`}></span>
      </div>
    );
  }

  switch (title) {
    case 'Todo':
      return <Todo />;
    case 'In progress':
      return <InProgress />;
    case 'Done':
      return <Done />;
    case 'Cancelled':
      return <Cancelled />;
    case 'Backlog':
      return <Backlog />;
    case 'Urgent':
      return <UrgentIcon />;
    case 'High':
      return <HighIcon />;
    case 'Medium':
      return <MediumIcon />;
    case 'Low':
      return <LowIcon />;
    case 'No priority':
      return <NoPriorityIcon />;
    default:
      return <></>;
  }
};

const Column = ({ title, tickets, users, grouping }) => {
  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">
          <span className="column-icon">
            <TitleIcon title={title} users={users} />
          </span>
          <span>{title}</span>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="column-actions">
          <PlusIcon className="icon" />
          <DotsIcon className="icon" />
        </div>
      </div>
      <div className="column-cards">
        {tickets.map(ticket => (
          <Card key={ticket.id} ticket={ticket} user={users.find(user => user.id === ticket.userId)} grouping={grouping}/>
        ))}
      </div>
    </div>
  );
};

export default Column;