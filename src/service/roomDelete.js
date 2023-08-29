import Room from "../dao/room.js";
import Chat from "../dao/chat.js";

export async function removeRoom(roomId) {
    try {
        await Room.deleteOne({ _id: roomId });
        await Chat.deleteMany({ room: roomId });
    } catch (error) {
        throw error;
    }
};