// Database vuoto di partenza per U.C. AlbinoLeffe Hub
// Rimosso qualsiasi calciatore o dato dimostrativo fittizio per evitare sovrascritture accidentali

const generateMockData = () => {
  return {
    players: [],
    dailyLogs: [],
    physicalTests: [],
    squatProfiles: {},
    neuromuscularTests: {},
    calendarEvents: []
  };
};

window.MOCK_DATA = generateMockData();
