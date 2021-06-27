export interface IEvent {
  title: string,
  location: string,
  datetime: Date,
  description?: string,
  url?: string
}

export function getHistoricalEvents(): IEvent[] {
  return [
    {
      datetime: new Date('February 24, 2021 16:00:00'),
      location: 'Zoom/Discord',
      title: 'Unity Tutorial 0',
    },
    {
      datetime: new Date('November 7, 2018 14:00:00'),
      location: 'Kilburn Building',
      title: 'Activision Talk',
      url: 'https://www.facebook.com/events/180774782745996/?acontext=%7B%22action_history%22%3A[%7B%22surface%22%3A%22page%22%2C%22mechanism%22%3A%22page_admin_bar%22%2C%22extra_data%22%3A%22%7B%5C%22page_id%5C%22%3A278054199699452%7D%22%7D%2C%7B%22surface%22%3A%22events_admin_tool%22%2C%22mechanism%22%3A%22events_admin_tool%22%2C%22extra_data%22%3A%22[]%22%7D]%2C%22has_source%22%3Atrue%7D',
    },
    {
      datetime: new Date('December 6, 2018 14:00:00'),
      location: 'Kilburn Building',
      title: 'AI and Deep learning in games',
      url: 'https://www.facebook.com/events/495210204305680/?acontext=%7B%22action_history%22%3A[%7B%22surface%22%3A%22page%22%2C%22mechanism%22%3A%22page_admin_bar%22%2C%22extra_data%22%3A%22%7B%5C%22page_id%5C%22%3A278054199699452%7D%22%7D%2C%7B%22surface%22%3A%22events_admin_tool%22%2C%22mechanism%22%3A%22events_admin_tool%22%2C%22extra_data%22%3A%22[]%22%7D]%2C%22has_source%22%3Atrue%7D',
    },
    {
      datetime: new Date('February 12, 2020 14:00:00'),
      location: 'Collab 1',
      title: 'Unity Workshop',
      url: 'https://www.facebook.com/events/1352067421629786/?acontext=%7B%22action_history%22%3A[%7B%22surface%22%3A%22page%22%2C%22mechanism%22%3A%22page_admin_bar%22%2C%22extra_data%22%3A%22%7B%5C%22page_id%5C%22%3A278054199699452%7D%22%7D%2C%7B%22surface%22%3A%22events_admin_tool%22%2C%22mechanism%22%3A%22events_admin_tool%22%2C%22extra_data%22%3A%22[]%22%7D]%2C%22has_source%22%3Atrue%7D',
    },
    {
      datetime: new Date('November 14, 2018 14:00:00'),
      location: 'Collab 1',
      title: 'Game Development Workshop',
      url: 'https://www.facebook.com/events/326208244854764/?acontext=%7B%22action_history%22%3A[%7B%22surface%22%3A%22page%22%2C%22mechanism%22%3A%22page_admin_bar%22%2C%22extra_data%22%3A%22%7B%5C%22page_id%5C%22%3A278054199699452%7D%22%7D%2C%7B%22surface%22%3A%22events_admin_tool%22%2C%22mechanism%22%3A%22events_admin_tool%22%2C%22extra_data%22%3A%22[]%22%7D]%2C%22has_source%22%3Atrue%7D',
    },
    {
      datetime: new Date('March 13, 2019 13:00:00'),
      location: 'Kilburn Building',
      title: 'Mark Brown Talk (Game Maker\'s Toolkit)',
      url: 'https://www.facebook.com/events/1256276697843754/?acontext=%7B%22action_history%22%3A[%7B%22surface%22%3A%22page%22%2C%22mechanism%22%3A%22page_admin_bar%22%2C%22extra_data%22%3A%22%7B%5C%22page_id%5C%22%3A278054199699452%7D%22%7D%2C%7B%22surface%22%3A%22events_admin_tool%22%2C%22mechanism%22%3A%22events_admin_tool%22%2C%22extra_data%22%3A%22[]%22%7D]%2C%22has_source%22%3Atrue%7D',
    },
    {
      datetime: new Date('March 23, 2019 09:30:00'),
      location: 'The Shed',
      title: 'Student GameJam',
      url: 'https://www.facebook.com/events/550474695445097/?acontext=%7B%22action_history%22%3A[%7B%22surface%22%3A%22page%22%2C%22mechanism%22%3A%22page_admin_bar%22%2C%22extra_data%22%3A%22%7B%5C%22page_id%5C%22%3A278054199699452%7D%22%7D%2C%7B%22surface%22%3A%22events_admin_tool%22%2C%22mechanism%22%3A%22events_admin_tool%22%2C%22extra_data%22%3A%22[]%22%7D]%2C%22has_source%22%3Atrue%7D',
    },
    {
      datetime: new Date('November 27, 2019 14:00:00'),
      location: 'Kilburn Building',
      title: 'Studio Gobo Talk',
      url: 'https://www.facebook.com/events/1201298783403614/?acontext=%7B%22action_history%22%3A[%7B%22surface%22%3A%22page%22%2C%22mechanism%22%3A%22page_admin_bar%22%2C%22extra_data%22%3A%22%7B%5C%22page_id%5C%22%3A278054199699452%7D%22%7D%2C%7B%22surface%22%3A%22events_admin_tool%22%2C%22mechanism%22%3A%22events_admin_tool%22%2C%22extra_data%22%3A%22[]%22%7D]%2C%22has_source%22%3Atrue%7D',
    },
  ];
}

export function getUpcomingEvents(): IEvent[] {
  return [];
}
