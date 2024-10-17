export const generateBotResponse = (message: string): string => {
    return `Bot: Here's an idea for "${message}"`;
  };
  
  export const truncateTitle = (title: string, length: number = 20): string => {
    return title.length > length ? title.substring(0, length) + '...' : title;
  };
  