export const groupTickets = (tickets, grouping, users) => {
  switch (grouping) {
      case 'status':
          return groupByStatus(tickets);
      case 'user':
          return groupByUser(tickets, users);
      case 'priority':
          return groupByPriority(tickets);
      default:
          return groupByStatus(tickets);
  }
};

const groupByStatus = (tickets) => {
  return tickets.reduce((acc, ticket) => {
    (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
    return acc;
  }, {});
};

const groupByUser = (tickets, users) => {
  return tickets.reduce((acc, ticket) => {
    const user = users.find(user => user.id === ticket.userId);
    (acc[user.name] = acc[user.name] || []).push(ticket);
    return acc;
  }, {});
};

const groupByPriority = (tickets) => {
  const priorityNames = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
  return tickets.reduce((acc, ticket) => {
    (acc[priorityNames[ticket.priority]] = acc[priorityNames[ticket.priority]] || []).push(ticket);
    return acc;
  }, {});
};

export const sortTickets = (groupedTickets, ordering) => {
  const sortFunction = ordering === 'title' ? sortByTitle : sortByPriority;

  return Object.fromEntries(
    Object.entries(groupedTickets).map(([group, tickets]) => [
      group,
      tickets.sort(sortFunction)
    ])
  );
};

const sortByPriority = (a, b) => b.priority - a.priority;

const sortByTitle = (a, b) => a.title.localeCompare(b.title);