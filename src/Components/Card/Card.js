import React from 'react';
import './Card.css';
import { ReactComponent as FeatureRequestIcon } from '../../assets/add.svg';
import { ReactComponent as UrgentIcon } from '../../assets/SVG - Urgent Priority grey.svg';
import { ReactComponent as HighIcon } from '../../assets/Img - High Priority.svg';
import { ReactComponent as MediumIcon } from '../../assets/Img - Medium Priority.svg';
import { ReactComponent as LowIcon } from '../../assets/Img - Low Priority.svg';
import { ReactComponent as NoPriorityIcon } from '../../assets/No-priority.svg';

import { ReactComponent as Todo } from '../../assets/To-do.svg';
import { ReactComponent as InProgress } from '../../assets/in-progress.svg';
import { ReactComponent as Done } from '../../assets/Done.svg';
import { ReactComponent as Cancelled } from '../../assets/Cancelled.svg';
import { ReactComponent as Backlog } from '../../assets/Backlog.svg';

const priorityIcons = {
  4: UrgentIcon,
  3: HighIcon,
  2: MediumIcon,
  1: LowIcon,
  0: NoPriorityIcon,
};

const statusIcons = {
  'Todo': Todo,
  'In progress': InProgress,
  'Done': Done,
  'Cancelled': Cancelled,
  'Backlog': Backlog,
};

const Card = ({ ticket, user, grouping }) => {
  const PriorityIcon = priorityIcons[ticket.priority];
  const StatusIcon = statusIcons[ticket.status];

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== 'user' && (
          <div className="user-avatar">
            <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
            <span className={`status-indicator ${user.available ? 'available' : ''}`}></span>
          </div>
        )}
      </div>
      <div className="card-title-container">
        {grouping !== 'status' && <StatusIcon className="status-icon" />}
        <h3 className="card-title">{ticket.title}</h3>
      </div>
      <div className="card-tags">
        {grouping !== 'priority' && (
          <div className="tag priority-tag">
            <PriorityIcon />
          </div>
        )}
        {ticket.tag.map((tag, index) => (
          <div key={index} className="tag feature-tag">
            <div className="feature-icon"/>
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;