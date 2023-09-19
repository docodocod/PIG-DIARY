import Room from "../schema/room.js";
import Chat from "../schema/chat.js";

export async function removeRoom(roomId) {
    try {
        await Room.deleteOne({ id: roomId });
        await Chat.deleteMany({ room: roomId });
    } catch (error) {
        throw error;
    }
};