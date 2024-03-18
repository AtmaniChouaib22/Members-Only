import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { appContext } from "@/App";

const Card = ({ message, fullName, id, createdAt, admin, user }) => {
  const { isLogged, setIsLogged } = useContext(appContext);
  return (
    <div
      key={id}
      className="flex flex-col gap-1 border-2 border-slate-950 rounded-md py-1 pl-2"
    >
      <div>{message}</div>
      {(user.member === true || user.admin === true) && isLogged ? (
        <div className="sm:flex sm:gap-2 flex flex-col flex-wrap">
          <div>
            By <span className="font-bold pr-1">{fullName}</span>
            {admin && <Badge>Admin</Badge>}
          </div>
          <div>
            on <span>{createdAt}</span>
          </div>
        </div>
      ) : (
        <>
          <hr />
          <div className="font-bold">Join the club to view details</div>
        </>
      )}
    </div>
  );
};

export default Card;
