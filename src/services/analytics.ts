type LogEvent = {
  id: string;
  eventName: string;
  metadata: Record<string, any>;
  timestamp: string;
};

const listeners = new Set<() => void>();
const history: LogEvent[] = [];

export const Analytics = {
  logEvent: (eventName: string, metadata: Record<string, any> = {}) => {
    const timestamp = new Date().toISOString();
    const event: LogEvent = {
      id: Math.random().toString(36).substring(2, 9),
      eventName,
      metadata,
      timestamp,
    };
    
    console.log(`[ANALYTICS] ${eventName}`, JSON.stringify({ ...metadata, timestamp }, null, 2));
    
    // Add to beginning so newest are first
    history.unshift(event);
    listeners.forEach(listener => listener());
  },
  
  getHistory: () => history,
  
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  },
  
  clearHistory: () => {
    history.length = 0;
    listeners.forEach(listener => listener());
  }
};
