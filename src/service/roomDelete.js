import {deleteOneRoom} from "../dao/room.js";
import {deleteChat} from "../dao/chat.js";

export async function removeRoomService(roomId) {
    try {
        await deleteOneRoom(roomId);
        await deleteChat(roomId);
    } catch (error) {
        throw error;
    }
};