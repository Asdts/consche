export interface CalendarEvent {
    summary: string,
    description?: string,
    start: {
      dateTime: string,
      timeZone: string,
    };
    end: {
      dateTime: string,
      timeZone: string,
    },
    reminders?: {
      useDefault: boolean,
      overrides: {
        method: string,
        minutes: number,
      }[],
    };
  }
  