import Room from "../models/room.js";
import Chat from "../models/chat.js";

export async function removeRoom(roomId) {
    try {
        await Room.deleteOne({ id: roomId });
        await Chat.deleteMany({ room: roomId });
    } catch (error) {
        throw error;
    }
};