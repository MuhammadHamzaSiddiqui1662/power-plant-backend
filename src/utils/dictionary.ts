export type UserRoomMap = Map<string, string[]>; // Or use number for IDs

// Create and export an instance of the map
export const userRoomMap: UserRoomMap = new Map();

export function addRoomToUser(userId: string, roomId: string): void {
    let rooms = userRoomMap.get(userId);
    if (!rooms) {
        rooms = [];
        userRoomMap.set(userId, rooms);
    }
    rooms.push(roomId);
}


// Function to remove a room from a user
export function removeRoomFromUser(userId: string, roomId: string): void {
    let rooms = userRoomMap.get(userId);
    if (rooms) {
        rooms = rooms.filter(id => id !== roomId);
        if (rooms.length > 0) {
            userRoomMap.set(userId, rooms);
        } else {
            userRoomMap.delete(userId);
        }
    }
}

// Function to retrieve rooms for a user
export function getRoomsForUser(userId: string): string[] | undefined {
    return userRoomMap.get(userId);
}
