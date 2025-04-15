export function isValidThought(obj: any): boolean {
    return (
      typeof obj.content === "string" &&
      typeof obj.topic === "string" &&
      typeof obj.timestamp === "string" &&
      typeof obj.author === "string" &&
      typeof obj.signature === "string"
    );
  }
  
  export function isValidPersona(obj: any): boolean {
    return (
      typeof obj.alias === "string" &&
      typeof obj.publicKey === "string" &&
      typeof obj.behaviorModel === "string"
    );
  }
  