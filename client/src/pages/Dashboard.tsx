import Card from "@/components/custom/Card";
import { useState, useEffect, useContext } from "react";
import { appContext } from "@/App";
import FadeLoader from "react-spinners/FadeLoader";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const { user, loading, setLoading } = useContext(appContext);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/protected", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <div className="py-2 px-3 sm:pt-5 sm:px-7 flex flex-col gap-2">
        {loading ? (
          <div className="flex justify-center items-center">
            <FadeLoader color="rgba(21, 17, 121, 1)" />
          </div>
        ) : (
          messages.map((message) => (
            <Card
              id={message._id}
              key={message._id}
              message={message.message}
              fullName={message.user.fullName}
              createdAt={message.createdAt}
              admin={message.user.admin}
              user={user}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
