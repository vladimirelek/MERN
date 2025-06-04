import { useState, useEffect } from "react";
import "./ChatPage.scss";
import { getAllUsers } from "../../services/userService";
import Chat from "../../components/ChatRoom/ChatRoom";
import { useSelector, useDispatch } from "react-redux";
import { setUnread } from "../../store/unread/unreadSlice";
import io from "socket.io-client";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [chatRoom, setChatRoom] = useState(false);
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);
  const selector = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const [to, setTo] = useState("");

  // Initialize socket when component mounts
  useEffect(() => {
    const newSocket = io("http://localhost:4001", {
      query: { userId: selector.user._id },
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("receive_message", (data) => {
      console.log("Received message in ChatPage:", data);
      // If the message is for the current user and they're not in the chat room
      if (data.receiver === selector.user._id && !chatRoom) {
        console.log("Setting unread to true from ChatPage");
        dispatch(setUnread(true));
      }
    });

    setSocket(newSocket);

    return () => {
      console.log("Cleaning up socket in ChatPage");
      newSocket.close();
    };
  }, [selector.user._id, dispatch]);

  useEffect(() => {
    // Clear unread messages when entering chat page
    dispatch(setUnread(false));

    const getUsers = async () => {
      const res = await getAllUsers();
      setUsers(res.users);
    };
    getUsers();
  }, [dispatch]);

  const startPrivateChat = (userId, username) => {
    setChatRoom(true);
    setTo(userId);
    setUsername(username);
    // Clear unread when opening chat
    dispatch(setUnread(false));
  };

  const closeChat = () => {
    setChatRoom(false);
    setTo("");
    setUsername("");
  };

  return (
    <div className="users-list-container">
      <h3 className="users-list-title">Teretana Chat - Korisnici</h3>
      {users.length === 0 ? (
        <p className="users-list-empty">Nema aktivnih korisnika</p>
      ) : (
        <ul className="users-list">
          {users.map((user) => (
            <li key={user._id} className="users-list__item">
              <span className="users-list__username">{user.username}</span>
              <button
                className="users-list__button"
                title="Pošalji privatnu poruku"
                onClick={() => startPrivateChat(user._id, user.username)}
              >
                ✉️
              </button>
            </li>
          ))}
        </ul>
      )}
      {chatRoom && (
        <Chat
          to={to}
          currentUserId={selector.user._id}
          username={username}
          onClose={closeChat}
          socket={socket}
        />
      )}
    </div>
  );
};

export default ChatPage;
